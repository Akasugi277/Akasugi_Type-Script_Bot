// src/discord/events/channel/create.ts
import { Events, EmbedBuilder } from "discord.js";
import { Settings } from '../../../database/schemas/settings.js';

export const createHandler = async (channel) => {
    const settings = await Settings.findOne({ guildId: channel.guild.id });
    if (!settings || !settings.logChannelId) return;

    const logChannel = channel.guild.channels.cache.get(settings.logChannelId);
    if (!logChannel || !logChannel.isText()) return;

    const embed = new EmbedBuilder()
        .setColor(0x001F3F)
        .setTitle("チャンネル作成")
        .setDescription(`新しいチャンネル <#${channel.id}> が作成されました。`)
        .setFooter({ text: `日付: ${new Date().toLocaleString()}` });

    await logChannel.send({ embeds: [embed] });
};
