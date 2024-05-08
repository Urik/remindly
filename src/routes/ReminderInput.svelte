<script lang="ts">
  export let inputContent: string;
</script>

<input type="text" placeholder="what do you want to remember?" class="nes-input" bind:value={inputContent} on:input >
