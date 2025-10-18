const DB_KEY = "INATEL::SUBSCRIBER:DB";
export default class SubscriberService {
    db = [];

    constructor() {
        console.log(`👁️ [SubscriberService.js] initialized`);
    }

    async saveEmail(email) {
        if (!email) {
            console.error(`[SubscriberService.js] no email provided`);
            return;
        }
        const newRecord = {
            createdDate: new Date(),
            email,
        };
        this.db.push(newRecord);        
        console.log(`👁️ [SubscriberService.js] ${email} added`);
        console.table(this.db);
        this.serialize();
        return newRecord;
    }

    serialize() {
        const subsString = JSON.stringify(this.db);
        window.localStorage.setItem(DB_KEY, subsString);
        console.log(`👁️ [SubscriberService.js] finish serialization`);
    }

    deserialized() {
        const subsString = window.localStorage.getItem(DB_KEY) || "[]";
        const subsJson = JSON.parse(subsString);
        this.db = subsJson;
        console.log(`👁️ [SubscriberService.js] load subs data`);
        console.table(this.db);
    }
}