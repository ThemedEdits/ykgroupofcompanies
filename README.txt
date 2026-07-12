YK GROUP OF COMPANIES — Website Package
========================================

WHAT'S INSIDE
  index.html   The single page site (all sections)
  styles.css   All styling (colors, layout, responsiveness, glass effects)
  script.js    Mobile menu, scroll reveal animation, sticky header, scroll progress line
  assets/      Logo files used across the site
    yk-emblem.png      Cropped logo mark (used in header and footer)
    yk-logo.png         Full original logo you uploaded (kept for reference / print use)
    favicon-32.png       Browser tab icon
    favicon-180.png       Apple touch icon (iOS home screen)
    favicon-192.png       Android icon

HOW TO VIEW IT
  Just double-click index.html to open it in any browser. No build step, no
  server, no dependencies required, it is plain HTML, CSS and JavaScript.

HOW TO PUBLISH IT
  Upload all files (keeping the folder structure) to any web host, for
  example:
    - Netlify or Vercel: drag and drop the whole folder
    - Any shared hosting / cPanel: upload via FTP into public_html
    - GitHub Pages: push the folder to a repository and enable Pages

EDITING CONTENT
  All text lives directly in index.html, organised by section:
    <section id="about">      About / Vision / Mission / Core Values
    <section id="categories"> Distribution Categories
    <section id="services">   Services
    <section id="trading">    Import, Export & General Trading
    <section id="why">        Why Choose Us
    <section id="contact">    Phone, email, Facebook, address

  Phone, email, Facebook and address appear in two places: the top bar /
  hero buttons and the Contact section. Search and replace to update.

EDITING COLORS
  Open styles.css and look at the ":root" block near the top. Every color
  used across the site is defined there as a named variable (for example
  --gold-600, --navy-900), so changing one value updates it everywhere.

NOTES
  - The site has no backend or contact form; "Call Now" and "Email Us"
    buttons open the visitor's phone dialer / email client directly.
  - Fonts (Fraunces and Inter) load from Google Fonts, so an internet
    connection is needed the first time the page loads for the custom
    typefaces to appear; a system font fallback is in place regardless.
