import {db} from '../mongoose.js';

// Define a mongoose model for users
const UserSchema = new db.Schema({
  username: String,
  password: String,
  image: String,
  roll: String,
  state: String,
});


export const User = db.model('User', UserSchema);