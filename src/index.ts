import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { execute as startup } from './events/startup';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => startup(client));

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
});

client.login(process.env.DISCORD_TOKEN);
