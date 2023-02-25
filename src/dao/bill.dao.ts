import BillModel from '@/models/bill.model';

export default class BillDao {
  private billModel = BillModel;
  public createBill = async (title: string, amount: number, expense_date: Date) => {
    return await this.billModel.create({ title, amount, expense_date });
  };
  public getAllBills = async (page: number, pageSize: number, search: string, startDate: string, endDate: string) => {
    console.log(search, '>>>>>>>>>>>>>>>>>>>>>>>>>.');
    const limit = Number(pageSize);
    const skip = Number(pageSize) * Number(page - 1);
    const filters = {
      is_Active: true,
    };
    if (search) {
      filters['title'] =  search ;
    }
    console.log(filters);

    if (startDate && endDate) {
      filters['expense_date'] = { $gt: startDate, $lt: endDate };
    }
   
    const [data, count] = await Promise.all([this.billModel.find({ filters }).skip(skip).limit(limit), this.billModel.count({ filters })]);
    console.log(await this.billModel.find(filters));
    // const [data, count] = await Promise.all([
    //   this.billModel
    //     .find({ ...filters, is_Active: true })
    //     .skip(skip)
    //     .limit(limit),
    //   this.billModel.count({ filters }),
    // ]);
    // console.log(await this.billModel.find().lean(), 'data');
    return { data, count };
  };
  public deleteBill = async (id: number | string) => {
    return await this.billModel.updateOne({ _id: id }, { is_Active: false });
  };
  public editBill = async (id: number | string, body: {}) => {
    return await this.billModel.findByIdAndUpdate(id, body);
  };
  public getSingleBill = async (id: number | string) => {
    return await this.billModel.findById(id);
  };
}
