import { json } from '@sveltejs/kit';
import * as db from '$lib/server/database.js';

export function GET() {
	return json(db.getMessages());
}