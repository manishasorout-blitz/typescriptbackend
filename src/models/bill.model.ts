import { Schema, model, Document } from 'mongoose';

const BillModelSchema: Schema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  expense_date: Date,
  is_Active: { type: Boolean, default: true },
});
const BillModel = model<Document>('expenses', BillModelSchema);

export default BillModel;
