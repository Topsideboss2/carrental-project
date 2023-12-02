import { Injectable, Logger } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { existsSync, readdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class MulterService implements MulterOptionsFactory {
  private logger = new Logger(MulterService.name);

  createMulterOptions(): MulterModuleOptions {
    this.logger.log('Creating Multer options...');

    const filename = (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = extname(file.originalname);
      callback(null, `${uniqueSuffix}${extension}`);
    };

    const dest = './uploads';

    if (!existsSync(dest)) {
      console.warn('Directory does not exist', dest);
    } else {
      const files = readdirSync(dest);
      console.log('Directory contents:', files);
    }

    const options: MulterModuleOptions = {
      storage: diskStorage({
        destination: dest,
        filename,
      }),
    };

    console.log('Multer options created', options);

    return options;
  }
}
