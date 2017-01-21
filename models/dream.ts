import * as mongoose from 'mongoose';

export interface IComment extends mongoose.Document{
  username:string;
  commentTitle:string;
  text:string;
}

export interface IDream extends mongoose.Document{
  username : string;
  title: string;
  content: string;
  dreamDate: Date;
  recurring: boolean;
  nightmare: boolean;
  lucid: boolean;
  role: boolean;
  pvt:boolean;
  emotions: string[];
  comments:IComment[];
}

let CommentSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  commentTitle:{
    type:String,
    required:true
  },
  text:{
    type:String,
    required:true
  }
});

let DreamSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  },
  dreamDate:{
    type:Date,
    required:true
  },
  recurring:{
    type:Boolean,
    required:true
  },
  nightmare:{
    type:Boolean,
    required:true
  },
  lucid:{
    type:Boolean,
    required:true
  },
  role:{
    type:Boolean,
    required:true
  },
  pvt:{
    type:Boolean,
    required:true
  },
  emotions:[String],
  comments:[CommentSchema]
});

export default mongoose.model<IDream>('Dream', DreamSchema);
