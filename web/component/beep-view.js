import {html, css} from "lit"
import formatDistanceToNow from "formatDistanceToNow"
import { BeeperBase } from "./beeper-base.js";

export class BeepView extends BeeperBase{
    static properties = {
        beep: {
          type: Object,
        },
    };
    
    constructor() {
        super();
        this.beep = null;
    }

    async handleDisLikeBeep(event){
        const response = await fetch("/api/dislike", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({beepId: this.beep.id }),
        });
        const rep = await response.json();
        this.beep = {...this.beep, likeCount:rep.newCount, liked:false}
    }

    async handleLikeBeep(event) {
        const response = await fetch("/api/like", {
            method: "POST",
            headers: {
             "Content-Type": "application/json",
        },
        body: JSON.stringify({ beepId: this.beep.id }),
        });
         const rep = await response.json();
         this.beep = {...this.beep, likeCount:rep.newCount, liked:true}
        
    }

    render(){
        return html`
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
            crossorigin="anonymous"
        />
        <div class="container">
            <div class="card border-primary mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src=${this.beep.authorPicture} class="card-img-top" alt="Profile picture of ${this.beep.authorName}">
                    </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-subtitle mb-2 text-body-secondary">
                            ${this.beep.authorName}
                        </h5>
                        <p class="card-text beep-message">${this.beep.content}</p>
                        <p class="card-text"><small class="text-body-secondary">
                            - ${formatDistanceToNow(this.beep.createdAt)}
                        </small></p>
                        <span class ="beep-likes">${this.beep.likeCount}</span>
                        <span>likes</span>
                        <a href="#" class="card-link" id="like" @click=${ this.beep.liked ? this.handleDisLikeBeep : this.handleLikeBeep}>
                        ${this.beep.liked ? "DisLiker":"Liker"}
                        </a>
                        <a href="#" class="card-link">Répondre</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define("beep-view", BeepView);