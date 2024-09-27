import * as db from '$lib/server/database.js';

export function load({ cookies }) {
	let id = cookies.get('userid')

	if (!id) {
		id = String(new Date().getTime());
		cookies.set('userid', id, { path: '/' })
	}

	return {
		userName: db.getUserName(Number(id)),
		id,
		messages: db.getMessages(),
	};
}

export const actions = {
	create: async ({ cookies, request }) => {
		const data = await request.formData()
		db.createMessage(Number(cookies.get('userid')), data.get('message'))
	},
	deleteAll: async () => {
		db.delteAllMessages()
	},
};