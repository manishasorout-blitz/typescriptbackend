import { Router } from 'express';

// Controller
import AuthController from '@/controllers/auth.controller';

// Middlerware
import ValidatorMiddleware from '@/middlewares/validator.middleware';

// typings validator
import * as authControllerValdators from '@/controllers/validators/auth.controller.validation';

//bill validator
import * as billControllerValidator from '@/controllers/validators/bill.controller.validation';

//bill controller
import BillController from '@/controllers/bill.controller';
import AuthMiddleware from '@/middlewares/Auth.middleware';

class ExternalRoute {
  public path = '/api/v1/platform';
  public router = Router();
  private validatorMiddleware = new ValidatorMiddleware();
  private authmiddleware =new AuthMiddleware();
  private authController = new AuthController();
  private billController = new BillController();

  constructor() {
    this.initailzeAuthRoutesForSignUp(`${this.path}/auth`);
    this.initailzeAuthRoutesForLogin(`${this.path}/auth`);
    this.initailzeBillRoutesForCreateBill(`${this.path}/bill`);
    this.initailzeBillRoutesForGetAllBills(`${this.path}/bill`);
    this.initailzeBillRoutesForDelete(`${this.path}/bill`);
    this.initailzeBillRoutesForEdit(`${this.path}/bill`);
    this.initailzeBillRoutesForGettingSingleBill(`${this.path}/bill`);
  }
//user signup
  private initailzeAuthRoutesForSignUp(prefix: string) {
    this.router.post(
      `${prefix}/signup`,
      this.validatorMiddleware.validateRequestBody(authControllerValdators.createUserOnSignUpRequestBodyParser),
      this.authController.createUserOnSignup,
    );
  }

  //user login
  private initailzeAuthRoutesForLogin(prefix: string) {
    this.router.post(
      `${prefix}/login`,
      this.validatorMiddleware.validateRequestBody(authControllerValdators.loginUserRequestBodyParse),
      this.authController.loginUser,
    );
  }

  //create a new bill
  private initailzeBillRoutesForCreateBill(prefix: string) {
    this.router.post(
      `${prefix}/createbills`,
     this.authmiddleware.authmiddleware2,
      this.validatorMiddleware.validateRequestBody(billControllerValidator.createBillOfUserBodyParser),
      this.billController.createBillOfUser,
    );
  }
  //getallbills
  private initailzeBillRoutesForGetAllBills(prefix: string) {
    this.router.get(`${prefix}/allbills`, this.authmiddleware.authmiddleware2, this.billController.getAllBillsOfUser);
  }

  //delete single bill
  private initailzeBillRoutesForDelete(prefix: string) {
    this.router.delete(`${prefix}/deletebill/:id`, this.billController.deleteBillOfUser);
  }

  //edit bill
  private initailzeBillRoutesForEdit(prefix: string) {
    this.router.put(`${prefix}/editbill/:id`, this.billController.editBillOfUser);
  }

  //get single bill by id
  private initailzeBillRoutesForGettingSingleBill(prefix: string) {
    this.router.get(`${prefix}/billbyid/:id`, this.billController.getBillById);
  }
}

export default ExternalRoute;
