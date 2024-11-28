// src/discord/commands/admin/settings.ts
import { Command } from "#base"; // コマンドをインポート
import { Settings } from '../../../database/schemas/settings'; // 設定モデルをインポート
import { ApplicationCommandType } from "discord.js"; // Discord.jsから必要な型をインポート

new Command({
    name: "settings", // コマンド名
    description: "BOTの動作設定を管理します。",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "toggle", // ON/OFFを切り替えるオプション
            description: "ONまたはOFFに設定します。",
            type: 3, // STRING型
            required: true,
        },
        {
            name: "channel", // 特定チャンネル設定のオプション
            description: "特定のチャンネルで設定を変更します。",
            type: 7, // CHANNEL型
            required: false,
        },
    ],
    async run(interaction) {
        const toggle = interaction.options.getString("toggle");
        const channel = interaction.options.getChannel("channel") || interaction.channel; // チャンネルを取得

        // 設定の取得または作成
        let settings = await Settings.findOne({ guildId: interaction.guildId });
        if (!settings) {
            settings = new Settings({ guildId: interaction.guildId });
        }

        // ON/OFFの設定
        if (channel) {
            settings.channelSettings.set(channel.id, toggle === "ON");
            await settings.save();
            await interaction.reply(`チャンネル <#${channel.id}> の設定を ${toggle} にしました。`);
        } else {
            settings.globalSettings.featureEnabled = toggle === "ON";
            await settings.save();
            await interaction.reply(`サーバー全体の設定を ${toggle} にしました。`);
        }
    }
});
