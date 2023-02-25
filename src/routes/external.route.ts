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

class ExternalRoute {
  public path = '/api/v1/platform';
  public router = Router();
  private validatorMiddleware = new ValidatorMiddleware();
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

  private initailzeAuthRoutesForSignUp(prefix: string) {
    this.router.post(
      `${prefix}/signup`,
      this.validatorMiddleware.validateRequestBody(authControllerValdators.createUserOnSignUpRequestBodyParser),
      this.authController.createUserOnSignup,
    );
  }
  private initailzeAuthRoutesForLogin(prefix: string) {
    this.router.post(
      `${prefix}/login`,
      this.validatorMiddleware.validateRequestBody(authControllerValdators.loginUserRequestBodyParse),
      this.authController.loginUser,
    );
  }
  private initailzeBillRoutesForCreateBill(prefix: string) {
    this.router.post(
      `${prefix}/createbills`,
      this.validatorMiddleware.validateRequestBody(billControllerValidator.createBillOfUserBodyParser),
      this.billController.createBillOfUser,
    );
  }
  //getallbills
  private initailzeBillRoutesForGetAllBills(prefix: string) {
    this.router.get(`${prefix}/allbills`, this.billController.getAllBillsOfUser);
  }

  //delete single bill
  private initailzeBillRoutesForDelete(prefix: string) {
    this.router.delete(`${prefix}/deletebill/:id`, this.billController.deleteBillOfUser);
  }
  private initailzeBillRoutesForEdit(prefix: string) {
    this.router.put(`${prefix}/editbill/:id`, this.billController.editBillOfUser);
  }
  private initailzeBillRoutesForGettingSingleBill(prefix: string) {
    this.router.get(`${prefix}/billbyid/:id`, this.billController.getBillById);
  }
}

export default ExternalRoute;
