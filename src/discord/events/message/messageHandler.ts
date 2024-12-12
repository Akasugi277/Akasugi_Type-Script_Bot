// src/discord/events/message/messageHandler.ts
import { EmbedBuilder } from "discord.js"; // EmbedBuilderをインポート
import { Settings } from '../../../database/schemas/settings.js';

export const messageHandler = async (message) => {
    // BOTが自分自身のメッセージに反応しないようにする
    if (message.author.bot) return;

    // サーバー設定を取得
    const settings = await Settings.findOne({ guildId: message.guild.id });

    // サーバー全体の設定がOFFの場合は何もしない
    if (settings && !settings.globalSettings.featureEnabled) {
        // 管理者のコマンドかどうかを確認
        const isAdminCommand = message.member.permissions.has("ADMINISTRATOR");

        // 管理者が実行するコマンドの場合は処理を続行
        if (!isAdminCommand) {
            return; // それ以外の場合は何もしない
        }
    }

    // チャンネルの設定を確認
    const channelSetting = settings?.channelSettings.get(message.channel.id);
    const categorySetting = settings?.categorySettings.get(message.channel.parentId); // カテゴリの設定を取得

    // チャンネルの設定がOFFの場合は何もしない（サーバー全体がONの場合は処理を続行）
    if (channelSetting === false) return; // チャンネルの設定がOFF

    // カテゴリの設定がOFFの場合も何もしない（サーバー全体がONの場合は処理を続行）
    if (categorySetting === false) return; // カテゴリの設定がOFF

    // ここにメッセージに対する処理を書く
    // 例：特定のキーワードに反応する場合
    if (message.content.includes("こんにちは")) {
        const embed = new EmbedBuilder()
            .setColor(0x001F3F) // 濃紺の色を設定
            .setTitle("挨拶")
            .setDescription("こんにちは！");

        await message.channel.send({ embeds: [embed] });
    }

    // 例：スパム検知などの処理を追加することも可能
};
