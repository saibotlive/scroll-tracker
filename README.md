# Scroll Tracker

Scroll Tracker is a small React and TypeScript project that tracks user scroll depth on a news article or similar content. It dispatches custom events when the user scrolls to 25%, 50%, and 100% of the article's height. This is useful for tracking user engagement or progress through content on the web.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [How it Works](#how-it-works)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get the project running locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/saibotlive/scroll-tracker.git
cd scroll-tracker
```

2. Install dependencies:

```
npm install
```

3. Run the development server:

```
npm run dev
```

The application will be available at `http://localhost:5173`.

4. To build the project for production:

```
npm run build
```

5. To preview the production build locally:

```
npm run preview
```

## Usage

### 1. Embedding the Scroll Tracker in a Webpage

You can use this scroll tracker as part of a website or integrate it into an existing article. When a user scrolls through the article, the tracker will dispatch custom events as they reach 25%, 50%, and 100% of the article body.

### 2. Custom Hook

The scroll depth tracking logic is in a custom React hook, `useScrollDepthTracker`. You can import and use this hook in any React component that renders an article.

Here's an example:

```tsx
import useScrollDepthTracker from './hooks/useScrollDepthTracker';

const ArticlePage = () => {
  useScrollDepthTracker();

  return (
    <article>
      <h1>Article Title</h1>
      <p>Some long content here...</p>
      {/* More content */}
    </article>
  );
};

export default ArticlePage;
```

### 3. Adding the Script via Browser Console

You can also add the scroll depth tracker to any webpage by injecting the compiled script directly into the browser's console:

1. Open the article webpage in your browser.
2. Open the browser’s Developer Tools (`Ctrl + Shift + I` or `Cmd + Option + I`).
3. Go to the **Console** tab.
4. Paste the following code

```javascript
const scrollScript = document.createElement('script');
scrollScript.src = 'https://scroll-tracker-smoky.vercel.app/assets/index-p1OYowWF.js';
document.body.appendChild(scrollScript);
```

This will load your scroll depth tracking code onto the page. The scroll events will now trigger when the user scrolls through the page.

### 4. Listening for Custom Events

The custom events `scrollDepthReached` are dispatched with a `detail` property that contains the scroll depth percentage (e.g., 25, 50, or 100). You can listen to these events globally to take actions based on user scroll activity.

Example:

```javascript
window.addEventListener('scrollDepthReached', (event) => {
  console.log(`Scroll Depth: ${event.detail}%`);
});
```

## How it Works

The main functionality is provided by the `useScrollDepthTracker` hook, which:

- Monitors the user's scroll position relative to the height of the article.
- Dispatches a custom `scrollDepthReached` event when the user reaches 25%, 50%, or 100% of the article.
- Resets the scroll depth when the user scrolls back up, allowing the events to trigger again when scrolling back down.

### Key Components

- **`useScrollDepthTracker`**: A React hook that handles the logic for detecting scroll depth and dispatching events.
- **Custom Events**: The application dispatches custom events at specific scroll depths, which can be caught and handled globally in the window.

## Testing

This project includes unit tests to ensure that the scroll depth tracking works as expected. I used `vitest` and `@testing-library/react` for testing.

1. To run the tests:

   ```
   npm run test
   ```

2. Unit tests for key logic in `useScrollDepthTracker`. The tests cover:
   - Scroll event triggering at 25%, 50%, and 100%.
   - Scroll direction tracking (down and up).
   - Reset behavior when scrolling back up.
