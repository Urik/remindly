ALTER TABLE public.reminders ALTER COLUMN "recurrentReminderDays" TYPE varchar(9) USING "recurrentReminderDays"::varchar(9);