import { PRIVATE_URL_API } from '$env/static/private';
import type { PageServerLoad } from './$types.js';
import { supabase } from "$lib/supabaseClient";
import { error } from 'console';

export const load: PageServerLoad = async ({ cookies }) => {
	let id = cookies.get('userid')

	if (!id) {
		id = String(new Date().getTime());
		cookies.set('userid', id, { path: '/' })
	}

	interface Message {
		created_at: string
		id: number
		message: string
		user: {
			userId: number
			userName: string
		}
	}

	
	let { data: userName } = await supabase.rpc('getusername', {userid:Number(id)})
	
	let { data: messages } = await supabase
		.from('messages')
		.select('id, created_at, message, user(userId, userName)')
		.returns<Array<Message>>()
		
	// console.log(messages)

	return {
		userName,
		id: Number(id),
		messages:messages ?? [],
	};
}

export const actions = {
	create: async ({ cookies, request }) => {
		const data = await request.formData()
		// console.log("отправлено add_message")
		await supabase.rpc('add_message', {userid: Number(cookies.get('userid')), message: String(data.get('message')) })
	},
	deleteAll: async () => {
		// console.log("отправлено delete_messages")
		let { error } = await supabase.rpc('delete_all_messages')
		if (error) console.log(error)
	},
};