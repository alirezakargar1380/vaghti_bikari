import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BattleDocument } from "./schemas/battle.schema";

@Injectable()
export class BattleRepository {
    constructor(
        @InjectModel("battles") private battlesModel: Model<BattleDocument>
    ) {}

    async create() {
        return await this.battlesModel.create({})
    }
}