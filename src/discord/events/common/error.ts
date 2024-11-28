// src/discord/events/common/error.ts
import { Event } from "#base"; // イベントクラスをインポート
import { log } from "#settings"; // ログ機能をインポート

// エラーハンドラのイベントを定義
new Event({
    name: "Error handler", // イベント名
    event: "error", // 監視するイベントタイプ
    async run(error) {
        // エラーが発生した際の処理
        log.error(error); // エラーをログに記録
    },
});
