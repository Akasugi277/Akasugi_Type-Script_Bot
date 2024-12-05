// src/discord/events/channel/delete.ts
import { Events, EmbedBuilder } from "discord.js";
import { Settings } from '../../../database/schemas/settings.js';

export const deleteHandler = async (channel) => {
    const settings = await Settings.findOne({ guildId: channel.guild.id });
    if (!settings || !settings.logChannelId) return;

    const logChannel = channel.guild.channels.cache.get(settings.logChannelId);
    if (!logChannel || !logChannel.isText()) return;

    const embed = new EmbedBuilder()
        .setColor(0x001F3F)
        .setTitle("チャンネル削除")
        .setDescription(`チャンネル <#${channel.id}> が削除されました。`)
        .addFields(
            { name: "チャンネル名", value: channel.name },
            { name: "チャンネルタイプ", value: channel.type }
        )
        .setFooter({ text: `日付: ${new Date().toLocaleString()}` });

    await logChannel.send({ embeds: [embed] });
};
