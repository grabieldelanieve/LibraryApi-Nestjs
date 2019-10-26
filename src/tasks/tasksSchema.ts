// import * as mongoose from 'mongoose';

// export const TasksSchema = new mongoose.Schema({
//   id: Number,
//   title: String,
//   description: String,
//   done: Boolean,
// });

import { Schema } from 'mongoose';
export const TasksSchema = new Schema({
  title: String,
  description: String,
  done: Boolean,
});
