<script lang="ts">
    import Sun from "svelte-radix/Sun.svelte";
    import Moon from "svelte-radix/Moon.svelte";
    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button on:click="{toggleMode}" variant="outline" size="icon" class="transition-none">
    <Sun class="size-4 scale-100 dark:scale-0" />
    <Moon class="absolute size-4 scale-0 dark:scale-100" />
    <span class="sr-only">Toggle theme</span>
</Button>