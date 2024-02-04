import { css, html, LitElement } from "lit";
import "../../component/beep-view.js";
import "../../component/beeper-header.js";
import "../../component/top-beeper.js";
import "../../component/best-beeps.js";

class BeeperHome extends LitElement {
  static properties = {
    beepList: {
      state: true,
    },
    userName:{
      state: true,
    },
  };

  constructor() {
    super();
    this.beepList = [];
    this.userName = null;
  }

  async connectedCallback() {
    super.connectedCallback();
    const response = await fetch("/api/home");
    this.beepList = await response.json();
    const rep = await fetch("/api/me");
    const user = await rep.json();
    this.userName = user.name
  }

  async handlePostBeep(event) {
    const textareaElement = event.target;

    let content = textareaElement.value;
    content = content.slice(0, content.length - 1);
    
    if (event.code === "Enter" && !event.getModifierState("Shift")) {
      const response = await fetch("/api/beep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: content }),
      });
      textareaElement.value = "";
      const postedBeep = await response.json();
      this.beepList = [postedBeep, ...this.beepList];
    }
  }

  render() {
    return html`
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
    <beeper-header></beeper-header>
    <div class="container">
    <h1>Bienvenue de nouveau ${this.userName ?? ""} 👋</h1>
    <hr/>
    <div class="form-floating">
      <div class="mb-3">
        <h3>Ecrire un Beep</h3>
        <textarea class="form-control" maxlength="40" placeholder="Message" id="floatingTextarea" @keyup=${this.handlePostBeep}></textarea>
      </div>
      <div class="text-end">
        <input type="reset" class="btn btn-danger" />
        <button type="submit" class="btn btn-primary">Envoyer</button>
      </div>
    </div>
    <hr/>
    </div>
    <div class="container">
      <div class="row">
        <div class="col">
          ${this.beepList.map(
          (b) => html`<beep-view beep="${JSON.stringify(b)}"></beep-view>`
          )}
        </div>
        <div class="col">
          <h3>Beeper à Suivre </h3>
          <hr>
          <h3>Beeps Populaires </h3>
          <best-beeps></best-beeps>
      </div>
    </div>
  </div> `;
  }
}

customElements.define("beeper-home", BeeperHome);