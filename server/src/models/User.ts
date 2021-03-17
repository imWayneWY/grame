import mongoose, { model, Schema } from 'mongoose';
export interface UserDoc extends mongoose.Document {
  email: string,
  password: string,
  username: string,
  createdAt: string,
}
const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: String,
  createdAt: String,
});

export default model<UserDoc>('User', userSchema);
 