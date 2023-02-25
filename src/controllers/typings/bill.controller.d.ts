import * as billControllerValidators from '../validators/bill.controller.validation';
import { z } from 'zod';
export type CreateBillOfUserRequestBody = z.infer<typeof billControllerValidators.createBillOfUserBodyParser>;
