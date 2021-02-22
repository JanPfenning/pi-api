import { Controller, Get, Param } from '@nestjs/common';
import { DbService } from '../db/db.service';

@Controller('sensor')
export class SensorController {
  dbService: DbService;

  constructor(dbService: DbService) {
    this.dbService = dbService;
  }

  // TODO check if mqtt listeing script is writing data into the db

  @Get(':table/:from/:to')
  dataFromTo(@Param() params): string {
    return this.dbService.getDataBetween(params.table, params.from, params.to);
  }
}
