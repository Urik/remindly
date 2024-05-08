<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  export let min: Date = new Date();
  export let date: Date | null = null;

  const dispatch = createEventDispatcher<{
    dateChanged: Date | null;
  }>();

  $: componentValue = date ? parseDate(date) : "";
  $: parsedMin = parseDate(min);

  onMount(() => dispatch("dateChanged", dateStringToDate(componentValue)));

  function handleDateChanged(e: Event): void {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    dispatch("dateChanged", dateStringToDate(e.target.value));
  }

  function dateStringToDate(dateString: string): Date {
    return new Date(dateString);
  }

  function prefixZeroIfNeeded(dateComponent: number): string {
    return dateComponent < 10 ? `0${dateComponent}` : String(dateComponent);
  }

  function parseDate(dateToParse: Date): string {
    // dateToParse.getMonth() is zero based, gotta add one
    return `${[dateToParse.getFullYear(), prefixZeroIfNeeded(dateToParse.getMonth() + 1), prefixZeroIfNeeded(dateToParse.getDate())].join("-")}T${prefixZeroIfNeeded(dateToParse.getHours())}:${prefixZeroIfNeeded(dateToParse.getMinutes())}`;
  }
</script>

<input
  type="datetime-local"
  min={parsedMin}
  class="nes-input"
  value={componentValue}
  on:input={handleDateChanged}
/>
