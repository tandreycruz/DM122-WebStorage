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
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log("[HTMLService.js] form trigged!");
            this.save(form.email.value);
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
                <span
                    data-email="${subscriber.email}"
                    class="delete-sub">
                    🗑️
                    </span>
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
        deleteIcon.onclick = () => this.confirmDeletion(deleteIcon);
        });
    }

    async confirmDeletion(deleteIcon) {
        
        const isDeleted = await this.subscriberService.delete(
        deleteIcon.dataset.email
        );
        if (isDeleted) {
            deleteIcon.closest("tr")?.remove();
            this.toggleTable();
        }
    }
}