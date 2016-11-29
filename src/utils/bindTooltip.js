import getOffset from './getOffset';

export default function bindTooltip() {
  const targets = document.querySelectorAll('[rel=tooltip]');
  const title = false;
  let tip = false;
  let tooltip = false;

  Array.from(targets).forEach(target => {
    target.addEventListener("mouseenter", () => {

      tip = target.getAttribute("title");
      tooltip = document.createElement("div");
      tooltip.id = 'tooltip';

      if (!tip || tip === '') {
        return false;
      }

      target.removeAttribute('title');
      tooltip.style.opacity = 0;
      tooltip.innerHTML = tip;
      document.body.appendChild(tooltip);

      const initTooltip = () => {
        if (window.innerWidth < tooltip.offsetWidth * 1.5) {
          tooltip.style.maxWidth = window.innerWidth / 2;
        }
        else {
          tooltip.style.maxWidth = 340;
        }

        let posLeft = getOffset(target).left + (target.offsetWidth / 2);
        posLeft -= tooltip.offsetWidth / 2;
        let posTop = getOffset(target).top - tooltip.offsetHeight - 10;

        if (posLeft < 0) {
          posLeft = getOffset(target).left + target.offsetWidth / 2 - 20;
          tooltip.classList.add('left');
        }
        else {
          tooltip.classList.remove('left');
        }

        if (posLeft + tooltip.offsetWidth > window.innerWidth) {
          posLeft = getOffset(target).left - tooltip.offsetWidth + target.offsetWidth / 2 + 20;
          tooltip.classList.add('right');
        }
        else {
          tooltip.classList.remove('right');
        }

        if (posTop < 0) {
          posTop = getOffset(target).top + target.offsetHeight + 15;
          tooltip.classList.add('top');
        }
        else {
          tooltip.classList.remove('top');
        }

        tooltip.style.left = String(posLeft) + 'px';
        tooltip.style.top = String(posTop) + 'px';
        tooltip.style.opacity = 1;
      };

      initTooltip();

      window.addEventListener('resize', init_tooltip);

      const remove_tooltip = () => {
        tooltip.style.opacity  = 0;
        document.querySelector('#tooltip') && document.body.removeChild(document.querySelector('#tooltip'));
        target.setAttribute('title', tip );
      };

      target.addEventListener('mouseleave', remove_tooltip );
      tooltip.addEventListener('click', remove_tooltip );
    });
  });
}
