<script lang="ts">
	import CornerBottomRight from "svelte-radix/CornerBottomRight.svelte";

	import { Textarea } from "$lib/components/ui/textarea";
	import { Label } from "$lib/components/ui/label";
	import { Button } from "$lib/components/ui/button/index.js";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

	let maxLength:number = 60
	let currentLength:number = 0
	let currentMessage:string
	let textError:string = ""
	const textAreaKeyup = () => {
		currentLength = currentMessage.length
		textError = currentLength == maxLength ? "text-error" : ""
	}
</script>

<svelte:head>
	<title>Anon Chat</title>
	<meta name="description" content="Anon Chat site" />
</svelte:head>

<div class="h-full relative pb-4">
	<div class="absolute h-full w-full flex flex-col">
		<div class="h-full flex flex-col justify-end">
			<ScrollArea class=" my-4 ml-1">
				<p>message 1</p>
				<p class="text-end">message 2</p>
				<p>message 3</p>
				<p>message 4</p>
				<p class="text-end">message 5</p>
				<p>message 6</p>
			</ScrollArea>
		</div>
		<form class="bg-background focus-within:ring-ring rounded-lg border focus-within:ring-1">
			<Label for="message" class="sr-only">сообщение</Label>
			<Textarea
				required
				id="message"
				placeholder="Введите ваше сообщение здесь"
				bind:value={currentMessage}
				on:input={textAreaKeyup}
				maxlength={maxLength}
				class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
			/>
	
			<div class="flex justify-between p-3 pt-0">
				<span class="text-sm self-center {textError}">{currentLength}/{maxLength}</span>
				<Button type="submit" size="sm" class="gap-1">
					Отправить
					<CornerBottomRight class="size-4"/>
				</Button>
			</div>
		</form>
	</div>
</div>

