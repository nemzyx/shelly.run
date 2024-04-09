<script>
  import Shelly from "./components/Shelly.svelte";
  import Grid from "./components/Grid.svelte";

  let pixels = [];
</script>

<main>
  <!-- <h1>shelly.run</h1> -->
  <Grid {pixels} />
  <Shelly bind:pixels />
</main>

<style>
</style>
