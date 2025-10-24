import HTMLService from "./modules/HTMLService.js"
import SubscriberService from "./modules/SubscriberService.js";

class App {
    constructor() {        
        const subscriberService = new SubscriberService();
        new HTMLService(subscriberService);
        console.log(`👁️ [app.js] initialized`);
    }
}

new App();