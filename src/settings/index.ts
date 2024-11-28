// src/settings/index.ts
import settings from "../../settings.json" with { type: "json" }; // 設定ファイルをインポート
import { envSchema, type EnvSchema } from "./env.js"; // 環境変数スキーマをインポート
import { brBuilder } from "@magicyan/discord"; // Discord用のユーティリティをインポート
import chalk from "chalk"; // コンソールの色付け用ライブラリをインポート
import log from "consola"; // ログ機能をインポート

export * from "./error.js"; // エラーハンドラをエクスポート
import "./global.js"; // グローバル設定をインポート

export { settings, log }; // 設定とログをエクスポート

// 環境変数ファイルのフラグチェック
if (!process.execArgv.includes("--env-file")) {
    log.warn(chalk.yellow("The executed script does not contain the --env-file flag")); // 警告メッセージ
}

// 環境変数のバリデーション
const parseResult = envSchema.safeParse(process.env);
if (!parseResult.success) {
    for (const { message, path } of parseResult.error.errors) {
        log.error({
            type: "ENV VAR",
            message: chalk.red(`${chalk.bold(path)} ${message}`) // エラーメッセージをログに出力
        });
    }
    log.fatal(chalk.red(brBuilder(
        "Environment variables are undefined or the env file was not loaded.",
        "Make sure to run the bot using package.json scripts"
    )));
    process.exit(1); // エラーがあればプロセスを終了
}
process.env = Object({ ...process.env, ...parseResult.data }); // 環境変数を上書き

log.success(chalk.hex(settings.colors.bravery)("Env vars loaded successfully!")); // 成功メッセージを出力

// Node.jsのProcessEnvインターフェースを拡張
declare global {
    namespace NodeJS {
        interface ProcessEnv extends Readonly<EnvSchema> {}
    }
}
