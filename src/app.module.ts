import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BikeModule } from './bike/bike.module';

@Module({
  imports: [BikeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
