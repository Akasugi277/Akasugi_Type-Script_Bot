// src/settings/error.ts
import { replaceText, limitText, createEmbed, createEmbedAuthor, brBuilder } from "@magicyan/discord"; // Discord用のユーティリティをインポート
import { type Client, codeBlock, WebhookClient } from "discord.js"; // Discord.jsの型とWebhookクライアントをインポート
import settings from "../../settings.json" with { type: "json" }; // 設定ファイルをインポート
import log from "consola"; // ログ機能をインポート
import chalk from "chalk"; // コンソールの色付け用ライブラリをインポート

// エラーハンドリング関数を定義
export async function onError(error: any, client: Client<true>) {
    log.log(client.user.displayName); // ボットのユーザー名をログに出力
    log.error(error); // エラーをログに出力

    if (!process.env.WEBHOOK_LOGS_URL) return; // Webhook URLが設定されていない場合は終了

    const errorMessage: string[] = [];
    
    if ("message" in error) errorMessage.push(String(error.message)); // エラーメッセージを追加
    if ("stack" in error) {
        const formated = replaceText(String(error.stack), { [__rootname]: "" }); // スタックトレースを整形
        errorMessage.push(limitText(formated, 3500, "...")); // スタックトレースを制限
    }
    const embed = createEmbed({
        color: settings.colors.danger, // 設定ファイルから色を取得
        author: createEmbedAuthor(client.user), // ユーザー情報を埋め込みに追加
        description: codeBlock("ts", brBuilder(errorMessage)), // エラーメッセージをコードブロックとして表示
    });

    // Webhookを使ってエラーを送信
    new WebhookClient({ url: process.env.WEBHOOK_LOGS_URL })
    .send({ embeds: [embed] }).catch(log.error); // 送信エラーをログに出力
}

// SIGINTシグナルを受け取ったときの処理
process.on("SIGINT", () => {
    log.info(chalk.dim("👋 Bye")); // 終了メッセージをログに出力
    process.exit(0); // プロセスを正常に終了
});
