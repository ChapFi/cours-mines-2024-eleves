import { LitElement, css, html } from "lit";

export class BeeperBase extends LitElement {
  render() {
    return html`
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
            crossorigin="anonymous"
        />
      <div>This should never be displayed - Extend this element</div>
    `;
  }
}
customElements.define("beeper-base", BeeperBase);