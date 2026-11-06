import { useLayoutEffect } from 'react';

const WIDE_QUERY = '(min-width: 769px)';
// Least vertical distance between consecutive items on either side, so their order stays legible.
const MIN_STAGGER_PX = 80;
// Least gap below the previous item on the same side.
const SAME_SIDE_GAP_PX = 64;

/**
 * On wide screens, positions timeline items absolutely so work/education (left) and community
 * (right) can sit side by side while keeping newest-first order. Sets `data-layout="packed"` on
 * the container itself, before paint, so prerendered HTML and narrow screens keep the flow layout.
 * `items` must be in display order and match `itemRefs` index for index.
 */
const usePackedTimeline = (containerRef, itemRefs, items, isRightSide) => {
  useLayoutEffect(() => {
    const container = containerRef.current;
    const elements = itemRefs.current.slice(0, items.length);
    const query = window.matchMedia(WIDE_QUERY);

    const reset = () => {
      delete container.dataset.layout;
      container.style.height = '';
      elements.forEach(el => { el.style.top = ''; });
    };

    const layout = () => {
      if (!query.matches) {
        reset();
        return;
      }
      container.dataset.layout = 'packed';
      const { paddingTop, paddingBottom } = getComputedStyle(container);
      const offset = parseFloat(paddingTop);
      const sideBottom = { left: -Infinity, right: -Infinity };
      let previousTop = -Infinity;
      let height = 0;
      items.forEach((item, i) => {
        const el = elements[i];
        const side = isRightSide(item) ? 'right' : 'left';
        const top = Math.max(previousTop + MIN_STAGGER_PX, sideBottom[side] + SAME_SIDE_GAP_PX, 0);
        el.style.top = `${offset + top}px`;
        sideBottom[side] = top + el.offsetHeight;
        height = Math.max(height, sideBottom[side]);
        previousTop = top;
      });
      container.style.height = `${offset + height + parseFloat(paddingBottom)}px`;
    };

    layout();
    const observer = new ResizeObserver(layout);
    elements.forEach(el => observer.observe(el));
    query.addEventListener('change', layout);
    return () => {
      observer.disconnect();
      query.removeEventListener('change', layout);
      reset();
    };
  }, [containerRef, itemRefs, items, isRightSide]);
};

export default usePackedTimeline;
