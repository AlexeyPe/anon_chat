<script lang="ts">
    import "../app.css"; // импорт tailwind с помощью `npx svelte-add@latest tailwindcss`
    import Header from "./Header.svelte";
    import { ModeWatcher } from "mode-watcher";
</script>
<div class="max-w-72 flex flex-col justify-center m-auto p-3">
    <ModeWatcher disableTransitions={false}/>
    <Header/>

    <main class="flex ">
        <slot></slot>
    </main>

</div>
