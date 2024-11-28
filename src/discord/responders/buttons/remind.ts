// src/discord/responders/buttons/remind.ts
import { Responder, ResponderType } from "#base"; // レスポンダーとレスポンダータイプをインポート
import { time } from "discord.js"; // Discord.jsから時間フォーマット用の関数をインポート
import { z } from "zod"; // Zodライブラリをインポート（バリデーション用）

// Zodを使用して、パラメータのスキーマを定義
const schema = z.object({
    date: z.coerce.date(), // 日付型のパラメータを定義（強制変換）
});

// ボタンレスポンダーを定義
new Responder({
    customId: "remind/:date", // カスタムID
    type: ResponderType.Button, // ボタンタイプのレスポンダー
    parse: params => schema.parse(params), // パラメータをスキーマで解析
    run(interaction, { date }) {
        // ボタンが押されたときの処理
        interaction.reply({ ephemeral, content: `You run ping command ${time(date, "R")}` }); // リプライを送信
    },
});
