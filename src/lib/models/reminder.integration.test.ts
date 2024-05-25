import { describe, it, beforeEach, expect } from 'vitest';
import { sql } from '$lib/db';

import { getReminder, createReminder } from '$lib/models/reminder';
import type { Reminder } from '$lib/types';

describe('reminder model', () => {
  beforeEach(async () => {
    await sql`DELETE FROM reminders`;
  });

  describe('getReminder', () => {
    let reminder: Reminder;
    beforeEach(async () => {
      reminder = await createReminder({
        content: 'I am a reminder',
        reminderType: 'fixed',
        reminderUrl: 'http://test',
        reminderDate: new Date(),
      });
    });

    it('should be able to fetch a reminder', async () => {
      const testReminder = await getReminder(reminder.id);
      expect(testReminder).toEqual(reminder);
    })
  });

});