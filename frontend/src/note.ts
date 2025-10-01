import { INote } from "./interfaces/INote";
import utils from "./shared/utils";
import dbStore from './store/db'

export default class Note {
    data:INote;

    constructor(n: INote) {
        this.data = n;
    }

    getHtml(): HTMLElement {
        let div: HTMLDivElement = document.createElement('div');
        div.className = 'note';
        let header:HTMLElement = document.createElement('h1');
        header.textContent = this.data.title;
        div.appendChild(header);
        let text: HTMLInputElement = document.createElement('input');
        text.type = 'textarea';
        div.appendChild(text);
        div.appendChild(
            utils.createButton('Update', '', () => {
                dbStore.updateNote(this.data._id, 'truc de ouf');
            }),
        );

        return div;
    }
}