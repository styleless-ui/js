import { EventHandler } from "./EventHandler";

export type Options = {
  onChange?: (element: HTMLElement, isOpen: boolean) => void;
};

export class Dropdown {
  /** Event Handler Instance */
  private eventHandler: EventHandler;

  /**
   * Create Instance
   */
  public constructor(private element: HTMLElement, private options: Options) {
    this.eventHandler = new EventHandler(this.element, {
      onClose: this.close,
    });
    this.close();
  }

  /**
   * Open
   */
  public open = (): void => {
    this.element.setAttribute("area-hidden", "false");
    this.onChange(true);
    this.eventHandler.bind();
  };

  /**
   * Close
   */
  public close = (): void => {
    this.eventHandler.unbind();
    this.element.setAttribute("area-hidden", "true");
    this.onChange(false);
  };

  /**
   * Dispose Instance
   */
  public dispose = (): void => {
    this.eventHandler.dispose();
  };

  /**
   * onChange
   */
  private onChange = (isOpen: boolean): void => {
    if (this.options.onChange) {
      this.options.onChange(this.element, isOpen);
    }
  };
}
