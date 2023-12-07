import { IsInt, IsString, IsNumber } from 'class-validator';

export class InvoiceDto {
  @IsString()
  userId = "";

  @IsInt()
  reservationId = 0;

  @IsNumber()
  amount = 0;

}
