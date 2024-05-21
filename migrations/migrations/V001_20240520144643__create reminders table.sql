create table reminders	(
	id serial primary key,
	content varchar(500),
	reminderRecurrentDays char(1)[],
	reminderDate timestamp with time zone,
	reminderUrl text
)