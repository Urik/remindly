export type DayOfWeek = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

export interface RecurrentReminder {
  type: 'recurrent';
  daysOfWeek: DayOfWeek[];
  time: Date | null;
}

export interface FixedReminder {
  type: 'fixed';
  dateTime: Date | null;
}

