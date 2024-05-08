<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import type { DayOfWeek, RecurrentReminder } from "$lib/types";

  const dispatch = createEventDispatcher<{
    reminderSelected: RecurrentReminder | null
  }>();

  const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  export let selectedDays: DayOfWeek[] = [];
  export let selectedTime: Date | null = null;

  $: parsedTime = selectedTime ? `${prefixZeroIfNeeded(selectedTime.getHours())}:${prefixZeroIfNeeded(selectedTime.getMinutes())}` : null;

  $: if (selectedDays.length >= 1 && selectedTime) {
    dispatch('reminderSelected', { type: 'recurrent', daysOfWeek: selectedDays, time: selectedTime });
  } else {
    dispatch('reminderSelected', null);
  }

  function handleTimeChange(e: Event) {
    if (!(e?.target instanceof HTMLInputElement)) {
      return;
    }

    console.log(e.target.value);
    selectedTime = new Date(`2024-01-01T${e.target.value}`);
  }

  function prefixZeroIfNeeded(dateComponent: number): string {
    return dateComponent < 10 ? `0${dateComponent}` : String(dateComponent);
  }

  function capitalizeFirstLetter(input: string): string {
    if (input?.length === 0) {
      return input;
    }

    const [firstChar, ...restOfString] = input;
    return [firstChar.toUpperCase(), ...restOfString].join('');
  }
</script>

<div class="nes-container flex flex-col sm:block">
  <h2>On what days would you want to be reminded?</h2>

  {#each days as day}
    <label>
      <input type="checkbox" class="nes-checkbox" bind:group={selectedDays} value={day}>
      <span>{capitalizeFirstLetter(day)}</span>
    </label>
  {/each}
</div>

<div class="nes-container with-title">
  <div class="title">At what time?</div>
  <div>
    <input class="nes-input" type="time" value={parsedTime} on:input={handleTimeChange}/>
  </div>
</div>
