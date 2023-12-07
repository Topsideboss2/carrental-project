import { Controller, Get, Param } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get('/dashboard')
  async dashboardReport() {
    return await this.reportService.dashboardReport();
  }

  @Get('/user/:user')
  async userReport(@Param('user') user: string) {
    return await this.reportService.userReport(user);
  }
}
