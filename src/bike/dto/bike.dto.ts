import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

class BaseBikeDto {
  @ApiProperty({
    description: 'Manufacturer of the bike',
    example: 'Royal Enfield',
  })
  @IsString()
  make: string;

  @ApiProperty({
    description: 'Model of the bike',
    example: 'Classic 350',
  })
  @IsString()
  model: string;

  @ApiProperty({
    description: 'Year of launch',
    example: 2021,
  })
  @IsInt()
  year: number;

  @ApiProperty({
    description: 'Type of the bike',
    example: 'cruiser',
  })
  @IsString()
  type: string;
}

class AddBikeDto extends BaseBikeDto {}

class ReplaceBikeDto extends BaseBikeDto {}

class PatchBikeDto {
  @ApiProperty({
    description: 'Manufacturer of the bike',
    example: 'Royal Enfield',
  })
  @IsOptional()
  @IsString()
  make?: string;

  @ApiProperty({
    description: 'Model of the bike',
    example: 'Classic 350',
  })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({
    description: 'Year of launch',
    example: 2021,
  })
  @IsOptional()
  @IsInt()
  year?: number;

  @ApiProperty({
    description: 'Type of the bike',
    example: 'cruiser',
  })
  @IsOptional()
  @IsString()
  type?: string;
}

export { AddBikeDto, ReplaceBikeDto, PatchBikeDto };
