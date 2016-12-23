/* global document, window */
export default {
  scrollTo(name, offset = 0) {
    const node = document.getElementsByName(name)[0];

    if (!node) {
      console.warn(`node [name=${name}] not found, could not scroll`);
      return;
    }

    const nodeRect = node.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    const scrollOffset = nodeRect.top - bodyRect.top;

    window.scrollTo(0, scrollOffset + offset);
  }
};
