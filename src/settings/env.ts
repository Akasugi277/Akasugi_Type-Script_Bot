// src/settings/env.ts
import { z } from "zod"; // Zodライブラリをインポート

// 環境変数のスキーマを定義
const envSchema = z.object({
    BOT_TOKEN: z.string({ description: "Discord Bot Token is required" }).min(1), // 必須のボットトークン
    WEBHOOK_LOGS_URL: z.string().url().optional(), // オプションのWebhookログURL
    MONGO_URI: z.string({ description: "MongoDb URI is required" }).min(1), // 必須のMongoDB URI
    // 環境変数の追加...
});

// スキーマから型を推論
type EnvSchema = z.infer<typeof envSchema>;

export { envSchema, type EnvSchema }; // スキーマと型をエクスポート
