import { openDB } from 'idb';

const DB_NAME = "jate"

const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const contentDB = await openDB(DB_NAME, 1);

  const tx = contentDB.transaction(DB_NAME, 'readwrite');

  const store = tx.objectStore(DB_NAME);

  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

/*
  We need to add some code below which will get all content from IndexedDB.
*/
export const getDb = async () => {
  
  const contentDB = await openDB(DB_NAME, 1);
  const tx = contentDB.transaction(DB_NAME, 'readwrite');
  const store = tx.objectStore(DB_NAME);

  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
