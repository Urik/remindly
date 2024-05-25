import { z } from 'zod';

import { ENCRYPTION_KEY } from '$env/static/private';
import { sql } from '$lib/db';
import { daysOfWeek, reminderTypes, type ReminderType, type Subscription } from '$lib/types';
import { decrypt, encrypt } from '$lib/encryption';

const encryptionKey = Buffer.from(ENCRYPTION_KEY);

export const subscriptionSchema = z.object({
  id: z.optional(z.number()),
  content: z.string(),
  reminderUrl: z.string(),
}).and(z.discriminatedUnion('reminderType', [
  z.object({ 
    reminderType: z.literal('fixed'), 
    reminderDate: z.date(),
  }),
  z.object({
    reminderType: z.literal('recurrent'),
    recurrentReminderDays: z.enum(daysOfWeek),
    recurrentReminderTime: z.date(),
  }),
]));

export function encryptSubscription<T extends Pick<Subscription, 'content' | 'reminderUrl'>>(subscription: T): T {
  return {
    ...subscription,
    content: encrypt(subscription.content, encryptionKey),
    reminderUrl: encrypt(subscription.reminderUrl, encryptionKey),
  };
}

export function decryptSubscription<T extends Pick<Subscription, 'content' | 'reminderUrl'>>(subscription: T): T {
  return {
    ...subscription,
    content: decrypt(subscription.content, encryptionKey),
    reminderUrl: decrypt(subscription.reminderUrl, encryptionKey),
  };
}

export async function getSubscription(id: number): Promise<Subscription> {
  const result = sql`
    SELECT *
    FROM subscription
    WHERE id=${id}
  `;

  const subscription = subscriptionSchema.parse(result);
  return decryptSubscription(subscription);
}

export async function getSubscriptions(fields: string[] = ['*']): Promise<Subscription[]> {
  const subscriptions = await sql<Subscription[]>`
    SELECT ${fields} from subscriptions 
  `;

  const parsedSubscriptions = subscriptionSchema.array().parse(subscriptions);
  return parsedSubscriptions.map(decryptSubscription);
}

export async function createSubscription(subscription: Omit<Subscription, 'id'>): Promise<Subscription> {
  const encryptedSubscription = encryptSubscription(subscription);
  const result = await sql<Subscription[]>`
    INSERT INTO subscriptions ${sql(encryptedSubscription)}
  `;

  const parsedSubscription = subscriptionSchema.parse(result[0]);
  return decryptSubscription(parsedSubscription);
}