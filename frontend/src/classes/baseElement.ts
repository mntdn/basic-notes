export default class BaseElement {
    id: string = '';
    className: string = '';
    toUpdate: boolean = false;

    getElementHtml():HTMLElement {
        let div: HTMLDivElement = document.createElement('div');
        div.id = this.id;
        div.className = this.className;
        div.append(this.getInnerHtml());
        return div;
    }

    getInnerHtml(): HTMLElement {
        let div: HTMLElement = document.createElement('div');
        return div;
    }

    update(){
        let d = document.getElementById(this.id);
        if(d) {
            console.log("update", this.id);
            d.innerHTML = '';
            d.append(this.getInnerHtml());
        }
    }
}