# GreenMind Project website

Static site for **https://greenmindproject.eu**, an Erasmus+ KA210-ADU partnership (Germany, Türkiye, Portugal).

Plain HTML, CSS and vanilla JavaScript. No framework and no build step.

```
index.html        Under-construction landing page (currently live at /)
site.html         Full website in progress (preview at /site.html)
css/styles.css    all styles
js/main.js        interactions (toolkit, countdown, animations)
images/           EU Co-funded emblem & partner organisation logos
favicon.svg       site icon
og-image.png      social preview image (1200×630)
.cpanel.yml       deployment instructions for cPanel Git Version Control
```

## Switching from Under Construction to Live Full Site

When ready to publish the full website:
```bash
cp site.html index.html
git add index.html
git commit -m "Launch full website"
git push
```

## Preview locally

```
python3 -m http.server 8000
```

- Under construction page: http://localhost:8000/
- Full working site: http://localhost:8000/site.html

## Publish an update

1. Push the change to GitHub:
   ```
   git add -A
   git commit -m "Describe the change"
   git push
   ```
2. In cPanel go to **Git™ Version Control**, click **Manage** for this repository, open the **Pull or Deploy** tab, then click **Update from Remote** (and **Deploy HEAD Commit** if cloned outside `public_html`).
