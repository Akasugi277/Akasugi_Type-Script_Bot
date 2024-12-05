// src/discord/commands/admin/logChannel.ts
import { Command } from "#base"; // コマンドをインポート
import { Settings } from '../../../database/schemas/settings.js'; // 設定モデルをインポート
import { ApplicationCommandType, EmbedBuilder } from "discord.js"; // EmbedBuilderをインポート

new Command({
    name: "logchannel", // コマンド名
    description: "ログチャンネルを設定します。",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "channel", // チャンネル指定オプション
            description: "ログチャンネルに設定するチャンネルを選択します。",
            type: 7, // CHANNEL型
            required: true,
        },
    ],
    async run(interaction) {
        const channel = interaction.options.getChannel("channel");

        // 設定の取得または作成
        let settings = await Settings.findOne({ guildId: interaction.guildId });
        if (!settings) {
            settings = new Settings({ guildId: interaction.guildId });
        }

        // ログチャンネルを設定
        settings.logChannelId = channel.id; // 新しく追加するフィールド
        await settings.save();

        const embed = new EmbedBuilder()
            .setColor(0x001F3F)
            .setTitle("ログチャンネル設定")
            .setDescription(`ログチャンネルを <#${channel.id}> に設定しました。`);

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
});
