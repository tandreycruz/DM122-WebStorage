import HTMLService from "./HTMLService.js"
import SubscriberService from "./SubscriberService.js";

class App {
    constructor() {        
        const subscriberService = new SubscriberService();
        new HTMLService(subscriberService);
        console.log(`👁️ [app.js] initialized`);
    }
}

new App();

/*
const form = document.querySelector("form");
const main = document.querySelector("main");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("[app.js] form trigged!");
    console.log("email: ", form.email.value);
    window.localStorage.setItem('email', form.email.value);
    console.log("[app.js] email saved!");
    form.reset();
    loadSavedData();
});

function loadSavedData() {
    console.log("[app.js] fetching email");
    const email = window.localStorage.getItem("email");
    if (!email) {
        console.error("[app.js] no email found!");
        return;
    }
    console.log(`[app.js] ${email}`);
    const spanEmail = document.querySelector('.email');
    spanEmail.textContent = email;
}

loadSavedData();
*/