import Note from './note';
import utils from './shared/utils';
import './style/main.scss';
import dbStore from './store/db'
import uiStore from './store/ui'

var app = document.querySelector('#app');
var menu = document.querySelector('#menu');
if (menu && app) {
	let d = menu as HTMLElement;

	d.appendChild(
		utils.createButton('Add', '', () => {
			dbStore.addNote('Super test');
		}),
	);
	d.appendChild(
		utils.createButton('Show', '', async () => {
			let n = await dbStore.getAllNotes();
			console.log("notes", n);
			n.rows.forEach(
				(r) => {
					if(r.doc) {
						let _ = new Note(r.doc);
						app?.appendChild(_.getElementHtml());
						uiStore.addElement(_);
					}
				},
			);
		}),
	);
	d.appendChild(
		utils.createButton('Sync', '', () => {
			dbStore.sync();
		}),
	);
	d.appendChild(
		utils.createButton('Update', '', () => {
			uiStore.updateAll();
		}),
	);
}
