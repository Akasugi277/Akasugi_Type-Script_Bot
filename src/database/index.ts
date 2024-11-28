// src/database/index.ts
import mongoose, { InferSchemaType, model } from "mongoose"; // mongooseと型推論のための関数、モデルをインポート
import { guildSchema } from "./schemas/guild.js"; // ギルドスキーマをインポート
import { memberSchema } from "./schemas/member.js"; // メンバースキーマをインポート
import { log } from "#settings"; // 設定からログ機能をインポート
import chalk from "chalk"; // コンソールの色付け用ライブラリをインポート

try {
   // MongoDBに接続
   await mongoose.connect(process.env.MONGO_URI, { dbName: "database" });
   log.success(chalk.green("MongoDB connected")); // 接続成功メッセージをログに出力
} catch(err){
   log.error(err); // エラーログ出力
   process.exit(1); // エラーが発生した場合、プロセスを終了
}

// データベースモデルをエクスポート
export const db = {
   guilds: model("guild", guildSchema, "guilds"), // ギルドモデルを作成
   members: model("member", memberSchema, "members") // メンバーモデルを作成
};

// スキーマ型を定義してエクスポート
export type GuildSchema = InferSchemaType<typeof guildSchema>; // ギルドスキーマの型
export type MemberSchema = InferSchemaType<typeof memberSchema>; // メンバースキーマの型
