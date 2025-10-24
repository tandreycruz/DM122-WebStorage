const DB_KEY = "INATEL::SUBSCRIBER:DB";

export default class SubscriberService {
    #db = [];

    constructor() {        
        console.log(`👁️ [SubscriberService.js] initialized`);
    }

    async save(email) {
        if (!email) {
            console.error(`[SubscriberService.js] no email provided`);
            return;
        }
        const isDuplicated = this.#db.some((sub) => sub.email === email);
        if (isDuplicated) {
        console.error(`[SubscriberService.js] duplicated email: ${email}`);
        return;
        }
        const newRecord = {
            createdDate: new Date(),
            email,
        };
        this.#db.push(newRecord);        
        console.log(`👁️ [SubscriberService.js] ${email} added`);
        //console.table(this.#db);        
        return { ...newRecord };
    }

    async getAll() {
        return window.structuredClone(this.#db);
    }

    async delete(email) {
        console.log(`👁️ [SubscriberService.js] delete email ${email}`);
        this.#db = this.#db.filter((sub) => sub.email != email);        
        return true;
    }    
}