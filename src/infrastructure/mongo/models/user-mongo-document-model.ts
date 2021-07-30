import * as Mongoose from 'mongoose';

export const UserMongoDocumentModel: Mongoose.Model<any> = Mongoose.model(
  'User',
  new Mongoose.Schema({
    _id: { type: String, required: true },
    emailAddress: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
  }),
  'users',
);
