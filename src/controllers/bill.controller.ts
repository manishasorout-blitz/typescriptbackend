import { BillService } from '@/services/bill.service';
import { NextFunction } from 'express';
import { CreateBillOfUserRequestBody } from './typings/bill.controller';

export default class BillController {
  private billService = new BillService();
  public createBillOfUser = async (req: any, res: any, next: NextFunction) => {
    try {
      const { title, amount, expense_date }: CreateBillOfUserRequestBody = req.body;
      const bill = await this.billService.createBillOfUserInService({ title, amount, expense_date });
      console.log(bill, 'created bill');
      res.sendformat({ message: ' bill sucessfully created' });
    } catch (error) {
      res.sendformat({ message: 'error' });
      next(error);
    }
  };
  public getAllBillsOfUser = async (req: any, res: any, next: NextFunction) => {
    try {
      const { page = 1, pageSize = 5, search, startDate, endDate } = req.query;

      const { data, count } = await this.billService.getBillOfUserInService({ page, pageSize, search, startDate, endDate });

      res.send({ allbills: data, count: count });
    } catch (error) {
      console.log(error, 'error');
      res.sendformat({ message: 'error in getting all  bills' });
      next(error);
    }
  };
  public deleteBillOfUser = async (req: any, res: any, next: NextFunction) => {
    try {
      const id = req.params.id;
      console.log(id, 'user id >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>to be deleted');
      let data = await this.billService.deleteBill(id);
      console.log(data);
      res.sendformat({ message: 'succesfully deleted ', data });
    } catch (error) {
      console.log(error, 'error in deleting a user');
      next(error);
    }
  };
  public editBillOfUser = async (req: any, res: any, next: NextFunction) => {
    try {
      const id = req.params.id;
      console.log(id, 'idddddddddddddddddddddddd');
      const body = req.body;
      await this.billService.editBillOfUser(id, body);
      res.sendformat({ message: 'sucfully edited' });
    } catch (error) {
      next(error);
    }
  };
  public getBillById = async (req: any, res: any, next: NextFunction) => {
    try {
      const id = req.params.id;
      console.log('id of single user', id);
      const bill = await this.billService.getBillByIdOfUser(id);
      console.log(bill, 'data of user');
      res.send({ bill });
      res.sendformat({ message: 'you are success in finding the data of that user' });
    } catch (err) {
      next(err);
    }
  };
}
