// В реальном приложении эти данные хранились бы в базе данных, а не в памяти.
// Но для этого демо-приложения мы будем хитрить

const db = new Map();

const x = ['красная', 'синяя', 'зелёная', 'белая', 'чёрная', 'оранжевая', 'золотая', 'голубая']
const y = ['черепаха', 'обезьяна', 'собака', 'акула', 'рыба', 'панда', 'лама', 'змея']
function getUserNameWord(id:number, arr:Array<string>):string {
	return id == 0 ? arr[0] : arr[id%arr.length]
}
export function getUserName(id:number):string {
	return `${getUserNameWord(id, x)} ${getUserNameWord(id, y)}`
}

export function getMessages():Array<any> {
	let messages = db.get("messages")
	if (messages == undefined) {
		messages = []
		db.set("messages", [])
	}
	// console.log("getMessages() messages:",messages)
	const res = db.get("messages").map((item:any) => {
		item.userName = getUserName(item.id)
		return item
	})
	// console.log("getMessages() res:",res)
	return res
}

export function createMessage(userId:number, message:any) {
	const messages = db.get("messages")

	messages.push({
		id: userId,
		message: message,
		dateUTC: new Date().getTime()
	});
}

export function delteAllMessages() {
	db.set("messages", [])
}
