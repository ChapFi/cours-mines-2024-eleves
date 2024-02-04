import {html, css} from "lit"
import { BeeperBase } from "./beeper-base.js";

export class TopBeeper extends BeeperBase{
    static properties = {
        beepers: {
          type: Object,
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
        this.beepers = null;
    }

    async connectedCallback() {
        super.connectedCallback();
        const response = await fetch("/api/top"); // on récupérer les 5 utilisateurs la plus liké
        this.beepers = await response.json();
    }

    render(){
        return html`
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
            crossorigin="anonymous"
        />
        <div class="container text-center">
        <div class="row row-cols-5">
            <div class="col">
                <img src="${this.beepers[0].profile?.picture}" class="profile-picture" alt="${this.beepers[0].userName}">
            </div>
            <div class="col">
                <img src="${this.beepers[1].profile?.picture}" class="profile-picture" alt="${this.beepers[1].userName}">
            </div>
            <div class="col">
                <img src="${this.beepers[2].profile?.picture}" class="profile-picture" alt="${this.beepers[2].userName}">
            </div>
            <div class="col">
                <img src="${this.beepers[3].profile?.picture}" class="profile-picture" alt="${this.beepers[3].userName}">
            </div>
            <div class="col">
                <img src="${this.beepers[4].profile?.picture}" class="profile-picture" alt="${this.beepers[4].userName}">
            </div>
        </div>
        </div>
        `;
    }
}

customElements.define("top-beeper", TopBeeper);