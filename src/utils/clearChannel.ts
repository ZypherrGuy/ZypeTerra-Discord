import { TextChannel } from 'discord.js';

/**
 * Clears up to a specified number of recent messages in the given TextChannel.
 * Note: Bulk deletion only works for messages younger than 14 days.
 *
 * @param channel - The TextChannel to clear.
 * @param limit - The maximum number of messages to delete (default 100).
 */
export async function clearChannel(channel: TextChannel, limit: number = 100): Promise<void> {
  try {
    await channel.bulkDelete(limit, true);
  } catch (error) {
    console.error("Error clearing channel messages:", error);
  }
}
