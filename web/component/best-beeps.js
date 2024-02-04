import {html, css} from "lit"
import { BeeperBase } from "./beeper-base.js";
import "../../component/beep-view.js";

export class BestBeeps extends BeeperBase{
    static properties = {
        beeps: {
          type: Object,
        },
    };
    
    constructor() {
        super();
        this.beepList = [];
    }

    async connectedCallback() {
        super.connectedCallback();
        const response = await fetch("/api/best"); // on récupérer les 3 beeps les plus liké
        this.beepList = await response.json();
    }

    render(){
        return html`
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
            crossorigin="anonymous"
        />
        <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <div class="d-block w-100">
                ${this.beepList.map(
                    (b) => html`<beep-view beep="${JSON.stringify(b)}"></beep-view>`
                )}</div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    `;
    }
}

customElements.define("best-beeps", BestBeeps);