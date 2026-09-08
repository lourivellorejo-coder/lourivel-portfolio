# Northline Business Studio — WordPress theme

A small-business website concept prepared for Lourivel Lorejo’s portfolio. Northline is fictional; this is a sample project, not a commissioned client website.

## What is included

- Four distinct pages: Home, About, Services, and Contact.
- Shared header and footer, responsive navigation, and mobile layouts.
- Optional setup screen that creates editable WordPress Pages.
- Native disclosure questions on Services and an accessible contact-form preview.
- Locally bundled photograph and styles; no page builder, paid theme, or external font service required.

## Install in WordPress

Use a fresh WordPress demo installation with PHP 7.4 or newer and WordPress 6.3 or newer.

1. In the dashboard, open **Appearance → Themes → Add New → Upload Theme**.
2. Select **Northline-WordPress-Theme.zip**, install it, then activate **Northline Business Studio**.
3. Open **Appearance → Northline sample setup**.
4. Click **Create the four sample pages**. This creates Home, About, Services, and Contact, then selects Home as the front page.
5. Open **Visit Site** to explore it.

The setup does not run automatically on activation. It checks for existing page slugs before making changes and will not replace unrelated pages. Repeating setup reuses this theme’s previously imported pages without overwriting their edits.

## Make changes

Use **Pages → Edit** to edit the imported Custom HTML blocks. The content is native WordPress Page content. Text, images, section markup, and links can be edited in those blocks; this version is not a visual drag-and-drop page builder. The tokens `{{asset}}` and `{{url:home}}`, `{{url:about}}`, `{{url:services}}`, and `{{url:contact}}` resolve to the current theme and page addresses when viewed, including plain permalink installations.

Navigation defaults to the four sample pages. For your own menu, create one under **Appearance → Menus** and assign it to **Primary navigation**. Brand text is in `header.php` and `footer.php`; color and layout rules are in `style.css`.

## Contact form

The included form validates example entries and shows a local preview. It **does not send, store, or collect inquiries**. Before using the theme for a real business, replace the preview with a configured form plugin or server-side handler and test actual message delivery.

## Preview and hosting

The public GitHub Pages link is an HTML/CSS/JavaScript design preview generated from the same source content and styles as this theme. GitHub Pages does not execute WordPress or PHP. The theme archive is for a separate WordPress installation.

Live preview: https://lourivellorejo-coder.github.io/lourivel-portfolio/samples/northline/

## Verification

Local route and asset checks, JavaScript syntax, template structure, and archive contents are checked before delivery. Actual theme activation and form preview behavior still need to be verified in a WordPress installation. No production email delivery is configured.

## Credits and license

Website concept and sample prepared for Lourivel Lorejo. The workspace photograph is an AI-generated visual made for this sample; it does not depict an actual Northline office. No client testimonials, business results, or real company affiliations are claimed.

Theme code: GPL-2.0-or-later. See https://www.gnu.org/licenses/gpl-2.0.html.

WordPress implementation references:
- https://learn.wordpress.org/lesson/required-theme-files/
- https://developer.wordpress.org/themes/classic-themes/basics/including-css-javascript/
- https://developer.wordpress.org/reference/functions/wp_link_pages/
