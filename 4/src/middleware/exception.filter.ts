import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        if (exception.response) {
          response
            .status(exception.status)
            .json(exception.response);
        } else {
          response
            .status(500)
            .json({
              statusCode: 500,
              message: 'Internal server error',
            });
        }
      }
}