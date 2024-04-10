import {db} from '../mongoose.js';



const ServiceSchema = new db.Schema({
  name: String,
  cost_buy: Number,
  description: String,
  tax: { type: db.Schema.Types.ObjectId, ref: 'Tax' },
  image: String, 
  state: String,
});

  export const Service = db.model('Service', ServiceSchema);