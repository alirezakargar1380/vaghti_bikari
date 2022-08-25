import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type BattleDocument = Battle & Document

@Schema()
export class Battle {
    @Prop({ default: 1 })
    battle: number
}

export const BattleSchema = SchemaFactory.createForClass(Battle)