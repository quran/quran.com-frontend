import getOffset from './getOffset';

export default function bindTooltip() {
  let targets = document.querySelectorAll( '[rel=tooltip]' ),
  target  = false,
  tooltip = false,
  title   = false,
  tip     = false;

  Array.from(targets).map( target => {
    target.addEventListener("mouseenter", function() {

      tip     = target.getAttribute("title");
      tooltip = document.createElement("div");
      tooltip.id = "tooltip";

      if(!tip || tip == "")
      return false;

      target.removeAttribute("title");
      tooltip.style.opacity = 0;
      tooltip.innerHTML = tip;
      document.body.appendChild(tooltip);

      const init_tooltip = () => {
        // set width of tooltip to half of window width
        if (window.innerWidth < tooltip.offsetWidth * 1.5)
          tooltip.style.maxWidth = window.innerWidth / 2;
        else
          tooltip.style.maxWidth = 340;

        let pos_left = getOffset(target).left + (target.offsetWidth / 2) - (tooltip.offsetWidth / 2);
        let pos_top  = getOffset(target).top - tooltip.offsetHeight - 10;

        if (pos_left < 0) {
          pos_left = getOffset(target).left + target.offsetWidth / 2 - 20;
          tooltip.classList.add("left");
        }
        else
          tooltip.classList.remove("left");

        if (pos_left + tooltip.offsetWidth > window.innerWidth) {
          pos_left = getOffset(target).left - tooltip.offsetWidth + target.offsetWidth / 2 + 20;
          tooltip.classList.add("right");
        }
        else
          tooltip.classList.remove("right");

        if (pos_top < 0) {
          pos_top  = getOffset(target).top + target.offsetHeight + 15;
          tooltip.classList.add("top");
        }
        else
          tooltip.classList.remove("top");
        // adding "px" is very important
        tooltip.style.left = pos_left + "px";
        tooltip.style.top = pos_top + "px";
        tooltip.style.opacity  = 1;
      };

      init_tooltip();
      window.addEventListener("resize", init_tooltip);

      const remove_tooltip = () => {
        tooltip.style.opacity  = 0;
        document.querySelector("#tooltip") && document.body.removeChild(document.querySelector("#tooltip"));
        target.setAttribute("title", tip );
      };

      target.addEventListener("mouseleave", remove_tooltip );
      tooltip.addEventListener("click", remove_tooltip );
    });
  }); // forEach ends
}
