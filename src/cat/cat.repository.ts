import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Cat, CatDocument } from "./schemas/cat.schema";

@Injectable()
export class CatRepository {
    constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) { }

    async findOne(catFilterQuery: FilterQuery<Cat>): Promise<Cat> {
        return await this.catModel.findOne(catFilterQuery)
    }

    async create(cat: Cat): Promise<Cat> {
        return await this.catModel.create(cat)
    }
}