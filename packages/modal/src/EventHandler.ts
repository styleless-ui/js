import type { BodyScrollOptions } from "body-scroll-lock";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import type { FocusTrap, Options as FocusTrapOptions } from "focus-trap";
import { createFocusTrap } from "focus-trap";

export type EventHandlerOptions = {
  onClose: VoidFunction;
  disableScroll?: boolean | BodyScrollOptions;
  trapFocus?: boolean | Omit<FocusTrapOptions, "escapeDeactivates" | "clickOutsideDeactivates">;
  closeOnEsc?: boolean;
};

export class EventHandler {
  /** focusTrap Instance */
  private focusTrap: FocusTrap | undefined = undefined;

  /**
   * Create Instance
   */
  public constructor(private element: HTMLElement, private options: EventHandlerOptions) {
    if (this.focusTrapOptions !== false) {
      // Create FocusTrap Instance
      this.focusTrap = createFocusTrap(this.element, this.focusTrapOptions);
    }
  }

  /**
   * Disable Scroll Options
   */
  private get disableScrollOptions(): BodyScrollOptions | false {
    const { disableScroll = true } = this.options;
    if (disableScroll === true) {
      return {
        reserveScrollBarGap: true,
        allowTouchMove: (element: HTMLElement | Element): boolean => {
          const ignoreDatasetKey = "bodyScrollLockIgnore";
          while (element && element !== document.body) {
            if ("dataset" in element && ignoreDatasetKey in element.dataset) {
              return true;
            }
            if (element.parentElement) element = element.parentElement;
          }
          return false;
        },
      };
    }
    return disableScroll;
  }

  /**
   * Focus Trap Options
   */
  private get focusTrapOptions(): FocusTrapOptions | false {
    const { trapFocus = true } = this.options;
    if (trapFocus === true) {
      return {
        onActivate: undefined,
        onDeactivate: undefined,
        initialFocus: undefined,
        fallbackFocus: undefined,
        returnFocusOnDeactivate: undefined,
        setReturnFocus: undefined,
        allowOutsideClick: undefined,
        escapeDeactivates: false,
        clickOutsideDeactivates: false,
      };
    }
    if (trapFocus === false) {
      return false;
    }
    return {
      ...trapFocus,
      escapeDeactivates: false,
      clickOutsideDeactivates: false,
    };
  }

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

    if (this.disableScrollOptions) {
      disableBodyScroll(this.element, this.disableScrollOptions);
    }
    this.focusTrap?.activate();
  };

  /**
   * Unbind Events
   */
  public unbind = (): void => {
    document.removeEventListener("keydown", this.handleKeyDown);

    if (this.disableScrollOptions) {
      enableBodyScroll(this.element);
    }
    this.focusTrap?.deactivate();
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
  };

  /**
   * Handle Escape KeyDown
   */
  private handleEscapeKeyDwon = (): void => {
    const { closeOnEsc = true } = this.options;
    if (closeOnEsc) {
      this.onClose();
    }
  };
}
