// src/discord/events/message/messageHandler.ts
import { Events, EmbedBuilder } from "discord.js"; // EmbedBuilderをインポート
import { Settings } from '../../../database/schemas/settings';

export const messageHandler = async (message) => {
    // BOTが自分自身のメッセージに反応しないようにする
    if (message.author.bot) return;

    // サーバー設定を取得
    const settings = await Settings.findOne({ guildId: message.guild.id });

    // サーバー全体の設定がOFFの場合は何もしない
    if (settings && !settings.globalSettings.featureEnabled) return;

    // チャンネルの設定を確認
    const channelSetting = settings?.channelSettings.get(message.channel.id);
    if (channelSetting === false) return; // チャンネルの設定がOFFの場合は何もしない

    // ここにメッセージに対する処理を書く
    // 例：特定のキーワードに反応する場合
    if (message.content.includes("こんにちは")) {
        const embed = new EmbedBuilder()
            .setColor(0x001F3F) // 濃紺の色を設定
            .setTitle("挨拶")
            .setDescription("こんにちは！BOTに何かお手伝いできることはありますか？");

        await message.channel.send({ embeds: [embed] });
    }

    // 例：スパム検知などの処理を追加することも可能
};
