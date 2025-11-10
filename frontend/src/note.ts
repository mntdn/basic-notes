import BaseElement from "./classes/baseElement";
import { INote } from "./interfaces/INote";
import utils from "./shared/utils";
import dbStore from './store/db'
import uiStore from "./store/ui";

export default class Note extends BaseElement {
    data:INote;

    constructor(n: INote) {
        super();
        this.data = n;
        this.id = utils.sanitizeId(`note-${this.data._id}`);
        this.className = 'note';
    }

    getInnerHtml(): HTMLElement {
        let tmpl: HTMLElement = document.createElement('div');

        const hr: HTMLElement = document.createElement('hr');
        tmpl.appendChild(hr);
        this.data.tagList?.forEach((t) => {
            const sp: HTMLSpanElement = document.createElement('span');
            sp.className = 'tag';
            sp.innerText = t;
            tmpl.appendChild(sp);
        });
        const br: HTMLElement = document.createElement('br');
        tmpl.appendChild(br);

        let input: HTMLInputElement = document.createElement('input');
        input.type = "text";
        input.value = this.data.title;
        tmpl.appendChild(input);
        let header:HTMLElement = document.createElement('h1');
        header.textContent = `@${this.data.lastUpdateDate}`;
        tmpl.appendChild(header);
        let header2:HTMLElement = document.createElement('h2');
        header2.textContent = `${this.data._id}`;
        tmpl.appendChild(header2);
        let text: HTMLTextAreaElement = document.createElement('textarea');
        text.rows = 10;
        text.cols = 80;
        text.value = this.data.content;
        tmpl.appendChild(text);
        tmpl.appendChild(
            utils.createButton('Update', '', () => {
                var textarea = document.querySelector(`#${this.id} textarea`);
                var textInput = document.querySelector(`#${this.id} input`);
                if(textarea && textInput) {
                    this.data.content = (textarea as HTMLTextAreaElement).value;
                    this.data.title = (textInput as HTMLInputElement).value;
                    dbStore.updateNote(this.data);
                    this.toUpdate = true;
                    uiStore.updateAll();
                }
            }),
        );
        tmpl.appendChild(
            utils.createButton('Delete', '', () => {
                dbStore.removeNote(this.data);
                window.location.href = window.location.origin;
            }),
        );

        return tmpl;
    }
}