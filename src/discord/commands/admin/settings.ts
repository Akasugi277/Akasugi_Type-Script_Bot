// src/discord/commands/admin/settings.ts
import { Command } from "#base"; 
import { Settings } from '../../../database/schemas/settings.js'; 
import { ApplicationCommandType, EmbedBuilder } from "discord.js"; 

new Command({
    name: "settings", 
    description: "BOTの動作設定を管理します。",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "toggle", 
            description: "ONまたはOFFに設定します。",
            type: 3, 
            required: true,
            choices: [
                { name: "ON", value: "ON" },
                { name: "OFF", value: "OFF" },
            ],
        },
        {
            name: "target", 
            description: "設定対象を選択します。",
            type: 3, 
            required: true,
            choices: [
                { name: "サーバー", value: "global" },
                { name: "カテゴリ", value: "category" },
                { name: "チャンネル", value: "channel" },
            ],
        },
        {
            name: "category", 
            description: "設定を変更するカテゴリを選択します。",
            type: 7, 
            required: false,
        },
        {
            name: "channel", 
            description: "設定を変更するチャンネルを選択します。",
            type: 7, 
            required: false,
        },
    ],
    async run(interaction) {
        const toggle = interaction.options.getString("toggle");
        const target = interaction.options.getString("target");
        const category = interaction.options.getChannel("category");
        const channel = interaction.options.getChannel("channel") || interaction.channel; 

        // 設定の取得または作成
        let settings = await Settings.findOne({ guildId: interaction.guildId });
        if (!settings) {
            settings = new Settings({ guildId: interaction.guildId });
        }

        // categorySettings と channelSettings を Map で初期化
        if (!settings.categorySettings) {
            settings.categorySettings = new Map();
        }
        if (!settings.channelSettings) {
            settings.channelSettings = new Map();
        }

        // 対象に応じた設定を更新
        if (target === "global") {
            settings.globalSettings.featureEnabled = toggle === "ON";
            await settings.save();

            const embed = new EmbedBuilder()
                .setColor(0x001F3F) 
                .setTitle("設定変更")
                .setDescription(`サーバー全体の設定を ${toggle} にしました。`);

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else if (target === "category" && category) {
            settings.categorySettings.set(category.id, toggle === "ON");
            await settings.save();

            const embed = new EmbedBuilder()
                .setColor(0x001F3F) 
                .setTitle("設定変更")
                .setDescription(`カテゴリ <#${category.id}> の設定を ${toggle} にしました。`);

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else if (target === "channel" && channel) {
            settings.channelSettings.set(channel.id, toggle === "ON");
            await settings.save();

            const embed = new EmbedBuilder()
                .setColor(0x001F3F) 
                .setTitle("設定変更")
                .setDescription(`チャンネル <#${channel.id}> の設定を ${toggle} にしました。`);

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            await interaction.reply({ content: "無効なオプションが選択されました。", ephemeral: true });
        }
    }
});
