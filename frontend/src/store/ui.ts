import BaseElement from "../classes/baseElement";
import Note from "../note";
import utils from "../shared/utils";
import dataStore from "./data";
import dbStore from "./db";

console.log("INIT UI");
var menu = document.querySelector('#menu');
var app = document.querySelector('#app');

const elementList: BaseElement[] = [];
const idSet: Set<string> = new Set();

function checkUniqueId(id: string): string{
    while(idSet.has(id))
        id += '1';
    return id;
}

function addElement(e: BaseElement) {
    elementList.push(e);
}

function updateAll() {
    elementList.forEach(e => {
        if(e.toUpdate) {
            e.update();
            e.toUpdate = false;
        }
    })
}

function renderMenuHTML(){
    let d = menu as HTMLElement;
    d.innerHTML = '';

	d.appendChild(
		utils.createButton('Add', '', () => {
			dbStore.addNote('Super test');
		}),
	);
	// d.appendChild(
	// 	utils.createButton('Show', '', async () => {
	// 		await showAll();
	// 	}),
	// );
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

    d.appendChild(utils.createDiv('', 'border-bottom: 1px solid grey; margin-top: 4px;'))
    if(dataStore.titles().length > 0){
        dataStore.titles().forEach((t) => {
            d.appendChild(utils.createLink(t.title, `#note=${t._id}`))
            d.appendChild(document.createElement('br'))
        })
    }
}

function renderNote() {
	if(app && dataStore.currentNote()._id.length > 0){
        app.innerHTML = '';
        let _ = new Note(dataStore.currentNote());
        app?.appendChild(_.getElementHtml());
        uiStore.addElement(_);
	}
}

const uiStore = {
    checkUniqueId,
    addElement,
    updateAll,
    renderMenuHTML,
    renderNote
}

export default uiStore;