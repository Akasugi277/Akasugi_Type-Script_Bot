// src/database/schemas/guild.ts
import { Schema } from "mongoose"; // MongooseのSchemaをインポート
import { t } from "../utils.js"; // utilsから型定義をインポート

// ギルドスキーマを定義
export const guildSchema = new Schema(
    {
        id: t.string, // ギルドのID（必須の文字列）
        channels: {
            logs: t.channelInfo, // ログチャンネル情報
            general: t.channelInfo, // 一般チャンネル情報
        }
    },
    {
        // スタティックメソッドを定義
        statics: {
            async get(id: string) {
                // ギルドIDで検索し、存在しない場合は新たに作成
                return await this.findOne({ id }) ?? this.create({ id });
            }
        }
    }
);
