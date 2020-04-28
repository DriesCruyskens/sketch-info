const template = document.createElement('template');
  template.innerHTML = `
  <style>
    :host {
      /* Using system fonts for performance. */
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    
      contain: content;
    }

    :host([hidden]) {
      display: none;
    }

    .info-btn {
      margin: 0;
      padding: 0;
      background: none;
      text-decoration: none;
      border: none;
      outline: none;
    }

    .info-icon {
      opacity: .4;
      width: var(--info-icon-width, auto);
    }

    .info-icon:hover {
      opacity: 1;
      cursor: pointer;
    }

    /* Keep icon black while info is open. */
    :host([open]) .info-icon {
      opacity: 1;
    }

    #info-content {
      padding: 25px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      overflow-y: auto;
      max-height: 50%;
      max-width: 35%;

      background: var(--info-content-bg, #222);
      color: var(--info-content-color, white);

      transition: transform .3s ease-in-out;
    }

    :host(:not([open])) #info-content {
      transform: translate(-100%, -50%); 
    }

    ::slotted(h1) {
      margin-top: 0;
    }
  </style>

  <button class="info-btn">
    <img class="info-icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItaGVscC1jaXJjbGUiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIj48L2NpcmNsZT48cGF0aCBkPSJNOS4wOSA5YTMgMyAwIDAgMSA1LjgzIDFjMCAyLTMgMy0zIDMiPjwvcGF0aD48bGluZSB4MT0iMTIiIHkxPSIxNyIgeDI9IjEyLjAxIiB5Mj0iMTciPjwvbGluZT48L3N2Zz4="/>
  </button>
  <section id="info-content">
    <slot name='title'>Info</slot>
    <slot></slot>
  </section>
  
  `;

export class SketchInfo extends HTMLElement {
  static get observedAttributes() {
    return ['open'];
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.infoBtn = this.shadowRoot.querySelector(".info-btn")
  }

  connectedCallback() {
    /* if (!this.hasAttribute('open')) {
      this.setAttribute('open', ''); // Sets attribute open to true as default for developing purposes.
    } */

    this._upgradeProperty('open');

    // Binding SketchInfo's 'this' to toggleInfo so it can reference attributes.
    this.infoBtn.addEventListener("click", this.toggleInfo.bind(this));
  }

  toggleInfo() {
    if (this.hasAttribute("open")) {
      this.open = false;
    } else {
      this.open = true;
    }
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

  set open(value) {
    const isopen = Boolean(value);
    if (isopen) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  get open() {
    return this.hasAttribute('open')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'open':
        // Not used at the moment.
    }
  }

  disconnectedCallback() {
    this.infoBtn.removeEventListener("click", this.toggleInfo)
  }
}
