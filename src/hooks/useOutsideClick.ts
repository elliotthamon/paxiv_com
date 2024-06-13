import { useEffect } from "react";

const useOutsideClick = (
  modalRef: any,
  isShown: Boolean,
  callback: Function,
  btnRef?: any
) => {
  const handleClickOutside = (event: any) => {
    const isScrollbarClicked =
      event.clientX >= document.documentElement.clientWidth - 17;
    if (btnRef?.current) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !btnRef.current.contains(event.target as Node) &&
        !isScrollbarClicked
      ) {
        callback();
        document.body.style.overflowY = "scroll";
      }
    } else {
      const clickedElement = event.target as HTMLElement;
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !clickedElement.closest(".pac-container") &&
        !isScrollbarClicked
      ) {
        callback();
        document.body.style.overflowY = "scroll";
      }
    }
  };
  useEffect(() => {
    if (isShown) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShown]);
};

export default useOutsideClick;
