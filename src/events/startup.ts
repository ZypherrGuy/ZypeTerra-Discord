import { Client } from 'discord.js';
import { startDailyMotivation } from '../services/inevitable-motivation.service';

export const name = 'ready';
export const once = true;

export function execute(client: Client): void {
  console.log(`Logged in as ${client.user?.tag}!`);
  startDailyMotivation(client);
}
