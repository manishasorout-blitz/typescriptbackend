import { z } from 'zod';

export const createBillOfUserBodyParser = z.object({
  title: z.string({
    required_error: 'title is required',
    invalid_type_error: 'title must be string',
  }),
  amount: z.string({
    required_error: 'amount is required',
    invalid_type_error: 'amount must be number',
  }),
  expense_date: z.string({
    required_error: 'date is required',
    invalid_type_error: 'date must be string',
  })
});
