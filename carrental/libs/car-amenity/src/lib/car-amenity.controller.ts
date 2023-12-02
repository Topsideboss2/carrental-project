import { Controller } from '@nestjs/common';
import { CarAmenityService } from './car-amenity.service';

@Controller('car-amenity')
export class CarAmenityController {
  constructor(private carAmenityService: CarAmenityService) {}
}
