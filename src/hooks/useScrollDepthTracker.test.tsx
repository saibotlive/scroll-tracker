import { renderHook, act } from '@testing-library/react';
import useScrollDepthTracker from './useScrollDepthTracker';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('useScrollDepthTracker', () => {
  const originalScrollY = window.scrollY;
  const originalInnerHeight = window.innerHeight;
  const originalScrollHeight = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollHeight')!;

  const mockScroll = (scrollY: number, innerHeight: number, articleHeight: number) => {
    Object.defineProperty(window, 'scrollY', { value: scrollY, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: innerHeight, writable: true });

    const article = document.createElement('article');
    Object.defineProperty(article, 'scrollHeight', { value: articleHeight });
    document.body.appendChild(article);

    window.dispatchEvent(new Event('scroll'));

    document.body.removeChild(article);
  };

  beforeEach(() => {
    // Restore original scroll values
    window.scrollY = originalScrollY;
    window.innerHeight = originalInnerHeight;
    Object.defineProperty(Element.prototype, 'scrollHeight', originalScrollHeight);
  });

  it('should initialize with 0% scroll depth', () => {
    const { result } = renderHook(() => useScrollDepthTracker());
    expect(result.current).toBe(0);
  });

  it('should dispatch 25% event and update state', () => {
    const { result } = renderHook(() => useScrollDepthTracker());
    const spyDispatchEvent = vi.spyOn(window, 'dispatchEvent');

    act(() => {
      mockScroll(100, 400, 2000);
    });

    expect(spyDispatchEvent).toHaveBeenCalledWith(new CustomEvent('scrollDepthReached', { detail: 25 }));
    expect(result.current).toBe(25);
  });

  it('should dispatch 50% event and update state', () => {
    const { result } = renderHook(() => useScrollDepthTracker());
    const spyDispatchEvent = vi.spyOn(window, 'dispatchEvent');

    act(() => {
      mockScroll(600, 400, 2000); // simulate scroll to 50%
    });

    expect(spyDispatchEvent).toHaveBeenCalledWith(new CustomEvent('scrollDepthReached', { detail: 50 }));
    expect(result.current).toBe(50);
  });

  it('should dispatch 100% event and update state', () => {
    const { result } = renderHook(() => useScrollDepthTracker());
    const spyDispatchEvent = vi.spyOn(window, 'dispatchEvent');

    act(() => {
      mockScroll(1600, 400, 2000); // simulate scroll to 100%
    });

    expect(spyDispatchEvent).toHaveBeenCalledWith(new CustomEvent('scrollDepthReached', { detail: 100 }));
    expect(result.current).toBe(100);
  });

  it('should not dispatch event when scrolling back up and reset scroll depth', () => {
    const { result } = renderHook(() => useScrollDepthTracker());
    const spyDispatchEvent = vi.spyOn(window, 'dispatchEvent');

    // Scroll down to 100%
    act(() => {
      mockScroll(1600, 400, 2000);
    });
    expect(result.current).toBe(100);

    // Scroll back up to 50%
    act(() => {
      mockScroll(600, 400, 2000);
    });
    expect(result.current).toBe(50);

    // Ensure no new events are dispatched when scrolling up
    expect(spyDispatchEvent).toHaveBeenCalledTimes(3); // one for 25%, one for 50%, one for 100%
  });

  it('should reset the scroll depth when scrolling back above 25%', async () => {
    const { result } = renderHook(() => useScrollDepthTracker());

    // Scroll down to 50%
    act(() => {
      mockScroll(600, 400, 2000); // 50% scroll
    });
    expect(result.current).toBe(50);

    // Scroll back up to below 25%
    act(() => {
      mockScroll(50, 400, 2000); // Scroll to 10% (below 25%)
    });

    // Ensure scroll depth resets to 0

    expect(result.current).toBe(0);
  });
});
