import { ApiProperty } from '@nestjs/swagger';

class Bike {
  @ApiProperty({
    description: 'Unique Identifier of Bike',
    example: '3022',
  })
  id: number;

  @ApiProperty({
    description: 'Manufacturer of the bike',
    example: 'Royal Enfield',
  })
  make: string;

  @ApiProperty({
    description: 'Model of the bike',
    example: 'Classic 350',
  })
  model: string;

  @ApiProperty({
    description: 'Year of launch',
    example: 2021,
  })
  year: number;

  @ApiProperty({
    description: 'Type of the bike',
    example: 'cruiser',
  })
  type: string;
}

export default Bike;
