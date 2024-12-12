// src/discord/commands/admin/settings.ts
import { Command } from "#base"; // コマンドをインポート
import { Settings } from '../../../database/schemas/settings.js'; // 設定モデルをインポート
import { ApplicationCommandType, EmbedBuilder } from "discord.js"; // EmbedBuilderをインポート

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
            choices: [
                { name: "ON", value: "ON" },
                { name: "OFF", value: "OFF" },
            ],
        },
        {
            name: "target", // 対象の設定オプション
            description: "設定対象を選択します。",
            type: 3, // STRING型
            required: true,
            choices: [
                { name: "サーバー", value: "global" },
                { name: "カテゴリ", value: "category" },
                { name: "チャンネル", value: "channel" },
            ],
        },
        {
            name: "category", // 特定カテゴリ設定のオプション
            description: "設定を変更するカテゴリを選択します。",
            type: 7, // CHANNEL型 (カテゴリを指定)
            required: false,
        },
        {
            name: "channel", // 特定チャンネル設定のオプション
            description: "設定を変更するチャンネルを選択します。",
            type: 7, // CHANNEL型
            required: false,
        },
    ],
    async run(interaction) {
        const toggle = interaction.options.getString("toggle");
        const target = interaction.options.getString("target");
        const category = interaction.options.getChannel("category");
        const channel = interaction.options.getChannel("channel") || interaction.channel; // チャンネルを取得

        // 設定の取得または作成
        let settings = await Settings.findOne({ guildId: interaction.guildId });
        if (!settings) {
            settings = new Settings({ guildId: interaction.guildId });
        }

        // 対象に応じた設定を更新
        if (target === "global") {
            settings.globalSettings.featureEnabled = toggle === "ON";
            await settings.save();

            const embed = new EmbedBuilder()
                .setColor(0x001F3F) // 濃紺の色を設定
                .setTitle("設定変更")
                .setDescription(`サーバー全体の設定を ${toggle} にしました。`);

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else if (target === "category" && category) {
            settings.categorySettings.set(category.id, toggle === "ON");
            await settings.save();

            const embed = new EmbedBuilder()
                .setColor(0x001F3F) // 濃紺の色を設定
                .setTitle("設定変更")
                .setDescription(`カテゴリ <#${category.id}> の設定を ${toggle} にしました。`);

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else if (target === "channel" && channel) {
            settings.channelSettings.set(channel.id, toggle === "ON");
            await settings.save();

            const embed = new EmbedBuilder()
                .setColor(0x001F3F) // 濃紺の色を設定
                .setTitle("設定変更")
                .setDescription(`チャンネル <#${channel.id}> の設定を ${toggle} にしました。`);

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            await interaction.reply({ content: "無効なオプションが選択されました。", ephemeral: true });
        }
    }
});
