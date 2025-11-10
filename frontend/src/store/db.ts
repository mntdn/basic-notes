import PouchDB from 'pouchdb';
import configJson from '../config/config.json';
import { INote } from '../interfaces/INote';
import utils from '../shared/utils';
declare function emit(...args: [val: any] | [key: any, value: any]): any;

const db = new PouchDB('notes');
const remoteDb = new PouchDB(configJson.remoteDbAddress);

const ddoc = {
  _id: '_design/notes_IDX',
  views: {
    all_titles: {
      map: function (doc: any) { emit(doc.title); }.toString()
    }
  }
};
// save it
db.put(ddoc).then(function () {
  // success!
  console.log("query saved")
}).catch(function (err) {
  // some error (maybe a 409, because it already exists?)
  console.log("query error", err)
});

console.log("INIT DB");

function addNote(text: string) {
	const todo: INote = {
		_id: new Date().toJSON(),
		title: text,
		content: '',
		tagList: [],
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

async function updateNote(note: INote) {
	let doc = await db.get<INote>(note._id);

	doc.content = note.content;
	doc.title = note.title;
	doc.tagList = ['test'];
    doc.lastUpdateDate = new Date();
	await db.put(doc);
}

async function removeNote(note: INote) {
	let doc = await db.get<INote>(note._id);
	await db.remove(doc);
}

async function getAllNotes() {
	let result = await db.allDocs<INote>({
		include_docs: true,
		descending: true,
	});
	return result;
}

async function getNoteById(id:string) {
	let result = await db.get<INote>(id);
	return result;
}

async function getAllTitles() {
	let result = await db.query('notes_IDX/all_titles');
	return result;
}

function sync() {
	db.sync(remoteDb)
		.on('complete', function () {
			console.log('sync done');
		})
		.on('error', function (err) {
			// boo, something went wrong!
			console.log('Pb sync', err);
		});
}

function sendToServer() {
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
	getNoteById,
	getAllNotes,
	getAllTitles,
    updateNote,
	removeNote,
	sendToServer,
	sync,
};

export default dbStore;
