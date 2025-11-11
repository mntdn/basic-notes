import { emptyNote, INote, ITitle } from "../interfaces/notes";
import dbStore from './db'

class ObjectGetter<Type> {
    obj: Type|undefined;
    lastUpdateDate: Date|null;
    toUpdate: boolean = false;
    update: () => Promise<Type>;
    async getLatest(){
        if(this.toUpdate || this.lastUpdateDate === null){
            this.obj = await this.update();
            this.lastUpdateDate = new Date();
            this.toUpdate = false;
        }
        return this.obj;
    }
    constructor(f: () => Promise<Type>, updateOnStart: boolean){
        this.lastUpdateDate = null;
        this.update = f;
        this.toUpdate = updateOnStart;
    }
}

var currentNoteId:string|null = null;

const _titles: ObjectGetter<ITitle[]> = new ObjectGetter<ITitle[]>(async () => {
    var t = await dbStore.getAllTitles();
    var result: ITitle[] = [];
    t.rows.forEach((r) => {
        result.push({
            _id: r.id,
            title: r.key
        });
    })
    return result;
}, true);

const titles = () => _titles.obj ?? [];

const _currentNote: ObjectGetter<INote> = new ObjectGetter<INote>(async () => {
    let result: INote = emptyNote;
    if(currentNoteId){
        result = await dbStore.getNoteById(currentNoteId);
    }
    return result;
}, true);

const currentNote = () => _currentNote.obj ?? emptyNote;

const updateAll = async () => {
    if(_titles.toUpdate){
        await _titles.getLatest();
    }
	const s = /^#note=(.*)$/.exec(window.location.hash);
	if(s && s[1] !== currentNoteId) {
        currentNoteId = s[1];
        _currentNote.toUpdate = true;
        await _currentNote.getLatest();
	}
}

const dataStore = {
    updateAll,

    titles,
    currentNote,
    currentNoteId
}

export default dataStore;