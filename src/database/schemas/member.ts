// src/database/schemas/member.ts
import { Schema } from "mongoose"; // MongooseのSchemaをインポート
import { t } from "../utils.js"; // utilsから型定義をインポート

// メンバースキーマを定義
export const memberSchema = new Schema(
    {
        id: t.string, // メンバーのID（必須の文字列）
        guildId: t.string, // 所属ギルドのID（必須の文字列）
        wallet: {
            coins: { type: Number, default: 0 }, // ウォレット内のコイン数（デフォルトは0）
        }
    },
    {
        // スタティックメソッドを定義
        statics: {
            async get(member: { id: string, guild: { id: string } }) {
                // メンバーIDとギルドIDで検索し、存在しない場合は新たに作成
                const query = { id: member.id, guildId: member.guild.id };
                return await this.findOne(query) ?? this.create(query);
            }
        }
    },
);
