// src/settings/global.ts
import { join } from "node:path"; // パス操作のためのモジュールをインポート

// グローバルな型定義
declare global {
	const animated: true; // アニメーションフラグ
	const fetchReply: true; // 応答取得フラグ
	const ephemeral: true; // 一時的フラグ
	const required: true; // 必須フラグ
	const inline: true; // インラインフラグ
	const disabled: true; // 無効フラグ
	const __rootname: string; // プロジェクトのルートパス
	function rootTo(...path: string[]): string; // ルートからのパスを生成する関数
}

// グローバルオブジェクトにプロパティを追加
Object.assign(globalThis, Object.freeze({
	animated: true,
	fetchReply: true,
	ephemeral: true,
	required: true,
	inline: true,
	disabled: true,
	__rootname: process.cwd(), // 現在の作業ディレクトリを取得
	rootTo(...path: string[]) { // ルートからのパスを結合する関数
		return join(process.cwd(), ...path);
	}
}));
