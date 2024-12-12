// src/index.ts
import { bootstrapApp } from "#base"; // #baseからbootstrapApp関数をインポートします。
import { Client, GatewayIntentBits } from "discord.js"; // Discord.jsの必要なクラスをインポート
import { joinHandler } from './discord/events/member/join.js'; // メンバー参加イベントハンドラーをインポート
import { leaveHandler } from './discord/events/member/leave.js'; // メンバー退出イベントハンドラーをインポート
import { deleteHandler as messageDeleteHandler } from './discord/events/message/delete.js'; // メッセージ削除イベントハンドラーをインポート
import { createHandler as channelCreateHandler } from './discord/events/channel/create.js'; // チャンネル作成イベントハンドラーをインポート
import { updateHandler as channelUpdateHandler } from './discord/events/channel/update.js'; // チャンネル更新イベントハンドラーをインポート
import { deleteHandler as channelDeleteHandler } from './discord/events/channel/delete.js'; // チャンネル削除イベントハンドラーをインポート

// Discordクライアントの初期化
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        //GatewayIntentBits.GuildChannels,
    ],
});

// イベントリスナーの設定
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// メンバー参加時
client.on('guildMemberAdd', joinHandler);

// メンバー退出時
client.on('guildMemberRemove', leaveHandler);

// メッセージ削除時
client.on('messageDelete', messageDeleteHandler);

// チャンネル作成時
client.on('channelCreate', channelCreateHandler);

// チャンネル変更時
client.on('channelUpdate', channelUpdateHandler);

// チャンネル削除時
client.on('channelDelete', channelDeleteHandler);

// bootstrapApp関数を呼び出し、アプリケーションを初期化します。
// 引数として、作業ディレクトリを指定するためにimport.meta.dirnameを使用します。
// この処理は非同期であるため、awaitを使って完了を待ちます。
await bootstrapApp({ workdir: import.meta.dirname });

// Discordボットのログイン
//client.login(process.env.TOKEN); // 環境変数からトークンを取得してログインします。
