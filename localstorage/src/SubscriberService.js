const DB_KEY = "INATEL::SUBSCRIBER:DB";

export default class SubscriberService {
    #db = [];

    constructor() {
        this.deserialized();
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
        this.serialize();
        return { ...newRecord };
    }

    async getAll() {
        return window.structuredClone(this.#db);
    }

    async delete(email) {
        console.log(`👁️ [SubscriberService.js] delete email ${email}`);
        this.#db = this.#db.filter((sub) => sub.email != email);
        this.serialize();
        return true;
    }

    serialize() {
        const subsString = JSON.stringify(this.#db);
        window.localStorage.setItem(DB_KEY, subsString);
        console.log(`👁️ [SubscriberService.js] finish serialization`);
    }

    deserialized() {
        const subsString = window.localStorage.getItem(DB_KEY) || "[]";
        const subsJson = JSON.parse(subsString);
        this.#db = subsJson;
        console.log(`👁️ [SubscriberService.js] loaded subs records`);
        //console.table(this.#db);
    }
}