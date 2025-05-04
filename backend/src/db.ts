import mongoose, { Mongoose } from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    UserName : {
        type : String,
        minlength : 3,
        maxlength : 20,
        trim : true,
        required : true
    },
    FirstName : {
        type : String,
        minlength : 3,
        maxlength : 20,
        trim : true,
        required : true
    },
    LastName : {
        type : String,
        minlength : 3,
        maxlength : 20,
        trim : true,
        required : true
    }
},{
    timestamps : true
})

const UserModel = mongoose.model('User', UserSchema)

const TaskSchema = new Schema({
    Task : {
        type : String,
        minlength : 3,
        maxlength : 1000,
        trim : true,
        required : true
    },
    CardId : {
        type : Schema.Types.ObjectId,
        ref : 'Card',
        required : true
    },
    isDone : {
        type : Boolean,
        required : true
    },
    CreatedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    ModifiedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    Assignee : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},{
    timestamps : true
})

const TaskModel = mongoose.model('Task', TaskSchema)

const CardSchema = new Schema({
    CardName : {
        type : String,
        maxlength : 20,
        trim : true,
        required : true
    },
    CreatedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
},{
    timestamps : true
})

const CardModel = mongoose.model('Card', CardSchema)

export {UserModel, TaskModel, CardModel}