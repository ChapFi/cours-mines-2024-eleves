class BeepElement extends HTMLElement{
    static observedAttributes = ['message'];
    constructor(){
        super(); 
        const beepTemplate = document.querySelector("#beep-template");
        const shadowRoot = this.attachShadow({mode:'open'})
        shadowRoot.appendChild(beepTemplate.content.cloneNode(true))
    }

    connectedCallback(){
        console.log("Custom element added to page.")
    }

    disconnectedCallback(){
        console.log("Custom element removed from page.")
    }
    
    adoptedCallback(){
        console.log["Custom element attributes changed."]
    }

    attributeChangedCallback(name, oldvalue, newvalue){
        console.log(`Attribut ${name} change has changed.`, oldvalue, newvalue)
        if(name === 'message'){
            const beepMesssage = this.shadowRoot.querySelector(".beep-message")
            if (newvalue != ""){
                beepMesssage.textContent = newvalue; 
            }
        }
    }
}

customElements.define("m-beep", BeepElement)

