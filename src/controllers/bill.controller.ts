import { BillService } from '@/services/bill.service';
import { NextFunction } from 'express';
import { CreateBillOfUserRequestBody } from './typings/bill.controller';

export default class BillController {
  private billService = new BillService();

  //create a new bill
  public createBillOfUser = async (req: any, res: any, next: NextFunction) => {
    try {
      const user_id = req.userId;     
      const { title, amount, expense_date }: CreateBillOfUserRequestBody = req.body;
      const bill = await this.billService.createBillOfUserInService({ title, amount, expense_date,user_id});     
      res.sendformat({ message: ' bill sucessfully created' });
    } catch (error) {
      res.sendformat({ message: 'error' });
      next(error);
    }
  };

  //get all bills
  public getAllBillsOfUser = async (req: any, res: any, next: NextFunction) => {
    try {
      const { page = 1, pageSize = 5, search, startDate, endDate } = req.query;
      let userId = req.userId;
      const { data, count } = await this.billService.getBillOfUserInService({ page, pageSize, search, startDate, endDate ,userId});
      res.send({ allbills: data, count: count });
    } catch (error) {
    res.sendformat({ message: 'error in getting all  bills' });
      next(error);
    }
  };

  
  //delete a single bill
  public deleteBillOfUser = async (req: any, res: any, next: NextFunction) => {
    try {
      const id = req.params.id;    
      let data = await this.billService.deleteBill(id);     
      res.sendformat({ message: 'succesfully deleted ', data });
    } catch (error) {     
      next(error);
    }
  };

  //edit bill
  public editBillOfUser = async (req: any, res: any, next: NextFunction) => {
    try {
      const id = req.params.id;      
      const body = req.body;
      await this.billService.editBillOfUser(id, body);
      res.sendformat({ message: 'sucfully edited' });
    } catch (error) {
      next(error);
    }
  };


  //get single bill by id
  public getBillById = async (req: any, res: any, next: NextFunction) => {
    try {
      const id = req.params.id;      
      const bill = await this.billService.getBillByIdOfUser(id);     
      res.send({ bill });
      res.sendformat({ message: 'you are success in finding the data of that user' });
    } catch (err) {
      next(err);
    }
  };
}
