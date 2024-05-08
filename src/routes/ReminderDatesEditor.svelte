<script lang="ts">
  import { fade } from 'svelte/transition';

  import RecurrentDateSelector from './RecurrentDateSelector.svelte';
  import DateTimeSelector from './DateTimeSelector.svelte';
  import type { FixedReminder, RecurrentReminder } from '$lib/types';


  export let reminder: FixedReminder | RecurrentReminder | null;

  let fixedReminder: FixedReminder = {
    dateTime: null,
    type: 'fixed',
  };

  let recurrentReminder: RecurrentReminder = {
    daysOfWeek: [],
    time: null,
    type: 'recurrent',
  };

  $: selectedType = reminder ? reminder.type : null;

  function handleFixedReminderChanged(date: Date | null): void {
    if (!date) {
      reminder = null;
      return;
    }

    fixedReminder = {
      type: 'fixed',
      dateTime: date,
    };

    reminder = fixedReminder;
  }

  function changeSelectedType(newType: 'recurrent' | 'fixed'): void {
    if (newType === 'recurrent') {
      reminder = recurrentReminder;
    } else if (newType === 'fixed') {
      reminder = fixedReminder;
    }
  }

</script>

<span transition:fade class="transition-all">What kind of reminder?</span>
<div
  transition:fade
  class="flex flex-row justify-stretch gap-4 transition-all"
>
  <button
    on:click={() => changeSelectedType('recurrent')}
    class="transition-[flex-grow] ease-in-out nes-btn {selectedType ===
    'recurrent'
      ? 'grow-[8]'
      : 'flex-grow'}"
    class:is-success={selectedType === "recurrent"}>Recurrent date</button
  >
  <button
    on:click={() => changeSelectedType('fixed')}
    class="transition-[flex-grow] ease-in-out nes-btn {selectedType ===
    'fixed'
      ? 'grow-[8]'
      : 'flex-grow'}"
    class:is-success={selectedType === "fixed"}>Fixed date</button
  >
</div>
{#if selectedType === "recurrent"}
  <RecurrentDateSelector bind:selectedDays={recurrentReminder.daysOfWeek} bind:selectedTime={recurrentReminder.time} on:reminderSelected={(selectedReminder) => {
    reminder = recurrentReminder;
  }} />
{:else if selectedType === "fixed"}
  <div class="nes-container with-title">
    <div class="title">When?</div>
    <DateTimeSelector min={new Date()} on:dateChanged={(e) => handleFixedReminderChanged(e.detail) } date={fixedReminder.dateTime}/>
  </div>
{/if}
