export function load({ cookies }) {
	let id = cookies.get('userid');

	if (!id) {
		id = String(new Date().getTime());
		cookies.set('userid', id, { path: '/' });
	}
	const userName:string = getUserName(Number(id))

	return {
		userName,
		id
	};
}

const x = ['красная', 'синяя', 'зелёная', 'белая', 'чёрная', 'оранжевая', 'золотая', 'голубая']
const y = ['черепаха', 'обезьяна', 'собака', 'акула', 'рыба', 'панда', 'лама', 'змея']
function getUserNameWord(id:number, arr:Array<string>):string {
	return id == 0 ? arr[0] : arr[id%arr.length]
}
function getUserName(id:number):string {
	return `${getUserNameWord(id, x)} ${getUserNameWord(id, y)}`
}