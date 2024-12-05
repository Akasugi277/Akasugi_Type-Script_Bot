// src/discord/events/member/leave.ts
import { Events, EmbedBuilder } from "discord.js";
import { Settings } from '../../../database/schemas/settings.js';

export const leaveHandler = async (member) => {
    const settings = await Settings.findOne({ guildId: member.guild.id });
    if (!settings || !settings.logChannelId) return;

    const logChannel = member.guild.channels.cache.get(settings.logChannelId);
    if (!logChannel || !logChannel.isText()) return;

    const embed = new EmbedBuilder()
        .setColor(0x001F3F)
        .setTitle("メンバー退出")
        .setDescription(`${member.user.username} がサーバーから退出しました。`)
        .setFooter({ text: `日付: ${new Date().toLocaleString()}` })
        .setThumbnail(member.user.displayAvatarURL());

    await logChannel.send({ embeds: [embed] });
};
