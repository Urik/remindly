import { z } from 'zod';

import { ENCRYPTION_KEY } from '$env/static/private';
import { sql } from '$lib/db';
import { daysOfWeek, reminderTypes, type ReminderType, type Reminder, type ReminderCreate } from '$lib/types';
import { decrypt, encrypt } from '$lib/encryption';

const encryptionKey = Buffer.from(ENCRYPTION_KEY, 'base64');

const reminderCommonSchema = z.object({
  id: z.number(),
  content: z.string(),
  reminderUrl: z.string(),
});

const specificRemindersSchema = z.discriminatedUnion('reminderType', [
  z.object({
    reminderType: z.literal('fixed'),
    reminderDate: z.date(),
  }),
  z.object({
    reminderType: z.literal('recurrent'),
    recurrentReminderDays: z.enum(daysOfWeek),
    recurrentReminderTime: z.date(),
  }),
]);

export const reminderSchema = reminderCommonSchema.and(specificRemindersSchema);
export const reminderCreateSchema = reminderCommonSchema.omit({
  id: true
}).and(specificRemindersSchema);

export function encryptReminder<T extends Pick<Reminder, 'content' | 'reminderUrl'>>(reminder: T): T {
  return {
    ...reminder,
    content: encrypt(reminder.content, encryptionKey),
    reminderUrl: encrypt(reminder.reminderUrl, encryptionKey),
  };
}

export function decryptReminder<T extends Pick<Reminder, 'content' | 'reminderUrl'>>(reminder: T): T {
  return {
    ...reminder,
    content: decrypt(reminder.content, encryptionKey),
    reminderUrl: decrypt(reminder.reminderUrl, encryptionKey),
  };
}

export async function getReminder(id: number): Promise<Reminder> {
  const result = await sql`
    SELECT *
    FROM reminders
    WHERE id=${id}
  `;

  const reminder = reminderSchema.parse(result[0]);
  return decryptReminder(reminder);
}

export async function getReminders(fields: string[] = ['*']): Promise<Reminder[]> {
  const reminders = await sql<Reminder[]>`
    SELECT ${fields} from reminders 
  `;

  const parsedreminders = reminderSchema.array().parse(reminders);
  return parsedreminders.map(decryptReminder);
}

export async function createReminder(reminder: ReminderCreate): Promise<Reminder> {
  const encryptedreminder = encryptReminder(reminder);
  const result = await sql<Reminder[]>`
    INSERT INTO reminders ${sql(encryptedreminder)} RETURNING *
  `;


  console.log(result);
  const parsedReminder = reminderSchema.parse(result[0]);
  return decryptReminder(parsedReminder);
}