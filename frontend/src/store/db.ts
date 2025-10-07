import PouchDB from 'pouchdb';
import configJson from '../config/config.json';
import { INote } from '../interfaces/INote';
import utils from '../shared/utils';

const db = new PouchDB('notes');
const remoteDb = new PouchDB(configJson.remoteDbAddress);

console.log("INIT DB");

function addNote(text: string) {
	const todo: INote = {
		_id: `${utils.guid()}-${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${new Date().getMilliseconds()}`,
		title: text,
		content: '',
		creationDate: new Date(),
		lastUpdateDate: new Date(),
	};
	db.put(todo)
		.then(() => {
			console.log('doc envoyé');
		})
		.catch((err) => {
			console.log('ERROR', err);
		});
}

async function updateNote(id: string, content: string) {
	let doc = await db.get<INote>(id);

	doc.content = content;
    doc.lastUpdateDate = new Date();
	await db.put(doc);
}

async function getAllNotes() {
	let result = await db.allDocs<INote>({
		include_docs: true,
		descending: true,
	});
	return result;
}

function sync() {
	db.replicate
		.to(remoteDb)
		.on('complete', function () {
			console.log('replication done');
		})
		.on('error', function (err) {
			// boo, something went wrong!
			console.log('Pb replication', err);
		});
}

const dbStore = {
	addNote,
	getAllNotes,
    updateNote,
	sync,
};

export default dbStore;
