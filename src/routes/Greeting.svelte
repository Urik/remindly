<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{
    create: null,
  }>();
</script>

<div class="hero m-2">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-xl font-bold">Rememberly</h1>
      <p class="py-6">Add a reminder!</p>
      <button class="nes-btn" on:click={() => dispatch('create')}>Add reminder</button>
    </div>
  </div>
</div>
