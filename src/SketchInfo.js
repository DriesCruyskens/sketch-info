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
      this.setAttribute('closed', ''); // Sets attribute closed to true as default.
    }

    this._upgradeProperty('closed');
  }

  /* _upgradeProperty() captures the value from the unupgraded
     instance and deletes the property so it does not shadow the 
     custom element's own property setter. This way, when the 
     element's definition does finally load, it can immediately
      reflect the correct state. As per Google's best practices on
      Web Components.
  */
  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  set closed(value) {
    const isClosed = Boolean(value);
    if (isClosed) {
      this.setAttribute('closed', '');
    } else {
      this.removeAttribute('closed');
    }
  }

  get closed() {
    return this.hasAttribute('closed')
  }
}
