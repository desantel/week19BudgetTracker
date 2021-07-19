export default async function getTransactions() {
    try {
        const res = await fetch('./api/transaction');
        const data = await res.json;
        
        return data;
    } catch (err) {
        console.log(err);
    }
}