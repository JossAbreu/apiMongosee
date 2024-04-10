import {db} from '../mongoose.js';



const ProductsSchema = new db.Schema({
  name: String,
  cost_buy: Number,
  cost_sale: Number,
  description: String,
  store: { type: db.Schema.Types.ObjectId, ref: 'Store' },
  tax: { type: db.Schema.Types.ObjectId, ref: 'Tax' },
  image: String, 
  state: String,
});

  export const Product = db.model('Product', ProductsSchema);