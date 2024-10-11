import { Module } from '@nestjs/common';
import { BikeRepository } from './repository/bike.repository';
import { BikeController } from './controller/bike.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [BikeRepository],
  controllers: [BikeController],
})
export class BikeModule {}
