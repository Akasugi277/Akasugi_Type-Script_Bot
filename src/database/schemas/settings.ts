// src/database/schemas/settings.ts
import { Schema, model } from 'mongoose';

const settingsSchema = new Schema({
    guildId: { type: String, required: true, unique: true }, // サーバーID
    channelSettings: {
        type: Map,
        of: Boolean, // 各チャンネルの設定（ON/OFF）
    },
    globalSettings: {
        featureEnabled: { type: Boolean, default: true }, // サーバー全体の設定
    },
});

export const Settings = model('Settings', settingsSchema);
