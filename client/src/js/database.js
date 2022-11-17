import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initdb = async => {
    openDB('contact_db', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('contacts')) {
                console.log('contacts store already exists');
                return;
            }
            db.createObjectStore('contacts', { keypath: 'id', autoIncrement: true });
            console.log('contacts store created');
        }
    })
}

//Export a function we will use to GET to the database.
export const getDb = async () => {
    console.log('GET from the database');

    //create a connection to the IndexedDB database and the version we want to use
    const contactDB = await openDB('contact_db', 1);

    //create a new transaction and sepcify the store and data privileges.
    const tx = contactDB.transaction('contacts', readonly);

    //open up the desired object store.
    const store = tx.objectStore('contacts');

    //use the .getAll() method to get all data in the database
    const request = store.getAll();

    //get confirmation of the request.
    const result = await request;
    console.log('result.value', result);
    return result;
}

//export a function we will use to POST to the database
export const postDb = async (name, email, phone, profile) => {
    console.log('POST to the database');

    //Create a connection to the database and specify the version we want to use
    const contactDb = await openDB('contact_db', 1);

    //Create a new transaction and specify the store and data privileges
    const tx = contactDb.transaction('contacts', 'readwrite');

    //open up the desired object store
    const store = tx.objectStore('contacts');

    //use the .add() method on the store and pass in the content.
    const request = store.add({ name: name, email: email, phone: phone, profile: profile });

    //get confirmation of the request
    const result = await request;
    console.log('-data saved to the database', result);
}

