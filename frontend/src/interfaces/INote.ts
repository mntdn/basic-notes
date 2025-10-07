export interface INote {
	_id: string;
	title: string;
    content: string;
    tagList: string[];
    creationDate: Date;
    lastUpdateDate: Date;
}

