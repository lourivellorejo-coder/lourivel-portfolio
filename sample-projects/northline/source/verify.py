"""Structural checks for the static preview and matching WordPress package."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import re

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / 'dist'
THEME = ROOT / 'theme/northline'

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.ids, self.refs = path, set(), []
        self.h1s = self.currents = 0
        self.errors = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            if attrs['id'] in self.ids: self.errors.append(f"duplicate id: {attrs['id']}")
            self.ids.add(attrs['id'])
        if tag == 'h1': self.h1s += 1
        if attrs.get('aria-current') == 'page': self.currents += 1
        if tag == 'img' and not attrs.get('alt'): self.errors.append('missing image alt')
        for key in ('href', 'src'):
            if key in attrs: self.refs.append(attrs[key])

parsed = {}
for path in sorted(DIST.glob('*.html')):
    content = path.read_text()
    parser = Page(path)
    parser.feed(content)
    parsed[path] = parser
    assert '{{' not in content, f'unresolved token in {path.name}'
    assert parser.h1s == 1, f'{path.name}: expected one h1'
    assert parser.currents == 1, f'{path.name}: expected one current navigation link'
    assert not parser.errors, f'{path.name}: {parser.errors}'

references = 0
for path, parser in parsed.items():
    for ref in parser.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc: continue
        target = (path.parent / unquote(url.path)).resolve() if url.path else path
        assert target.is_relative_to(DIST), f'path outside sample: {ref}'
        assert target.exists(), f'{path.name}: missing {ref}'
        if url.fragment:
            assert target in parsed and url.fragment in parsed[target].ids, f'{path.name}: broken anchor {ref}'
        references += 1

for filename in ('style.css','functions.php','index.php','page.php','header.php','footer.php','404.php','README.md'):
    assert (THEME / filename).is_file(), f'missing theme file: {filename}'
for filename in ('home','about','services','contact'):
    assert (THEME / 'sample-content' / f'{filename}.html').is_file()
assert (THEME / 'assets/workspace.webp').read_bytes() == (DIST / 'assets/workspace.webp').read_bytes()
assert (THEME / 'assets/site.js').read_bytes() == (DIST / 'assets/site.js').read_bytes()
assert 'Theme Name: Northline Business Studio' in (THEME / 'style.css').read_text()
assert 'wp_head()' in (THEME / 'header.php').read_text()
assert 'wp_footer()' in (THEME / 'footer.php').read_text()
assert 'check_admin_referer' in (THEME / 'functions.php').read_text()
assert 'current_user_can' in (THEME / 'functions.php').read_text()
assert 'type="button" id="preview-inquiry"' in (DIST / 'contact.html').read_text()
assert not re.search(r'\b(fetch|XMLHttpRequest|localStorage|sessionStorage)\b', (DIST / 'assets/site.js').read_text()), 'unexpected contact data transmission/storage'
try:
    import tinycss2
    css = (DIST / 'assets/site.css').read_text()
    rules = tinycss2.parse_stylesheet(css, skip_comments=True, skip_whitespace=True)
    assert not [r for r in rules if r.type == 'error'], 'CSS parsing error'
    css_status = f'{len(rules)} CSS rules parsed'
except ImportError:
    css_status = 'CSS parser unavailable'
print(f'PASS: {len(parsed)} pages; {references} local links and assets; unique headings and IDs; matching theme assets; {css_status}.')
print('WordPress/PHP runtime is not installed here; installation testing remains a separate step.')
