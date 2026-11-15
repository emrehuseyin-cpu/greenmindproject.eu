# GreenMind Project website

Static site for **https://greenmindproject.eu**, an Erasmus+ KA210-ADU partnership (Germany, Türkiye, Portugal).

Plain HTML, CSS and vanilla JavaScript. No framework and no build step.

```
index.html        page markup and inline SVG illustrations
css/styles.css    all styles
js/main.js        interactions (toolkit, countdown, animations)
favicon.svg       site icon
og-image.png      social preview image (1200×630)
CNAME             custom domain for GitHub Pages
```

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish an update

The site is hosted on GitHub Pages from the `main` branch. Every push goes live within a minute or two:

```
git add -A
git commit -m "Describe the change"
git push
```
