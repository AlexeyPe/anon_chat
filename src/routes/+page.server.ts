import { PRIVATE_URL_API } from '$env/static/private';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ cookies }) => {
	let id = cookies.get('userid')

	if (!id) {
		id = String(new Date().getTime());
		cookies.set('userid', id, { path: '/' })
	}

	let userName:string = ""
	await fetch(PRIVATE_URL_API + "getUserName/" + id).then(async (res) => {
		await res.json().then(res => {userName = res["userName"]})
	})

	let messages:Array<any> = []
	await fetch(PRIVATE_URL_API + "getMessages/").then(async (res) => {
		await res.json().then(res => {messages = res["messages"]})
	})

	return {
		userName,
		id,
		messages,
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