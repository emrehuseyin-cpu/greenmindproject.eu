# GreenMind Project website

Static site for **https://greenmindproject.eu**, an Erasmus+ KA210-ADU partnership (Germany, Türkiye, Portugal).

Plain HTML, CSS and vanilla JavaScript. No framework and no build step.

```
index.html        page markup and inline SVG illustrations
css/styles.css    all styles
js/main.js        interactions (toolkit, countdown, animations)
favicon.svg       site icon
og-image.png      social preview image (1200×630)
.cpanel.yml       deployment instructions for cPanel Git Version Control
```

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish an update

The site is hosted on HostGator. cPanel's **Git™ Version Control** pulls this repository and copies the website files into the domain's document root (see `.cpanel.yml`).

1. Push the change to GitHub:
   ```
   git add -A
   git commit -m "Describe the change"
   git push
   ```
2. In cPanel go to **Git™ Version Control**, click **Manage** for this repository, open the **Pull or Deploy** tab, then click **Update from Remote** and **Deploy HEAD Commit**.
