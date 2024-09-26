<script>
    import DarkLightToggle from "./DarkLightToggle.svelte";
    import { PUBLIC_LINK_GITHUB } from '$env/static/public';
    import GitHubIcon from "svelte-radix/GithubLogo.svelte";
</script>
<header class="w-full">
    <div class="flex justify-between align-bottom">
        <span class="text-2xl font-medium flex flex-col justify-center">Anon chat</span>
        <DarkLightToggle/>
    </div>
    <div class="flex gap-1">
        <span class="text-sm pt-1">Made on svleteKit by </span>
        <a class="underline" target="_blank" href={PUBLIC_LINK_GITHUB}>AlexeyPe</a>
        <GitHubIcon class="size-4 self-center"/>
    </div>
</header>