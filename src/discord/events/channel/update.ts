// src/discord/events/channel/update.ts
import { Events, EmbedBuilder } from "discord.js";
import { Settings } from '../../../database/schemas/settings.js';

export const updateHandler = async (oldChannel, newChannel) => {
    const settings = await Settings.findOne({ guildId: newChannel.guild.id });
    if (!settings || !settings.logChannelId) return;

    const logChannel = newChannel.guild.channels.cache.get(settings.logChannelId);
    if (!logChannel || !logChannel.isText()) return;

    const embed = new EmbedBuilder()
        .setColor(0x001F3F)
        .setTitle("チャンネル変更")
        .setDescription(`チャンネル <#${oldChannel.id}> が変更されました。`)
        .addFields(
            { name: "旧名", value: oldChannel.name },
            { name: "新名", value: newChannel.name },
            { name: "チャンネルタイプ", value: newChannel.type }
        )
        .setFooter({ text: `日付: ${new Date().toLocaleString()}` });

    await logChannel.send({ embeds: [embed] });
};
