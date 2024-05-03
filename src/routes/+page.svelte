<script lang="ts">
  import { fly, fade } from 'svelte/transition';

  import Greeting from './Greeting.svelte';
  import ReminderInput from './ReminderInput.svelte';

  let whatToRemember: string;
  let selectedType: 'recurring' | 'fixed';
</script>

<style>
</style>

<div class="nes-container w-full my-4">
  <div class="mb-4 relative">
    <h1 class="text-red-700 text-2xl">Rememberly!</h1>
    <h1 class="text-center text-green-700 text-2xl absolute left-0 top-0 -translate-x-0.5 -translate-y-0.5">Rememberly!</h1>
  </div>
  <span>
    Hi, I am rememberly! If you need to remember anything, I can help you with that!
  </span>
</div>
<!-- <Greeting on:create={() => {console.log('bebo')}}/> -->
<div class="nes-container w-full shadow-xl gap-4 flex flex-col">
    <ReminderInput bind:inputContent={whatToRemember}/>

    {#if whatToRemember}
      <span transition:fade class="transition-all">When?</span>
      <div transition:fade class="flex flex-row justify-stretch gap-4 transition-all">
        <button on:click={() => selectedType = 'recurring'} class="transition-[flex-grow] ease-in-out nes-btn { selectedType === 'recurring' ? 'grow-[8]' : 'flex-grow' }">Recurring date</button>
        <button on:click={() => selectedType = 'fixed'} class="transition-[flex-grow] ease-in-out nes-btn { selectedType === 'fixed' ? 'grow-[8]' : 'flex-grow' }">Fixed date</button>
      </div>
      {#if selectedType === 'recurring'}
        LOL
      {/if}
    {/if}
</div>
