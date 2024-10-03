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

	let {data: users, error}= await supabase
		.from('users')
		.select('*')
	
	let { data: messages } = await supabase
		.from('messages')
		.select('id, created_at, message, user(userId, userName)')
		.returns<Array<Message>>()
		
	console.log(messages)

	return {
		userName:"",
		id: Number(id),
		messages:messages ?? [],
	};
}

export const actions = {
	create: async ({ cookies, request }) => {
		const data = await request.formData()
		fetch(PRIVATE_URL_API + "createMessage/", {
			method:"POST",
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: Number(cookies.get('userid')),
				message: data.get('message'),
			}),
		})
	},
	deleteAll: async () => {
		fetch(PRIVATE_URL_API + "delteAllMessages/", {method:"POST"})
	},
};