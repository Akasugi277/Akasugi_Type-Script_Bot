// src/discord/events/message/delete.ts
import { Events, EmbedBuilder } from "discord.js";
import { Settings } from '../../../database/schemas/settings.js';

export const deleteHandler = async (message) => {
    const settings = await Settings.findOne({ guildId: message.guild.id });
    if (!settings || !settings.logChannelId) return;

    const logChannel = message.guild.channels.cache.get(settings.logChannelId);
    if (!logChannel || !logChannel.isText()) return;

    const embed = new EmbedBuilder()
        .setColor(0x001F3F)
        .setTitle("メッセージ削除")
        .setDescription(`${message.author.username} がメッセージを削除しました。`)
        .addFields(
            { name: "削除されたメッセージ", value: message.content || "内容がありません。" },
            { name: "チャンネル", value: `<#${message.channel.id}>` }
        )
        .setFooter({ text: `日付: ${new Date().toLocaleString()}` })
        .setThumbnail(message.author.displayAvatarURL());

    await logChannel.send({ embeds: [embed] });
};
