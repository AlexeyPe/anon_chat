<script lang="ts">
	export let data;

	import CornerBottomRight from "svelte-radix/CornerBottomRight.svelte";
	import Reset from "svelte-radix/Reset.svelte";
	import Reload from "svelte-radix/Reload.svelte";

	import { Textarea } from "$lib/components/ui/textarea";
	import { Label } from "$lib/components/ui/label";
	import { Button } from "$lib/components/ui/button/index.js";
  	import Message from "./Message.svelte";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";

	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY} from '$env/static/public';
	import { createClient } from '@supabase/supabase-js'

	$: ({messages} = data)

	let maxLength:number = 50
	let currentLength:number = 0
	let currentMessage:string
	let textError:string = ""
	let messageCreating = false;
	const textAreaKeyup = () => {
		currentLength = currentMessage.length
		textError = currentLength == maxLength ? "text-error" : ""
	}
	onMount(() => {
		const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY)
		const roomOne = supabase.channel('schema-db-changes')
		const channelA = supabase
			.channel('schema-db-changes')
			.on('postgres_changes', {
				event: '*',
				schema: 'public',
			}, async (payload) => {
				if (payload.eventType == "INSERT") {
					const {data: userNameData} = await supabase.from('users').select().eq("userId", payload.new.user)
					let new_msg = {
						created_at: payload.new.created_at,
						id: payload.new.id,
						message: payload.new.message,
						user: {
							userId: payload.new.user,
							userName: userNameData![0].userName,
						}
					}
					if (messages.find(element => element.id == new_msg.id)) {
						console.log("find copy")
					} else {
						messages = [...messages, new_msg]
						console.log("msg added:", messages)
					}
				} else if (payload.eventType == "DELETE") {
					messages = []
				}
			}).subscribe()
	})
</script>

<svelte:head>
	<title>Anon Chat</title>
	<meta name="description" content="Anon Chat site" />
</svelte:head>

<div class="h-full relative pb-4">
	<div class="absolute h-full w-full flex flex-col">
		<div class="relative h-full flex flex-col my-5">
			<div class="absolute bottom-0 overflow-y-auto flex p-3 flex-col max-h-full w-full ">
				{#if messages != null}
					{#each messages as msg, i}
						{#if i != 0 && messages[i-1].user.userId == messages[i].user.userId}
							<Message
								author={""}
								message={msg.message}
								date={new Date(msg.created_at)}
								right={data.id == msg.user.userId}
							/>
						{:else}
							<Message
								author={msg.user.userName}
								message={msg.message}
								date={new Date(msg.created_at)}
								right={data.id == msg.user.userId}
							/>
						{/if}
					{/each}
				{/if}
			</div>
		</div>
		<div class="mx-1 pb-0.5 text-sm flex justify-between">
			
			<Tooltip.Root openDelay={150}>
				<Tooltip.Trigger>
					<span>Вы - {data.userName}</span>
				</Tooltip.Trigger>
				<Tooltip.Content>
				  <p class="text-sm">Ваш случайно созданный псевдоним</p>
				</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root openDelay={150}>
				<Tooltip.Trigger asChild let:builder>
					<form 
						method="POST"
						action="?/deleteAll"
						use:enhance
					>
						<Button  type="submit" builders={[builder]} variant="ghost" class="size-5 m-0 p-0.5">
							<Reset size={15}/>
						</Button>
					</form>
				</Tooltip.Trigger>
				<Tooltip.Content>
				  <p class="text-sm">Удалить все сообщения(Все)</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
		<form
			method="POST"
			action="?/create"
			class="bg-background focus-within:ring-ring rounded-lg border focus-within:ring-1"
			on:submit={()=>{currentLength = 0}}
			use:enhance={() => {
				messageCreating = true;
		
				return async ({ update }) => {
					await update();
					messageCreating = false;
				};
			}}
		>
			<Label for="message" class="sr-only">сообщение</Label>
			<Textarea
				required
				name="message"
				id="message"
				placeholder="Введите ваше сообщение здесь"
				bind:value={currentMessage}
				on:input={textAreaKeyup}
				maxlength={maxLength}
				on:keypress={(e)=>{
					if ((e.key || e.code) == "Enter") {
						e.preventDefault()
						document.getElementById("btnFormSendMsg")?.click()
						return false
					}
				}}
				class="min-h-[75px] resize-none border-0 p-2 pt-1.5 shadow-none focus-visible:ring-0"
			/>
	
			<div class="flex justify-between p-3 pt-0">
				<span class="text-sm self-center {textError}">{currentLength}/{maxLength}</span>
				<Button id="btnFormSendMsg" type="submit" disabled={messageCreating} size="sm" class="gap-1">
					{#if messageCreating}
						Подождите
						<Reload class="size-4 animate-spin" />
					{:else}
						Отправить
						<CornerBottomRight class="size-4"/>
					{/if}
				</Button>
			</div>
		</form>
	</div>
</div>

