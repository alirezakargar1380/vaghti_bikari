import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import {Cat, CatSchema} from "./schemas/cat.schema"
import {CatRepository} from "./cat.repository"
import { CatController } from "./cat.controller";

@Module({
    imports: [MongooseModule.forFeature([
        { name: Cat.name, schema: CatSchema }
    ])],
    providers: [CatRepository],
    controllers: [CatController]
})
export class CatModule{}