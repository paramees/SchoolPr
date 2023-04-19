import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import internal from 'stream';

@Injectable()
export class ImagesService {
  constructor(private readonly configService: ConfigService) {}

  private s3 = new S3({
    accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
  });

  async addImages(entity: string, files: Express.Multer.File[]): Promise<string[]> {
    const names: string[] = []
    for (const file of files) {
      const name = entity + Date.now() + "." + file.originalname.split('.').pop();
      const imgResult = await this.s3.putObject({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: name,
        Body: file.buffer
      }).promise()
      if (imgResult) {
        names.push(name);
      } else {
        throw new Error("File was not added");
      }
    }
    return names
  }

  getImage(name: string): internal.Readable {
    const file = this.s3.getObject({Bucket: this.configService.get('AWS_BUCKET_NAME'), Key: name}).createReadStream()
    return file
  }

  async deleteImage(name: string): Promise<boolean> {
    const file = await this.s3.deleteObject({Bucket: this.configService.get('AWS_BUCKET_NAME'), Key: name}).promise()
    const result = file ? true : false
    return result
  }
}
