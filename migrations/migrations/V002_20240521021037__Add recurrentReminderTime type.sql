ALTER TABLE public.reminders RENAME COLUMN reminderrecurrentdays TO "recurrentReminderDays";
ALTER TABLE public.reminders ADD recurrentremindertime time with time zone NULL;