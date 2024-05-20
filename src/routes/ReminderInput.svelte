<script lang="ts">
  export let inputContent: string;
  export let maxLength: number = 500;
</script>

<div class="md:flex md:items-center">
  <input type="text" maxlength={maxLength} placeholder="what do you want to remember?" class="nes-input grow" bind:value={inputContent} on:input >
  <div class="mt-2 md:ml-4 md:mt-0">{inputContent.length}/{maxLength}</div>
</div>
