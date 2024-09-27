<script lang="ts">
    export let author:string
    export let message:string
    export let date:Date
    export let right:boolean = true
</script>

<div class={`flex w-full ${right ? "justify-end" : ""}`}>
    <div class="flex flex-col w-4/5 max-w-56">
        <span class={`text-sm px-1.5 flex w-full ${right ? "justify-end" : ""}`}>{author}</span>
        <div class="relative m-0.5 p-1 pb-2 bg-background rounded-md border group hover:ring-ring hover:ring-1 transition-all duration-200">
            <span>{message}</span>
            <span class="absolute right-0 bottom-0 pr-1 text-xs text-secondary group-hover:text-primary transition-all duration-200">
                {date.toLocaleTimeString().slice(0, 5)} {date.toLocaleDateString()}
            </span>
        </div>
    </div>
</div>