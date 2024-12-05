// src/discord/events/member/join.ts
import { Events, EmbedBuilder } from "discord.js";
import { Settings } from '../../../database/schemas/settings.js';

export const joinHandler = async (member) => {
    const settings = await Settings.findOne({ guildId: member.guild.id });
    if (!settings || !settings.logChannelId) return; // ログチャンネルが設定されていなければ終了

    const logChannel = member.guild.channels.cache.get(settings.logChannelId);
    if (!logChannel || !logChannel.isText()) return; // テキストチャンネルでなければ終了

    const embed = new EmbedBuilder()
        .setColor(0x001F3F)
        .setTitle("メンバー参加")
        .setDescription(`${member.user.username} がサーバーに参加しました。`)
        .setFooter({ text: `日付: ${new Date().toLocaleString()}` })
        .setThumbnail(member.user.displayAvatarURL());

    await logChannel.send({ embeds: [embed] });
};
