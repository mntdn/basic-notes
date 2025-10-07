import BaseElement from "../classes/baseElement";

console.log("INIT UI");

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

const uiStore = {
    checkUniqueId,
    addElement,
    updateAll
}

export default uiStore;