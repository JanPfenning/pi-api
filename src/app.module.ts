import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicController } from './public/public.controller';
import { SensorController } from './sensor/sensor.controller';
import { MqttController } from './mqtt/mqtt.controller';
import { MqttService } from './mqtt/mqtt.service';
import { DbService } from './db/db.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    PublicController,
    SensorController,
    MqttController,
  ],
  providers: [AppService, MqttService, DbService],
})
export class AppModule {}
