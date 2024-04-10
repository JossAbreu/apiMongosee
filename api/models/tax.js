import {db} from '../mongoose.js';



const TaxSchema = new db.Schema({
    tax_value:Number,
    state: String,
  });
  
  export const Tax = db.model('Tax', TaxSchema);