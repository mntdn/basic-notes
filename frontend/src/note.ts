import BaseElement from "./classes/baseElement";
import { INote } from "./interfaces/INote";
import utils from "./shared/utils";
import dbStore from './store/db'

export default class Note extends BaseElement {
    data:INote;

    constructor(n: INote) {
        super();
        this.data = n;
        this.id = `note-${this.data._id}`;
        this.className = 'note';
    }

    getInnerHtml(): HTMLElement {
        let tmpl: HTMLElement = document.createElement('div');

        let header:HTMLElement = document.createElement('h1');
        header.textContent = `${this.data.title} @${this.data.lastUpdateDate}`;
        tmpl.appendChild(header);
        let header2:HTMLElement = document.createElement('h2');
        header2.textContent = `${this.data._id}`;
        tmpl.appendChild(header2);
        let text: HTMLTextAreaElement = document.createElement('textarea');
        text.value = this.data.content;
        tmpl.appendChild(text);
        tmpl.appendChild(
            utils.createButton('Update', '', () => {
                var textarea = document.querySelector(`#${this.id} textarea`);
                if(textarea) {
                    this.data.content = (textarea as HTMLTextAreaElement).value;
                    dbStore.updateNote(this.data._id, this.data.content);
                    this.toUpdate = true;
                }
            }),
        );

        return tmpl;
    }
}