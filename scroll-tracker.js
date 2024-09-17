(function () {
  let scrollDepth = 0;

  function handleScroll() {
    const article = document.querySelector('article');
    if (!article) return;

    const articleHeight = article.scrollHeight;
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollPosition = scrollTop + windowHeight;
    const scrollPercentage = (scrollPosition / articleHeight) * 100;

    if (scrollPercentage >= 100 && scrollDepth < 100) {
      dispatchScrollEvent(100);
      scrollDepth = 100;
    } else if (scrollPercentage >= 50 && scrollDepth < 50) {
      dispatchScrollEvent(50);
      scrollDepth = 50;
    } else if (scrollPercentage >= 25 && scrollDepth < 25) {
      dispatchScrollEvent(25);
      scrollDepth = 25;
    }
  }

  function dispatchScrollEvent(percentage) {
    const event = new CustomEvent('scrollDepthReached', {
      detail: percentage,
    });
    window.dispatchEvent(event);
  }

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Listen for the scroll depth reached event
  window.addEventListener('scrollDepthReached', function (event) {
    alert(`You reached ${event.detail}% of the article!`);
  });
})();
