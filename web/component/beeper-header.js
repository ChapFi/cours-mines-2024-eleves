import { css, html } from "lit";
import { getActiveUserProfile } from "../util/active-user-profile.js";
import { BeeperBase } from "./beeper-base.js";

export class BeeperHeader extends BeeperBase {
  static properties = {
    profile: {
      state: true,
    },
  };
  static styles = [
    css`
      .profile-picture {
        border-radius: 50%;
        height: 30px;
        width: 30px;
      }
    `,
  ];

  constructor() {
    super();
    this.profile = null;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.profile = await getActiveUserProfile();
  }

  render() {
    return html`
      <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
            crossorigin="anonymous"
        />
      <nav  class="navbar sticky-top navbar-expand-lg bg-body-tertiary" style="background-color: #e3f2fd;" >
        <div class="container-fluid">
          <a class="navbar-brand mb-0 h1" >Beeper</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a href="/home" class="nav-link active" aria-current="page" href="#"
                  >Timeline</a>
              </li>
              <li class="d-inline-block align-text-top">
                <img class="profile-picture" src="${this.profile?.picture}" alt="${this.userName}" width="30" height="24"/>
              </li>
              <li class="nav-item">
                <a href="/logout" class="nav-link"> Déconnexion</a>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Rechercher"
                aria-label="Rechercher"
              />
              <button class="btn btn-outline-success" type="submit">
                Rechercher
              </button>
            </form>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define("beeper-header", BeeperHeader);
