<script lang="ts">
  export let inputContent: string;
  export let maxLength: number = 500;
</script>

<div class="flex items-center">
  <input type="text" maxlength={maxLength} placeholder="what do you want to remember?" class="nes-input grow" bind:value={inputContent} on:input >
  <span class="ml-4">{inputContent.length}/{maxLength}</span>
</div>
