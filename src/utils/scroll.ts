export const disableScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollY || document.documentElement.scrollLeft;

  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  document.body.style.paddingRight = scrollbarWidth.toString() + "px";
  document.body.style.overflow = "hidden";

  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
};

export const enableScroll = () => {
  setTimeout(() => {
    window.onscroll = function () {};
    document.body.style.paddingRight = "0px";
    document.body.style.overflow = "auto";
  }, 150);
};
