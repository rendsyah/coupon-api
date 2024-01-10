import { Controller, Get } from '@nestjs/common';
import { ApiGetServiceDocs } from '@commons/config/swagger/api-swagger.docs';
import { ParseService } from './parse.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Parse')
@Controller('parse')
export class ParseController {
    constructor(private readonly parseService: ParseService) {}

    @Get('/csv')
    @ApiGetServiceDocs('parse to csv')
    async parseToCsv() {
        return await this.parseService.parseCsv();
    }
}
