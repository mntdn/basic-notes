export interface INote {
	_id: string;
	title: string;
    content: string;
    tagList: string[];
    creationDate: Date;
    lastUpdateDate: Date;
}

export var emptyNote:INote = {
    _id: '',
    title: '',
    content: '',
    tagList: [],
    creationDate: new Date(),
    lastUpdateDate: new Date(),
}

export interface ITitle  {
	_id: string;
	title: string;
}