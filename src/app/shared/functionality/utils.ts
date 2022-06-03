import { ElementRef } from "@angular/core";

export class Utils {
  static calculateBackgroundSize(element: ElementRef, selector: string) {
    const home: HTMLHtmlElement = element.nativeElement.querySelector(selector);
    const width: number = window.innerWidth / 1234;
    const height: number = window.innerHeight / 1080;
    if (width > height) {
      home.style.width = '114.26vh';
      home.style.height = '100vh';
    }
    else {
      home.style.width = '100vw';
      home.style.height = '87.52vw';
    }
  }

  static calculateTextSize() {
    const html: HTMLHtmlElement | null = document.querySelector('html');
    if (html) {
      let size: number = 16;
      const width: number = window.innerWidth / 1234 * size;
      const height: number = window.innerHeight / 1080 * size;
      width > height
      ? size = height
      : size = width;
      html.style.fontSize = size.toString() + 'px';
    }
  }
}