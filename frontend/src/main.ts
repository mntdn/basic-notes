import PouchDB from 'pouchdb';
import utils from './shared/utils';
const db = new PouchDB('test');
// const remoteCouch = false;

interface todoDoc {
	_id: string;
	title: string;
	completed: boolean;
}

function addTodo(text: string) {
	const todo: todoDoc = {
		_id: new Date().toISOString(),
		title: text,
		completed: false,
	};
	db.put(todo)
		.then(() => {console.log("doc envoyé")})
		.catch((err) => {console.log("ERROR", err)});
}

function showTodos() {
	db.allDocs<todoDoc>({ include_docs: true, descending: true })
	.then((doc) => {
		console.log(doc)
		var logs = document.querySelector('#logs');
		if (logs) {
			let res = '';
			doc.rows.forEach(r => res += `${r.doc?._id} ${r.doc?.title}<br />`)
			logs.innerHTML = res;
		}
	});
}

var app = document.querySelector('#app');
if (app) {
	let d = (app as HTMLElement);

	d.appendChild(utils.createButton('Add', '',() => {addTodo('Super test');}));
	d.appendChild(utils.createButton('Show', '',() => {showTodos();}));
}

