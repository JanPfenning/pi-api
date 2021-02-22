import { Controller, Get, Param } from '@nestjs/common';
import { DbService } from '../db/db.service';

@Controller('sensor')
export class SensorController {
  dbService: DbService;

  constructor(dbService: DbService) {
    this.dbService = dbService;
  }

  @Get(':sensor/:from/:to')
  dataFromTo(@Param() params): string {
    return this.dbService.getDataBetween(params.sensor, params.from, params.to);
  }
}
