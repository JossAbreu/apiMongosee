import {db} from '../mongoose.js';



const StockSchema = new db.Schema({
    id_product: { type: db.Schema.Types.ObjectId, ref: 'Product' },
    id_store: { type: db.Schema.Types.ObjectId, ref: 'Store' },
    id_tax: { type: db.Schema.Types.ObjectId, ref: 'Tax' },
    stock: String,
    state: String,
  });
  
  export const Stock = db.model('Stock', StockSchema);