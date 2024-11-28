// src/database/utils.ts
import { Schema } from "mongoose"; // MongooseのSchemaをインポート

// 基本的な型定義をオブジェクトとして作成
export const p = {
   string: { type: String, required: true }, // 文字列型
   number: { type: Number, required: true }, // 数値型
   boolean: { type: Boolean, required: true }, // 真偽値型
   date: { type: Date, required: true }, // 日付型
};

// 基本型に新しいスキーマを追加
export const t = Object.assign(p, {
   channelInfo: new Schema({ id: p.string, url: p.string }, { _id: false }), // チャンネル情報のスキーマ
   roleInfo: new Schema({ id: p.string }, { _id: false }), // ロール情報のスキーマ
});
