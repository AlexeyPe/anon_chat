<script lang="ts">
    import "../app.css"; // импорт tailwind с помощью `npx svelte-add@latest tailwindcss`
    import Header from "./Header.svelte";
    import { ModeWatcher } from "mode-watcher";
</script>
<div>
    <ModeWatcher disableTransitions={false}/>
    <Header/>

    <main>
        <slot></slot>
    </main>

</div>
