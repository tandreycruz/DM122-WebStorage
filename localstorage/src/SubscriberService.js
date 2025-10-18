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
        return newRecord;
    }
}