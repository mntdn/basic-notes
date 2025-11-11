import Note from './note';
import utils from './shared/utils';
import './style/main.scss';
import dbStore from './store/db';
import uiStore from './store/ui';
import dataStore from './store/data';
import { UpdateEventParam } from './interfaces/events';

var app = document.querySelector('#app');
var menu = document.querySelector('#menu');

const onCustomEvent = (event: CustomEvent<UpdateEventParam>) => {
	console.log('EVENT', event, dataStore.titles);
	//   if(event.detail.elementToUpdate == 'menu')
};

window.addEventListener('hashchange', async () => {
	// window.history.pushState({}, null, myOldUrl);
	console.log('new hash', location.hash);
	await dataStore.updateAll();
	uiStore.updateAll();
	uiStore.renderNote();
});

document.addEventListener('updateEvent', onCustomEvent);

// var showAll = async () => {
// 	if(currentNoteId){
// 		let n = await dbStore.getNoteById(currentNoteId);
// 		if(n) {
// 			let _ = new Note(n);
// 			app?.appendChild(_.getElementHtml());
// 			uiStore.addElement(_);
// 		}
// 	}
// }

if (menu && app) {
}

window.onload = async () => {
	console.log('LOAD');
	await dataStore.updateAll();
	uiStore.renderMenuHTML();
	uiStore.renderNote();
};
