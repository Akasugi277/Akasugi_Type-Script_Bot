// src/discord/commands/public/ping.ts
import { Command } from "#base"; // コマンドをインポート
import { createRow } from "@magicyan/discord"; // ボタン行を作成するための関数をインポート
import { ApplicationCommandType, ButtonBuilder, ButtonStyle } from "discord.js"; // Discord.jsから必要な型とクラスをインポート

// "ping" コマンドを定義
new Command({
	name: "ping", // コマンド名
	description: "🏓｜応答として pong を返します。（動作テスト用）", // コマンドの説明
	type: ApplicationCommandType.ChatInput, // コマンドタイプ
	run(interaction){
		const row = createRow(
			// リマインダーボタンを作成
			new ButtonBuilder({ 
				customId: `remind/${new Date().toISOString()}`, // リマインダーのカスタムID
				label: "Ping", // ボタンのラベル
				style: ButtonStyle.Success // ボタンのスタイル
			})
		);
		interaction.reply({ ephemeral, content: "pong", components: [row] }); // "pong"とボタンを返信
	}
});
