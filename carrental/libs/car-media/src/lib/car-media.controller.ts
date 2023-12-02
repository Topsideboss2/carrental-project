import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CarMediaService } from './car-media.service';
import { CarMediaValidationPipe } from '../pipes/car-media.pipe';
import { CarMediaDto } from '../dto/car-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '@carrental/cloudinary';

@Controller('car-medias')
export class CarMediaController {
  constructor(
    private carMediaService: CarMediaService,
    private cloudinaryService: CloudinaryService
  ) {}

  @Get('all')
  async getCarMedias() {
    return await this.carMediaService.findAll();
  }

  @Get('car/:id')
  async getSingleCarMedia(@Param ('id', ParseIntPipe) id: number) {
    return await this.carMediaService.findSingleCarMedia(id);
  }

  @Get('show/:id')
  async getCarMedia(@Param('id', ParseIntPipe) id: number) {
    return await this.carMediaService.findOne(id);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('media'))
  async createCarMedia(@Body() data: CarMediaDto, @UploadedFile() file: any) {
    try {
      const result = await this.cloudinaryService.uploadFile(file);
      // update the url to save this
      const carMedia = {
        mediaUrl: result.secure_url,
        carId: Number(data.carId),
        mediaType: data.mediaType
      }
      return await this.carMediaService.create(carMedia);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Put('update/:id')
  @UseInterceptors(FileInterceptor('media'))
  async updateCarMedia(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CarMediaDto,
    @UploadedFile() file: any
  ) {
    try {
      const result = await this.cloudinaryService.uploadFile(file);
      // update the url to save this
      const carMedia = {
        mediaUrl: result.secure_url,
        carId: data.carId,
        mediaType: data.mediaType
      }
      return await this.carMediaService.update(id, carMedia);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Delete('delete/:id')
  async deleteCarMedia(@Param('id', ParseIntPipe) id: number) {
    return this.carMediaService.delete(id);
  }
}
