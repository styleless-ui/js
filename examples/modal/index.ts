import { Modal } from "@styless-ui/modal";

const modalElement = document.querySelector(".modal");

if (modalElement != null && modalElement instanceof HTMLElement) {
  const modal = new Modal(modalElement, {
    disableScroll: true,
    trapFocus: true,
    closeOnEsc: true,
    onChange: (element: HTMLElement, isOpen: boolean): void => {
      if (isOpen) {
        element.classList.add("is-active");
      } else {
        element.classList.remove("is-active");
      }
    },
  });

  document.addEventListener("click", (event: Event): void => {
    const { target } = event;

    if (!(target instanceof HTMLElement)) {
      // Not HTML Element
      return;
    }

    if ("modalCloseTrigger" in target.dataset) {
      // on Click Close Modal trigger
      modal.close();
      event.preventDefault();
    }

    if ("modalOpenTrigger" in target.dataset) {
      // on Click Close Modal trigger
      modal.open();
      event.preventDefault();
    }
  });
}
