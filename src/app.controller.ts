import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get(['', 'ping'])
  healthCheck(): any {
    console.log('healthCheck');
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }
}