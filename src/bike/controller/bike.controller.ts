import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { BikeRepository } from '../repository/bike.repository';
import Bike from '../entities/bike.entity';
import { AddBikeDto, PatchBikeDto, ReplaceBikeDto } from '../dto/bike.dto';
import { ClassValidationPipe } from 'src/pipes/class-validation.pipe';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('bikes')
@Controller('bikes')
export class BikeController {
  constructor(private bikeRepository: BikeRepository) {}

  @ApiOperation({ summary: 'Get all Bikes' })
  @ApiResponse({
    status: 200,
    description: 'All Bikes.',
    type: [Bike],
  })
  @Get()
  getBikes(): Promise<Array<Bike>> {
    return this.bikeRepository.findAll();
  }

  @ApiOperation({ summary: 'Create Bike' })
  @ApiResponse({
    status: 200,
    description: 'No Response',
  })
  @Post()
  addBike(@Body(ClassValidationPipe) body: AddBikeDto): any {
    return this.bikeRepository.create(body);
  }

  @ApiOperation({ summary: 'Replace Bike' })
  @ApiResponse({
    status: 200,
    description: 'No Response',
  })
  @Put(':id')
  async replaceBike(
    @Param('id', ParseIntPipe) id: number,
    @Body(ClassValidationPipe) body: ReplaceBikeDto,
  ): Promise<any> {
    return await this.bikeRepository.update({ id, ...body });
  }

  @ApiOperation({ summary: 'Update Bike' })
  @ApiResponse({
    status: 200,
    description: 'No Response',
  })
  @Patch(':id')
  async patchBike(
    @Param('id', ParseIntPipe) id: number,
    @Body(ClassValidationPipe) body: PatchBikeDto,
  ): Promise<any> {
    return await this.bikeRepository.update({ id, ...body });
  }

  @ApiOperation({ summary: 'Delete Bike' })
  @ApiResponse({
    status: 200,
    description: 'No Response',
  })
  @Delete(':id')
  deleteBike(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.bikeRepository.delete({ id });
  }
}
