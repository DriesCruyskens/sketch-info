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
  static get observedAttributes() {
    return ['closed'];
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    if (!this.hasAttribute('closed')) {
      this.setAttribute('closed', true)
    }
  }
}
