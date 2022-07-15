import { Controller, Get } from "@nestjs/common";
import { CatRepository } from "./cat.repository";

@Controller('cats')
export class CatController {
    constructor(private readonly catRepository: CatRepository) {}
    
    @Get()
    async getCats() {
        return await this.catRepository.findOne({
            name: "billy"
        })
    }
}