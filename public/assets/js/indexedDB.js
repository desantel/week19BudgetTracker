const indexedDBName = 'ExpenseDB';
const storeName = 'ExpenseStore';
const dbVersion = 1;
let db;

function setupIndexedDB() {
  const req = indexedDB.open(indexedDBName, dbVersion);

  req.onupgradeneeded = function(e) {
    db = e.target.result;
    db.createObjectStore(storeName, { autoIncrement: true });

    console.log('upgraded');
  };

  req.onsuccess = function (e) {
    db = e.target.result;
    console.log('connected');
  };
  req.onerror  = function (e) {
    console.log(`Error: ${e.target.errorCode}`);
  };
}

export function saveRecord(rec) {
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  store.add(rec);

  console.log('Saved locally');
};

function checkDB() {
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  const allExpense = store.getAll();

  allExpense.onsuccess = async () => {
    try {
      if (!allExpense.result.length) return;

      const res = await fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(allExpense.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      if (!data.length) return;

      db.transaction(storeName, 'readwrite').objectStore(storeName).clear();
    } catch (err) {
      console.log(err);
    }
  }
};

export function indexDB() {
  window.addEventListener('online', checkDB);

  setupIndexedDB();
};