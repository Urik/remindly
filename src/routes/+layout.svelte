<script lang="ts">
  import "../app.css";

  async function test(): Promise<void> {
    const registration = await navigator.serviceWorker.ready;
  }


</script>

<style>
  .container {
    margin-left: 1em;
    margin-right: 1em;
  }
</style>

<div class="container py-4">
  <slot />
</div>
