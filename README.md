# Scroll Depth Tracker (Vanilla JS)

This is a simple scroll depth tracker built using vanilla JavaScript. It tracks the user's scroll progress through an article and triggers custom events when the user scrolls past 25%, 50%, and 100% of the article.

## Features

- No frameworks or libraries are used.
- Custom events triggered at 25%, 50%, and 100% scroll depth.

## How to Use

1. Clone or download the repository.
2. Open `index.html` in a browser.
3. Scroll through the article and monitor the browser's console to see the custom events.

### 3. Adding the Script via Browser Console

You can also add the scroll depth tracker to any webpage by injecting the compiled script directly into the browser's console:

1. Open the article webpage in your browser.
2. Open the browser’s Developer Tools (`Ctrl + Shift + I` or `Cmd + Option + I`).
3. Go to the **Console** tab.
4. Paste the following code

```javascript
const scrollScript = document.createElement('script');
scrollScript.src = 'https://scroll-tracker-smoky.vercel.app/scroll-tracker.js';
document.body.appendChild(scrollScript);
```

This will load your scroll depth tracking code onto the page. The scroll events will now trigger when the user scrolls through the page.

## Files

- `index.html`: The main HTML file with the article content.
- `scroll-tracker.js`: The JavaScript file containing the scroll tracking logic.
