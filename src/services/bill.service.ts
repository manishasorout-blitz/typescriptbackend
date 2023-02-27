import moment from 'moment';
import BillDao from '@/dao/bill.dao';

export class BillService {
  private billDao = new BillDao();
  public createBillOfUserInService = async ({ title, amount, expense_date,user_id }: { title: string; amount: number; expense_date: string ,user_id:string}) => {
    const bill = await this.billDao.createBill(title, amount, moment(expense_date).toDate(),user_id);
    return bill;
  };
  public getBillOfUserInService = async ({
    page,
    pageSize,
    search,
    startDate,
    endDate,
    userId
  }: {
    page: number;
    pageSize: number;
    search: string;
    startDate: string;
    endDate: string;
    userId:string
  }) => {
    const { data, count } = await this.billDao.getAllBills(page, pageSize, search, startDate, endDate,userId);
    console.log(search, 'inside services folder');
    return { data, count };
  };
  public deleteBill = async (id: number | string) => {
    const delteduser = await this.billDao.deleteBill(id);
    console.log(delteduser, 'inside the bill services');
    return delteduser;
  };
  public editBillOfUser = async (id: number | string, body: {}) => {
    return await this.billDao.editBill(id, body);
  };
  public getBillByIdOfUser = async (id: number | string) => {
    const bill = await this.billDao.getSingleBill(id);
    return bill;
  };
}
