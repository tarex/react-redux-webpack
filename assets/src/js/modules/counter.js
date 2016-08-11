const initial = {
	name: 'tareq'
}

export default function reducer(state = initial , action) {
	switch(action.type) {
		case 'CHANGE': 
			return {
				...state
			}
		default: 
			return state;
	}
}