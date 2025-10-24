export default class HTMLService {
    #table = null;
    #tbody = null;
    #noSubscriberInfo = null;
    
    constructor(subscriberService) {        
        this.subscriberService = subscriberService;
        this.setFormListener();
        this.initializeTableReferences();
        this.fetchSubscribers();
    }

    initializeTableReferences() {
        const table = document.querySelector("table");
        if (!table) {
            console.log(`[HTMLService.js] the table element is required.`);
            return;
        }
        this.#table = table;
        this.#tbody = table.tBodies[0];
        this.#noSubscriberInfo = document.getElementById("no-subscriber");
    }

    async fetchSubscribers() {
        const subs = await this.subscriberService.getAll();
        if (!subs.length) return;        
        this.addSubsToTable(subs);
    }
    
    setFormListener() {
        const form = document.querySelector("form");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            console.log("[HTMLService.js] form trigged!");
            await this.save(form.email.value);
            form.reset();
            form.email.focus();
        });
    }

    async save(email) {
        if (!email) return;
        console.log(`👁️ [HTMLService.js] saving email ${email}`);
        const newSubscriber = await this.subscriberService.save(email);        
        this.addSubsToTable([newSubscriber]);
    }

    addSubsToTable(subs) {
        const rows = subs.map(this.mapToRow).join("");
        this.addToTable(rows);
    }

    mapToRow(subscriber) {
        if (!subscriber) return;

        const row = `
            <tr>
                <td>${new Date(subscriber.createdDate).toLocaleString("pt-BR")}</td>
                <td>${subscriber.email}</td>
                <td>
                <button
                    data-email="${subscriber.email}"
                    class="delete-sub">
                    🗑️
                    </button>
                </td>
            </tr>
        `;
        return row;
    }

    addToTable(rows) {
        if (!this.#tbody) return;        
        this.#tbody.insertAdjacentHTML("beforeend", rows);
        this.setDeleteBehavior();
        this.toggleTable();
    }

    toggleTable() {
        const table = this.#table;
        const tbody = this.#tbody;
        const noSubInfo = this.#noSubscriberInfo;
        const hasRows = tbody.rows.length;
        if (!hasRows) {
            table.hidden = true;
            noSubInfo.hidden = false;
            return;
        }
        table.hidden = false;
        noSubInfo.hidden = true;
    }

    setDeleteBehavior() {
        const deleteIcons = document.querySelectorAll(".delete-sub");
        deleteIcons.forEach((deleteIcon) => {
        deleteIcon.onclick = () => this.showConfirmDialog(deleteIcon);
        });
    }

    async showConfirmDialog(deleteIcon) {
        const dialog = document.getElementById("confirm-dialog");
        const span = dialog.querySelector("span");
        const email = deleteIcon.dataset.email;
        span.textContent = email;
        dialog.showModal();
        dialog.addEventListener('close', (event) => {
            const performedAction = event.target.returnValue;
            console.log(`[HTMLService.js] confirm dialog performed action`, performedAction);
            if (performedAction === 'confirmed') this.delete(deleteIcon);
        });        
    }

    async delete(deleteIcon) {
        const email = deleteIcon.dataset.email;
        const isDeleted = await this.subscriberService.delete(email);
        if (isDeleted) {
            deleteIcon.closest("tr")?.remove();
            this.toggleTable();
        }
    }
}