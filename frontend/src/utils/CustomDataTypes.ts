export interface CardType {
    _id : string;
    CardName : string;
    CreatedBy : string;
    createdAt : string;
    updatedAt : string; 
}

export interface TaskType {
    _id : string;
    Task : string;
    CardId : string;
    isDone : boolean;
    CreatedBy : string;
    ModifiedBy : string;
    Assignee : string;
    createdAt : string;
    updatedAt : string;
}

