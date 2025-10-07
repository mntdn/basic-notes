import Note from './note';
import utils from './shared/utils';
import dbStore from './store/db'
import uiStore from './store/ui'

var app = document.querySelector('#app');
if (app) {
	let d = app as HTMLElement;

	d.appendChild(
		utils.createButton('Add', '', () => {
			dbStore.addNote('Super test');
		}),
	);
	d.appendChild(
		utils.createButton('Show', '', async () => {
			let n = await dbStore.getAllNotes();
			console.log("notes", n);
			var logs = document.querySelector('#logs');
			if (logs) {
				n.rows.forEach(
					(r) => {
						if(r.doc) {
							let _ = new Note(r.doc);
							logs?.appendChild(_.getElementHtml());
							uiStore.addElement(_);
						}
					},
				);
			}
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
