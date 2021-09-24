import { Dropdown } from "@styless-ui/doropdown";

const dropdownElement = document.querySelector(".dropdown");
const dropdownMenuElement = document.querySelector(".dropdown-menu");

if (
  dropdownElement != null &&
  dropdownElement instanceof HTMLElement &&
  dropdownMenuElement != null &&
  dropdownMenuElement instanceof HTMLElement
) {
  const dropdown = new Dropdown(dropdownMenuElement, {
    onChange: (_element: HTMLElement, isOpen: boolean): void => {
      if (isOpen) {
        dropdownElement.classList.add("is-active");
      } else {
        dropdownElement.classList.remove("is-active");
      }
    },
  });

  document.addEventListener("click", (event: Event): void => {
    const { target } = event;

    if (!(target instanceof HTMLElement)) {
      // Not HTML Element
      return;
    }

    if ("dropdownToggleTrigger" in target.dataset) {
      // on Click Toggle dropdown trigger
      if (dropdownElement.classList.contains("is-active")) {
        dropdown.close();
      } else {
        dropdown.open();
      }
      event.preventDefault();
    }
  });
}
