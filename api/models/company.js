import { db } from '../mongoose.js';

const CompanySchema = new db.Schema({
  name: String, 
  description: String,
  email: String,
  location: String,
  phone: Number,
  rnc: Number,
  state: Boolean
});

export const Company = db.model('Company', CompanySchema, 'company');
