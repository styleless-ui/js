<h2 align="center">
  @styless-ui/doropdown
</h2>

&nbsp;

<p align="center">
  Zero Built-in Style UI JS Library.
</p>

&nbsp;

<div align="center">

  <img src="https://img.shields.io/npm/l/@styless-ui/doropdown" alt="licence">

  <a href="https://www.npmjs.com/package/@styless-ui/doropdown" target="_blank">
    <img src="https://img.shields.io/npm/v/@styless-ui/doropdown.svg" alt="npm">
  </a>

  <img src="https://img.shields.io/bundlephobia/min/@styless-ui/doropdown" alt="minified size">

  <img src="https://img.shields.io/david/styless-ui/react?path=packages%2fdropdown" alt="dependencies">

  <a href="https://www.npmjs.com/package/@styless-ui/doropdown">
    <img src="https://img.shields.io/npm/dt/@styless-ui/doropdown" alt="downloads">
  </a>
</div>

---

&nbsp;

## Install

### via npm

```shell
npm install @styless-ui/doropdown --save
```

### via yarn

```shell
yarn add @styless-ui/doropdown
```

&nbsp;

## Usage

```ts
// import
import { Dropdown } from "@styless-ui/doropdown";

const dropdown = new Dropdown(dropdownElement, {
  onChange,
});
```

### Options

- `onChange: (element: HTMLElement, isOpen: boolean) => void`
  - Optional
  - Change State Handler

### Dropdown Instance Methods

- `open: () => void`

  - A function to open the Modal.

- `close: () => void`

  - A function to close the Modal.

- `dispose: () => void`
  - cleanup function.

&nbsp;

## Example

```html
<section class="section">
  <h2 class="title">DropDown</h2>
  <div class="dropdown">
    <div class="dropdown-trigger">
      <button
        class="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        data-dropdown-toggle-trigger
      >
        Dropdown button
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a href="#" class="dropdown-item"> Dropdown item </a>
        <a href="#" class="dropdown-item"> Other dropdown item </a>
        <a href="#" class="dropdown-item is-active"> Active dropdown item </a>
        <a href="#" class="dropdown-item"> Other dropdown item </a>
        <hr class="dropdown-divider" />
        <a href="#" class="dropdown-item"> With a divider </a>
      </div>
    </div>
  </div>
</section>
```

```ts
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
```

&nbsp;

## Licence

This project is licensed under [MIT license](https://opensource.org/licenses/MIT).

&nbsp;

## Created and maintained by

[@yuki0410\_](https://twitter.com/yuki0410_) 🇯🇵
