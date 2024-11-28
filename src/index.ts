// src/index.ts
import { bootstrapApp } from "#base"; // #baseからbootstrapApp関数をインポートします。

// bootstrapApp関数を呼び出し、アプリケーションを初期化します。
// 引数として、作業ディレクトリを指定するためにimport.meta.dirnameを使用します。
// この処理は非同期であるため、awaitを使って完了を待ちます。
await bootstrapApp({ workdir: import.meta.dirname });