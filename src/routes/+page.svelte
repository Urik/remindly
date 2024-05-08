<script lang="ts">
  import type { FixedReminder, RecurrentReminder } from "../lib/types";
  import ReminderDatesEditor from "./ReminderDatesEditor.svelte";
  import ReminderInput from "./ReminderInput.svelte";
  import RemindersPreview from "./RemindersPreview.svelte";

  let reminder: RecurrentReminder | FixedReminder | null = null;
  let whatToRemember: string = '';

  let reminderIsValid: boolean = false;
  $: {
    if (reminder?.type === 'fixed') {
      reminderIsValid = !!(reminder.dateTime && !isNaN(reminder.dateTime.getTime()));
    } else if (reminder?.type === 'recurrent') {
      reminderIsValid = !!(reminder.daysOfWeek.length > 0 && reminder.time && !isNaN(reminder.time.getTime()));
    } else {
      reminderIsValid = false;
    }
  };
</script>

<style>
</style>

<div class="nes-container w-full mb-4">
  <div class="mb-4 relative">
    <h1 class="text-red-700 text-2xl">Rememberly!</h1>
    <h1 class="text-center text-green-700 text-2xl absolute left-0 top-0 -translate-x-0.5 -translate-y-0.5">Rememberly!</h1>
  </div>
  <span>
    Hi, I am rememberly! If you need to remember anything, I can help you with that!
  </span>
</div>
<div class="nes-container w-full shadow-xl gap-4 flex flex-col">
  <ReminderInput bind:inputContent={whatToRemember} />
  {#if whatToRemember}
    <ReminderDatesEditor bind:reminder />
    {#if reminder && reminderIsValid}
      <RemindersPreview reminderContent={whatToRemember} reminder={reminder} />
      <button class="nes-btn is-error" on:click={() => console.log(reminder)}>REMIND ME!</button>
    {/if}
  {/if}
</div>
