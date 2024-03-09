import { ApiProperty } from "@nestjs/swagger";


export class PaginatedMetaDto {
   
    @ApiProperty()
    count: number
}