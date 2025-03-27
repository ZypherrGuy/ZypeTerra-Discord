import { Client, TextChannel, EmbedBuilder } from 'discord.js';
import cron from 'node-cron';
import { readJson } from '../utils/jsonManager';
import { clearChannel } from '../utils/clearChannel';

const channelId = '1353719999096950855';

export function startDailyMotivation(client: Client): void {
  // Schedule the task for 8:00 AM every day (server time)
  cron.schedule('0 8 * * *', async () => {
    const channel = client.channels.cache.get(channelId) as TextChannel;
    if (!channel) {
      console.error(`Channel with ID ${channelId} not found.`);
      return;
    }
    
    // Clear the channel using the helper function
    await clearChannel(channel);
    
    // Read the JSON file and extract the Quotes array
    const data = readJson('inevitable-motivation-quotes.json');
    const dailyQuotes: { id: number; quote: string }[] = data?.Quotes;

    if (!Array.isArray(dailyQuotes) || dailyQuotes.length === 0) {
      console.error('No daily quotes found in JSON file.');
      return;
    }
    
    // Pick a random quote from the array
    const randomQuoteObj = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];

    // Get current date and time details
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const dateInfo = `${dateStr}`;

    // Create an embed message with the title, date/time field, and the quote
    const embed = new EmbedBuilder()
      .setTitle('Your Inevitable Daily Motivation—or Lack Thereof')
      .addFields({ name: dateInfo, value: '' })
      .setDescription(randomQuoteObj.quote)
      .setColor('#E91E63')

    channel.send({ embeds: [embed] })
      .catch(console.error);
  });
}
