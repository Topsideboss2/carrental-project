import { PaymentMethod } from '@prisma/client';
import { IsInt, IsString, IsNumber } from 'class-validator';

export class PaymentDto {
  @IsString()
  paymentMethod = "" as PaymentMethod

  @IsString()
  userId = "";

  @IsInt()
  invoiceId = 0;


  @IsNumber()
  amount = 0;

  @IsString()
  mpesaNumber = ""

}
