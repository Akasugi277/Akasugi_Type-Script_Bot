// src/discord/commands/public/help.ts
import { Command, Responder, ResponderType } from "#base"; // コマンドとレスポンダーをインポート
import { createEmbed, createEmbedAuthor, createRow } from "@magicyan/discord"; // 埋め込みメッセージとボタン行を作成するための関数をインポート
import { ApplicationCommandType, ButtonBuilder, ButtonStyle, InteractionReplyOptions, User } from "discord.js"; // Discord.jsから必要な型とクラスをインポート

// コマンド説明のサンプルデータ
const commandDescriptions = [
    "コマンド1の説明",
    "コマンド2の説明",
    "コマンド3の説明",
    "コマンド4の説明",
    "コマンド5の説明",
    "コマンド6の説明",
    "コマンド7の説明",
    "コマンド8の説明",
    "コマンド9の説明",
    "コマンド10の説明",
];

const totalPages = Math.ceil(commandDescriptions.length / 1); // 1ページに1つの説明を表示
let currentPage = 0; // 現在のページ番号

// "help" コマンドを定義
new Command({
    name: "help", // コマンド名
    description: "📖｜BOTとコマンドの説明を表示します。", // コマンドの説明
    type: ApplicationCommandType.ChatInput, // コマンドタイプ
    run(interaction) {
        currentPage = 0; // ページをリセット
        interaction.reply(helpMenu(interaction.user, currentPage)); // ヘルプメニューを表示
    }
});

// ボタンレスポンダーを定義
new Responder({
    customId: "help/:page", // カスタムID
    type: ResponderType.Button, // ボタンタイプのレスポンダー
    parse: params => ({ page: Number(params.page) }), // ページ番号をパース
    run(interaction, { page }) {
        currentPage = page; // 現在のページを更新
        interaction.update(helpMenu(interaction.user, currentPage)); // ヘルプメニューを更新
    },
});

// ヘルプメニューを作成する関数
function helpMenu(user: User, current: number) {
    const embed = createEmbed({
        color: 0x001F3F, // 濃紺の色を設定
        author: createEmbedAuthor(user), // ユーザー情報を埋め込みに追加
        description: commandDescriptions[current] || "説明はありません。", // 現在のページの説明を表示
    });

    const components = createRow(
        new ButtonBuilder({
            customId: `help/${Math.max(0, current - 1)}`, // 戻るボタン
            label: "戻る",
            style: ButtonStyle.Primary,
            disabled: current === 0, // 最初のページでは無効化
        }),
        new ButtonBuilder({
            customId: `help/${Math.min(totalPages - 1, current + 1)}`, // 進むボタン
            label: "進む",
            style: ButtonStyle.Primary,
            disabled: current === totalPages - 1, // 最後のページでは無効化
        })
    );

    return {
        embeds: [embed], // 埋め込みメッセージ
        components: [components], // ボタン
        ephemeral: true, // 自分だけに表示
    } satisfies InteractionReplyOptions;
}
