<script lang="ts">
    import "../app.css"; // импорт tailwind с помощью `npx svelte-add@latest tailwindcss`
    import Header from "./Header.svelte";
    import { ModeWatcher } from "mode-watcher";
</script>
<div class="h-screen max-w-72 flex flex-col m-auto p-3">
    <ModeWatcher disableTransitions={false}/>
    <Header/>

    <main class="h-full">
        <slot></slot>
    </main>
</div>
