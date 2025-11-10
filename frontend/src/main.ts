import Note from './note';
import utils from './shared/utils';
import './style/main.scss';
import dbStore from './store/db'
import uiStore from './store/ui'
import { UpdateEventParam } from './interfaces/events';

var currentNoteId: string|null = null;
var app = document.querySelector('#app');
var menu = document.querySelector('#menu');

const onCustomEvent = (event: CustomEvent<UpdateEventParam>) => {
  console.log("EVENT", event);
//   if(event.detail.elementToUpdate == 'menu')
}

document.addEventListener('updateEvent', onCustomEvent);

var showAll = async () => {
	let titles = await dbStore.getAllTitles();
	console.log("titles", titles);
	titles.rows.forEach((t) => {
		menu?.appendChild(utils.createLink(t.key, `?note=${t.id}`))
		menu?.appendChild(document.createElement('br'))
	})
	if(currentNoteId){
		let n = await dbStore.getNoteById(currentNoteId);
		if(n) {
			let _ = new Note(n);
			app?.appendChild(_.getElementHtml());
			uiStore.addElement(_);
		}
	}
}

if (menu && app) {
	let d = menu as HTMLElement;

	d.appendChild(
		utils.createButton('Add', '', () => {
			dbStore.addNote('Super test');
		}),
	);
	d.appendChild(
		utils.createButton('Show', '', async () => {
			await showAll();
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

window.onload = async () => { 
	console.log("LOAD");
	const s = /^\?note=(.*)$/.exec(window.location.search);
	if(s) {
		currentNoteId = s[1];
	}
	await showAll();
}
