declare module "gsap/SplitText" {
  export class SplitText {
    constructor(element: Element | string, config: { type: string });
    chars: HTMLElement[];
    lines: HTMLElement[];
    words: HTMLElement[];
    revert(): void;
  }
}
