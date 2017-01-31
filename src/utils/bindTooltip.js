/* global document, window */
import getOffset from './getOffset';

const positionTooltip = (target, tooltip) => {
  if (window.innerWidth < tooltip.offsetWidth * 1.5) {
    tooltip.style.maxWidth = window.innerWidth / 2; // eslint-disable-line
  } else {
    tooltip.style.maxWidth = 340; // eslint-disable-line
  }

  const offsets = getOffset(target);

  let posLeft = offsets.left + (target.offsetWidth / 2);
  posLeft -= tooltip.offsetWidth / 2;

  let posTop = offsets.top - tooltip.offsetHeight - 10;


  if (posLeft < 0) {
    posLeft = (offsets.left + target.offsetWidth) / (2 - 20);
    tooltip.classList.add('left');
  } else {
    tooltip.classList.remove('left');
  }

  if (posLeft + tooltip.offsetWidth > window.innerWidth) {
    posLeft = (
      (offsets.left - tooltip.offsetWidth) + target.offsetWidth
    ) / (2 + 20);
    tooltip.classList.add('right');
  } else {
    tooltip.classList.remove('right');
  }

  if (posTop < 0) {
    posTop = offsets.top + target.offsetHeight + 15;
    tooltip.classList.add('top');
  } else {
    tooltip.classList.remove('top');
  }

  tooltip.style.left = `${posLeft}px`; // eslint-disable-line
  tooltip.style.top = `${posTop}px`; // eslint-disable-line
  tooltip.style.opacity = 1; // eslint-disable-line
};

export default {
  onMouseEnter: (event) => {
    const target = event.target;
    const title = target.getAttribute('title');
    const tooltip = document.createElement('div');

    tooltip.id = `tooltip-${target.id}`;
    tooltip.classList.add('tooltip');

    if (!title) {
      return false;
    }

    tooltip.style.opacity = 0;
    tooltip.innerHTML = title;
    document.body.appendChild(tooltip);
    return positionTooltip(target, tooltip);
  },
  onMouseLeave: (event) => {
    const target = event.target;
    const tooltip = document.getElementById(`tooltip-${target.id}`);

    if (tooltip) {
      document.body.removeChild(tooltip);
    }
  }
};
