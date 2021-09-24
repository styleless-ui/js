<h2 align="center">
  @styless-ui/modal
</h2>

&nbsp;

<p align="center">
  Zero Built-in Style UI JS Library.
</p>

&nbsp;

<div align="center">

  <img src="https://img.shields.io/npm/l/@styless-ui/modal" alt="licence">

  <a href="https://www.npmjs.com/package/@styless-ui/modal" target="_blank">
    <img src="https://img.shields.io/npm/v/@styless-ui/modal.svg" alt="npm">
  </a>

  <img src="https://img.shields.io/bundlephobia/min/@styless-ui/modal" alt="minified size">

  <img src="https://img.shields.io/david/styless-ui/react?path=packages%2fmodal" alt="dependencies">

  <a href="https://www.npmjs.com/package/@styless-ui/modal">
    <img src="https://img.shields.io/npm/dt/@styless-ui/modal" alt="downloads">
  </a>
</div>

---

&nbsp;

## Install

### via npm

```shell
npm install @styless-ui/modal --save
```

### via yarn

```shell
yarn add @styless-ui/modal
```

&nbsp;

## Usage

```ts
// import
import { Modal } from "@styless-ui/modal";

const modal = new Modal(modalElement, {
  disableScroll,
  trapFocus,
  closeOnEsc,
  onChange,
});
```

### Options

- `disableScroll: boolean | BodyScrollOptions`

  - Optional
  - Defaults to `true`
  - See [BodyScrollLock Options](https://github.com/willmcpo/body-scroll-lock#options).

- `trapFocus: boolean | BodyScrollOptions`

  - Optional
  - Defaults to `true`
  - See [FocusTrap Options](https://github.com/focus-trap/focus-trap#createfocustrapelement-createoptions).

- `closeOnEsc: boolean`

  - Optional
  - Defaults to `true`

- `onChange: (element: HTMLElement, isOpen: boolean) => void`
  - Optional
  - Change State Handler

### Modal Instance Methods

- `open: () => void`

  - A function to open the Modal.

- `close: () => void`

  - A function to close the Modal.

- `dispose: () => void`
  - cleanup function.

&nbsp;

## Example

```html
<section class="section" style="height: 120vh">
  <h2 class="title">Modal</h2>
  <button class="button" data-modal-open-trigger>open</button>
  <div class="modal">
    <div class="modal-background" data-modal-close-trigger></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Modal title</p>
        <button
          class="delete"
          aria-label="close"
          data-modal-close-trigger
        ></button>
      </header>
      <section class="modal-card-body">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" data-modal-close-trigger>
          Save changes
        </button>
        <button class="button" data-modal-close-trigger>Cancel</button>
      </footer>
    </div>
  </div>
</section>
```

```ts
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
```

&nbsp;

## Licence

This project is licensed under [MIT license](https://opensource.org/licenses/MIT).

&nbsp;

## Created and maintained by

[@yuki0410\_](https://twitter.com/yuki0410_) 🇯🇵
