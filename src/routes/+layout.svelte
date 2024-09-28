<script lang="ts">
    import "../app.css"; // импорт tailwind с помощью `npx svelte-add@latest tailwindcss`
    import Header from "./Header.svelte";
    import { ModeWatcher } from "mode-watcher";
</script>
<div class="flex flex-col h-screen max-w-96 m-auto p-3">
    <ModeWatcher disableTransitions={false}/>
    <Header/>

    <main class="h-full flex flex-col">
        <slot></slot>
    </main>
</div>
