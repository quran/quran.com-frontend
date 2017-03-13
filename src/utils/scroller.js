/* global document, window */
export default {
  scrollTo(name, offset = 0) {
    const node = document.getElementsByName(name)[0];

    if (!node) {
      console.warn(`node [name=${name}] not found, could not scroll`); // eslint-disable-line
      return;
    }

    const nodeRect = node.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    const scrollOffset = (nodeRect.top - bodyRect.top) + offset;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);


    // Only scroll if item is not already on screen.
    // If an item is larger than the screen, don't scroll to the top of it if it's already filling
    // the screen.
    if ((scrollOffset < scrollTop) !==
        (scrollOffset + nodeRect.height > scrollTop + viewportHeight)) {
      window.scrollTo(0, scrollOffset);
    }
  }
};
