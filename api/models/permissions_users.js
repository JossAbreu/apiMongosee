import {db} from '../mongoose.js';

// Define a mongoose model for users
const Permission_userSchema = new db.Schema({
  user_id: { type: db.Schema.Types.ObjectId, ref: 'User' },
  permissions: {
    dashboard: { view_dashboard: Boolean },
    products: {
      view_products: Boolean,
      add_product: Boolean,
      edit_product: Boolean,
      adm_taxes: Boolean,
    },
    stores: {
      view_stores: Boolean,
      add_store: Boolean,
      edit_store: Boolean,
    },
    stocks: {
      view_stocks: Boolean,
      adm_stock: Boolean,
    },
    invoice: {
      view_invoices: Boolean,
      create_invoice: Boolean,
    },
    users: {
      adm_users: Boolean,
      create_user: Boolean,
      adm_permissions: Boolean,
    },
  },
});



export const Permission_user= db.model('Permission_user', Permission_userSchema);