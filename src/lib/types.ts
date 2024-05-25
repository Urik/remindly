import { z } from 'zod';
import type { reminderSchema } from "./models/reminder";

export const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
export type DayOfWeek = typeof daysOfWeek[number];//'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

export interface RecurrentReminder {
  type: 'recurrent';
  daysOfWeek: DayOfWeek[];
  time: Date | null;
}

export interface FixedReminder {
  type: 'fixed';
  dateTime: Date | null;
}

export const reminderTypes = ['recurrent', 'fixed'] as const;
export type ReminderType = typeof reminderTypes[number];

export type Reminder = z.infer<typeof reminderSchema>;
