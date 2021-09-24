import type { FocusableElement } from "tabbable";
import { tabbable } from "tabbable";

export type EventHandlerOptions = {
  onClose: VoidFunction;
};

export class EventHandler {
  /**
   * Create Instance
   */
  public constructor(private element: HTMLElement, private options: EventHandlerOptions) {}

  /**
   * Cleanup
   */
  public dispose = (): void => {
    this.unbind();
  };

  /**
   * Emit Close Event
   */
  private get onClose(): VoidFunction {
    return this.options.onClose;
  }

  /**
   * Bind Events
   */
  public bind = (): void => {
    document.addEventListener("keydown", this.handleKeyDown, false);
    document.addEventListener("focus", this.handleFocus, true);
    document.addEventListener("click", this.handleClick, true);
  };

  /**
   * Unbind Events
   */
  public unbind = (): void => {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("focus", this.handleFocus);
    document.removeEventListener("click", this.handleClick);
  };

  /**
   * Handle KeyboardEvent
   */
  private handleKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;

    if (key === "Escape" || key === "Esc") {
      this.handleEscapeKeyDwon();
      return;
    }

    if (key === "ArrowUp") {
      this.handleArrowUpKeyDwon();
      return;
    }

    if (key === "ArrowDown") {
      this.handleArrowDownKeyDwon();
      return;
    }
  };

  /**
   * Handle Escape KeyDown
   */
  private handleEscapeKeyDwon = (): void => {
    this.onClose();
  };

  /**
   * Handle ArrowUp KeyDown
   */
  private handleArrowUpKeyDwon = (): void => {
    const activeElement = document.activeElement;
    const elementList = tabbable(this.element);

    if (activeElement === null) {
      const nextFocusElement = elementList[0];
      if (nextFocusElement === undefined) {
        return;
      }
      nextFocusElement.focus();
      return;
    }

    const index = elementList.findIndex((element: FocusableElement): boolean => {
      return element === activeElement;
    });

    const nextFocusElement = elementList[index - 1];

    if (nextFocusElement === undefined) {
      return;
    }

    nextFocusElement.focus();
  };

  /**
   * Handle ArrowDown KeyDown
   */
  private handleArrowDownKeyDwon = (): void => {
    const activeElement = document.activeElement;
    const elementList = tabbable(this.element);

    if (activeElement === null) {
      const nextFocusElement = elementList[0];
      if (nextFocusElement === undefined) {
        return;
      }
      nextFocusElement.focus();
      return;
    }

    const index = elementList.findIndex((element: FocusableElement): boolean => {
      return element === activeElement;
    });

    const nextFocusElement = elementList[index + 1];

    if (nextFocusElement === undefined) {
      return;
    }

    nextFocusElement.focus();
  };

  /**
   * Handle FocusEvent / BlurEvent
   */
  private handleFocus = (event: FocusEvent): void => {
    const { target } = event;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (this.isIncludeElement(target)) {
      return;
    }

    // event.preventDefault();
    this.onClose();
  };

  /**
   * Handle ClickEvent
   */
  private handleClick = (event: MouseEvent): void => {
    const { target } = event;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (this.isIncludeElement(target)) {
      return;
    }

    // event.preventDefault();
    this.onClose();
  };

  /**
   * Is Include Element
   */
  private isIncludeElement = (element: HTMLElement): boolean => {
    let target: HTMLElement | null = element;
    while (target != null) {
      if (target == this.element) {
        return true;
      }
      target = target.parentElement;
    }
    return false;
  };
}
