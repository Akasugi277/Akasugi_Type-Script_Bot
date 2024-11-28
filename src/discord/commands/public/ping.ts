// src/discord/commands/public/ping.ts
import { Command } from "#base"; // コマンドをインポート
import { createRow } from "@magicyan/discord"; // ボタン行を作成するための関数をインポート
import { ApplicationCommandType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js"; // Discord.jsから必要な型とクラスをインポート

// "ping" コマンドを定義
new Command({
    name: "ping", // コマンド名
    description: "🏓｜応答として pong を返します。（動作テスト用）", // コマンドの説明
    type: ApplicationCommandType.ChatInput, // コマンドタイプ
    run(interaction) {
        const row = createRow(
            // リマインダーボタンを作成
            new ButtonBuilder({ 
                customId: `remind/${new Date().toISOString()}`, // リマインダーのカスタムID
                label: "Ping", // ボタンのラベル
                style: ButtonStyle.Success // ボタンのスタイル
            })
        );

        // 埋め込みメッセージを作成
        const embed = new EmbedBuilder()
            .setColor(0x001F3F) // 濃紺の色を設定
            .setDescription("🏓pong!"); // 埋め込みの内容を設定

        // 自分だけに表示されるリプライを送信
        interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }
});
