import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { MpesaService } from './mpesa.service';
import { ISTKPUSH, IPAYMENTVALIDATION } from './types';

@Controller('mpesa')
export class MpesaController {
  constructor(private mpesaService: MpesaService) {}

  @Post('/stkpush')
  public async stkPush(@Body() data: ISTKPUSH, @Res() res: Response) {
    const res_ = await this.mpesaService.stkPush(data);
    return res.status(200).json(res_);
  }

  @Post('/callback/url')
  //create a function to handle the callback url with the response from safaricom
  public async callbackUrl(@Body() body: any) {
    return this.mpesaService.mpesaCallback(body);
  }

  @Post('/payment/validation')
  public async paymentValidation(@Body() data: IPAYMENTVALIDATION): Promise<boolean> {
    return this.mpesaService.paymentValidation(data);
  }

}
