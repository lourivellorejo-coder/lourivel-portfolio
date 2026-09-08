import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = require('sharp');
import { brand, pages, footer, mark } from './content.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const theme = path.join(root, 'theme/northline');
for (const dir of [dist, path.join(dist,'assets'),path.join(theme,'assets'),path.join(theme,'sample-content')]) fs.mkdirSync(dir,{recursive:true});
const slugs = ['home','about','services','contact'];
const filenames = {home:'index.html', about:'about.html', services:'services.html',contact:'contact.html'};
const escape = v=>v.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const staticTokens = content=>content.replaceAll('{{asset}}','assets').replace(/\{\{url:(home|about|services|contact)\}\}/g,(_,slug)=>filenames[slug]);
const style = fs.readFileSync(path.join(root,'source/site.css'),'utf8');
const script = fs.readFileSync(path.join(root,'source/site.js'),'utf8');
fs.writeFileSync(path.join(dist,'assets/site.css'),style);
fs.writeFileSync(path.join(dist,'assets/site.js'),script);
fs.writeFileSync(path.join(theme,'assets/site.js'),script);
fs.writeFileSync(path.join(theme,'style.css'),`/*\nTheme Name: Northline Business Studio\nTheme URI: https://lourivellorejo-coder.github.io/lourivel-portfolio/samples/northline/\nAuthor: Lourivel Lorejo\nDescription: A four-page fictional small-business portfolio sample, with responsive layouts and optional sample-page setup. The contact form is a demonstration and does not send messages.\nVersion: 1.0.0\nRequires at least: 6.3\nRequires PHP: 7.4\nLicense: GNU General Public License v2 or later\nLicense URI: https://www.gnu.org/licenses/gpl-2.0.html\nText Domain: northline\nTags: custom-menu, featured-images, full-width-template\n*/\n${style}`);
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="#24534b"/><path d="M10 30V10L30 30V10M10 20H30" stroke="#e3ec9c" stroke-width="2.5" fill="none"/></svg>`;
fs.writeFileSync(path.join(dist,'assets/favicon.svg'),favicon);
for (const slug of slugs) {
  const page = pages[slug];
  const nav = slugs.map(s=>`<a href="${filenames[s]}"${s===slug?' aria-current="page"':''}>${s[0].toUpperCase()+s.slice(1)}</a>`).join('');
  const html = `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(page.title)} | ${brand}</title><meta name="description" content="${escape(page.description)}"><meta name="theme-color" content="#152b34"><meta property="og:title" content="${escape(page.title)} | ${brand}"><meta property="og:description" content="${escape(page.description)}"><meta property="og:type" content="website"><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/site.css"><script src="assets/site.js" defer></script></head><body><a class="skip-link" href="#main-content">Skip to content</a><header class="site-header"><div class="container header-inner"><a class="brand" href="index.html" aria-label="Northline home">${mark}<span>NORTHLINE<small>BUSINESS STUDIO</small></span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" hidden>Menu <span aria-hidden="true">+</span></button><nav class="primary-nav" id="primary-nav" aria-label="Primary navigation">${nav}<a class="nav-cta" href="contact.html">Let’s talk <span aria-hidden="true">↗</span></a></nav></div></header><main id="main-content">${staticTokens(page.content)}</main>${staticTokens(footer)}</body></html>\n`;
  fs.writeFileSync(path.join(dist,filenames[slug]),html);
  fs.writeFileSync(path.join(theme,'sample-content',`${slug}.html`),page.content);
}
const wpFooter = footer.replace(/\{\{url:(home|about|services|contact)\}\}/g,(_,slug)=>`<?php echo esc_url( northline_page_url( '${slug}' ) ); ?>`);
fs.writeFileSync(path.join(theme,'footer.php'),`<?php if ( ! defined( 'ABSPATH' ) ) { exit; } ?>\n${wpFooter}\n<?php wp_footer(); ?>\n</body></html>\n`);
const imageSource = process.env.NORTHLINE_IMAGE_SOURCE || path.join(root,'source/workspace-original.png');
if (fs.existsSync(imageSource)) {
  await sharp(imageSource).webp({quality:78,effort:6}).toFile(path.join(dist,'assets/workspace.webp'));
} else if (!fs.existsSync(path.join(dist,'assets/workspace.webp'))) {
  throw new Error('Set NORTHLINE_IMAGE_SOURCE to a source photograph before the first build.');
}
fs.copyFileSync(path.join(dist,'assets/workspace.webp'),path.join(theme,'assets/workspace.webp'));
fs.writeFileSync(path.join(dist,'.nojekyll'),'');
console.log(JSON.stringify({pages:slugs.length,theme,dist,imageBytes:fs.statSync(path.join(dist,'assets/workspace.webp')).size}));
