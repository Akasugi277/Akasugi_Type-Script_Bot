// src/discord/commands/test/counter.ts
import { Command, Responder, ResponderType } from "#base"; // コマンドとレスポンダーをインポート
import { createEmbed, createEmbedAuthor, createRow } from "@magicyan/discord"; // 埋め込みメッセージとボタン行を作成するための関数をインポート
import { ApplicationCommandType, ButtonBuilder, ButtonStyle, InteractionReplyOptions, User } from "discord.js"; // Discord.jsから必要な型とクラスをインポート

// "counter" コマンドを定義
new Command({
    name: "counter", // コマンド名
    description: "🧪｜ボタンを押してカウントをします。（動作テスト用）", // コマンドの説明
    type: ApplicationCommandType.ChatInput, // コマンドタイプ
    run(interaction) {
        // コマンド実行時の処理
        interaction.reply(counterMenu(interaction.user, 0)); // 初期値0でカウンターメニューを表示
    }
});

// ボタンレスポンダーを定義
new Responder({
    customId: "counter/:current", // カスタムID
    type: ResponderType.Button, cache: "cached", // ボタンタイプのレスポンダー
    run(interaction, { current }) {
        const parsed = Number.parseInt(current); // 現在の値を数値に変換
        interaction.update(counterMenu(interaction.user, parsed)); // メニューを更新
    },
});

// カウンターメニューを作成する関数
function counterMenu(user: User, current: number) {    
    const embed = createEmbed({
        author: createEmbedAuthor(user), // ユーザー情報を埋め込みに追加
        color: "Random", // ランダムな色
        description: `ボタンを押してカウント: ${current}` // 現在の値を表示
    });
    const components = [
        createRow(
            new ButtonBuilder({
                customId: `counter/${current+1}`, // "+"ボタンのカスタムID
                label: "+", style: ButtonStyle.Success // ボタンのラベルとスタイル
            }),
            new ButtonBuilder({
                customId: `counter/${current-1}`, // "-"ボタンのカスタムID
                label: "-", style: ButtonStyle.Danger // ボタンのラベルとスタイル
            }),
        )
    ];
    return { 
        ephemeral, embeds: [embed], components // 返却するオブジェクト
    } satisfies InteractionReplyOptions; // InteractionReplyOptions型であることを確認
}
