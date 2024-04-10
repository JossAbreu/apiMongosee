import {db} from '../mongoose.js';



const StoreSchema = new db.Schema({
    image: String, 
    store_name: String,
    description: String,
    state: String,
  });
  
  export const Store = db.model('Store', StoreSchema);