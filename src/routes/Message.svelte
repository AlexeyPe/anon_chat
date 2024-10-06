<script lang="ts">
    export let author:string | null
    export let message:string
    export let date:Date
    export let right:boolean = true
</script>

<div class={`flex my-2 w-full ${right ? "justify-end " : ""}`}>
    <div class="flex flex-col w-fit max-w-56">
        <span class={`text-sm px-0.5 flex w-full ${right ? "justify-end" : ""}`}>
            {author}
        </span>
        <div class={`w-fit flex gap-1 p-1.5 pt-1 pl-2 pr-0 bg-background rounded-md border group hover:ring-ring hover:ring-1 transition-all duration-200 ${right ? "self-end" : ""}`}>
            <span class="break-all">
                {message}
            </span>
            <span class="flex flex-col justify-end pr-1 text-xs dark:text-gray-300 transition-all duration-200">
                {date.toLocaleTimeString().slice(0, 5)}
            </span>
        </div>
    </div>
</div>