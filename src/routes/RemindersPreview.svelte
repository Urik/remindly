<script lang="ts">
  import type { DayOfWeek, FixedReminder, RecurrentReminder } from "$lib/types";

  export let reminderContent: string;
  export let reminder: RecurrentReminder | FixedReminder;

  let weeksToDisplay: Date[][];
  $: {
    if (reminder.type === 'recurrent') {
      const generator = getReminderWeeks(reminder, new Date());
      weeksToDisplay = [
        generator.next().value,
        generator.next().value,
        generator.next().value,
      ];
    }
  }

  function* getReminderWeeks(reminder: RecurrentReminder, startingPoint: Date): Generator<Date[], Date[]> {
    const reminderTime = reminder.time;
    if (reminderTime === null) {
      return [];
    }

    let dayIndex = startingPoint.getDay();
    const daysIndexMap: Record<DayOfWeek, number> = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    const reminderDays = reminder.daysOfWeek.map(dayOfWeek => daysIndexMap[dayOfWeek]);
    let countingSince = startingPoint;
    while (true) {
      const remindersOfWeek = reminderDays.filter(reminderDay => reminderDay >= dayIndex);
      const reminderDatesInWeek = remindersOfWeek.reduce((acc, dayOfWeek) => {
        const daysInTheFuture = dayOfWeek - countingSince.getDay();

        const reminderDate = new Date(countingSince);
        reminderDate.setDate(reminderDate.getDate() + daysInTheFuture);
        reminderDate.setHours(reminderTime.getHours());
        reminderDate.setMinutes(reminderTime.getMinutes());
        if (reminderDate > countingSince) {
          acc.push(reminderDate);
        }

        return acc;
      }, [] as Date[]);

      const daysUntilSunday = 7 - countingSince.getDay();
      const daysUntilNextSunday = daysUntilSunday === 0 ? 7 : daysUntilSunday;
      countingSince.setDate(countingSince.getDate() + daysUntilNextSunday);
      countingSince.setHours(0);
      countingSince.setMinutes(0);

      yield reminderDatesInWeek;
    }
  }

  function getFutureReminders(reminder: RecurrentReminder | FixedReminder): Date[] {
    if (reminder.type === 'fixed') {
      return reminder?.dateTime ? [reminder.dateTime] : [];
    } else if (reminder.type === 'recurrent') {
      reminder.daysOfWeek
    }

    return [];
  }
</script>

<div class="nes-container with-title">
  <div class="title">
    A preview of your next reminders
  </div>
  You will be reminded of <blockquote>"{reminderContent}"</blockquote> on:
  {#each weeksToDisplay as week, i }
    <div class="nes-container with-title mb-4">
      <div class="title">Week {i + 1}</div>
      <ul class="nes-list is-disc">
        {#each week as day}
          <li>{day}</li>
        {/each}
      </ul>
    </div>
    {/each}
  {#if reminder.type === 'recurrent'}
  <div>
    And so on until you decide to stop or the stars are extinguished...
  </div>
  {/if}
</div>
