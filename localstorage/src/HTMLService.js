export default class HTMLService {
    constructor(subscriberService) {
        this.setFormListener();
        this.subscriberService = subscriberService;
    }    
    
    setFormListener() {
        const form = document.querySelector("form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log("[HTMLService.js] form trigged!");
            this.saveEmail(form.email.value);
        });
    }

    async saveEmail(email) {
        if (!email) return;
        console.log(`👁️ [HTMLService.js] saving email ${email}`);
        const newSubscriber = await this.subscriberService.saveEmail(email);        
        this.addToTable(newSubscriber);
    }

    addToTable(subscriber) {
        const table = document.querySelector("table");
        if (!table || !subscriber) return;
        const tbody = table.tBodies[0];
        const row = tbody.insertRow();
        const dateCell = row.insertCell();
        const emailCell = row.insertCell();
        const deleteCell = row.insertCell();
        dateCell.textContent = subscriber.createdDate.toLocaleString("pt-BR");
        emailCell.textContent = subscriber.email;
        deleteCell.textContent = "🗑️";
        table.hidden = false;
    }
}