// src/database/index.ts
import { InferSchemaType, model } from "mongoose"; // mongooseと型推論のための関数、モデルをインポート
import { guildSchema } from "./schemas/guild.js"; // ギルドスキーマをインポート
import { memberSchema } from "./schemas/member.js"; // メンバースキーマをインポート



// データベースモデルをエクスポート
export const db = {
   guilds: model("guild", guildSchema, "guilds"), // ギルドモデルを作成
   members: model("member", memberSchema, "members") // メンバーモデルを作成
};

// スキーマ型を定義してエクスポート
export type GuildSchema = InferSchemaType<typeof guildSchema>; // ギルドスキーマの型
export type MemberSchema = InferSchemaType<typeof memberSchema>; // メンバースキーマの型
