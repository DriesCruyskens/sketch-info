const template = document.createElement('template');
  template.innerHTML = `
  <style>
    :host {
      display: block;
      contain: content;
    }

    :host([hidden]) {
      display: none;
    }
  </style>
  
  <slot name='title'>Info</slot>
  <slot></slot>
  `;

export class SketchInfo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
