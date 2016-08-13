import clone from 'clone';
import { findIndex } from 'underscore';
const initialList = {
	allItem : [],
};

export default function reducer(state = initialList , action) {
	switch(action.type) {
		case 'AddItem': 
			return {
				...state,
				allItem: state.allItem.concat([action.data]),
			}
		case 'DeleteItem':
			const items = clone(state.allItem);
			const index = findIndex(items, {uid: action.id });
			return{
				...state,
				allItem: [...items.slice(0, index), ...items.slice(index+1)],
			}
		case 'ToggleItem':
			const toggleitems = clone(state.allItem);
			const toggleindex = findIndex(toggleitems, {uid: action.id });
			const dummyEditedItem = {};
			if (toggleindex !== -1) {
				const firstpart = toggleitems.slice(0, toggleindex);
				const editedItem = toggleitems.slice(toggleindex, toggleindex+1);
				const lastPart = toggleitems.slice(toggleindex+1);
				dummyEditedItem.uid = editedItem[0].uid;
				dummyEditedItem.data = editedItem[0].data;
				dummyEditedItem.open = !editedItem[0].open;
			}
			return{
				...state,
				allItem: [...toggleitems.slice(0, toggleindex).concat([dummyEditedItem]), ...toggleitems.slice(toggleindex+1)],
			}
		case 'EditItem':
			const edititems = clone(state.allItem);
			const editindex = findIndex(edititems, {uid: action.id });
			const doEditedItem = {};
			if (editindex !== -1) {
				const firstItemPart = edititems.slice(0, editindex);
				const targetItem = edititems.slice(editindex, editindex+1);
				const lastItemPart = edititems.slice(editindex+1);
				doEditedItem.uid = targetItem[0].uid;
				doEditedItem.data = action.data;
				doEditedItem.open = !targetItem[0].open;
			}
			return{
				...state,
				allItem: [...edititems.slice(0, editindex).concat([doEditedItem]), ...edititems.slice(editindex+1)],
			}
		default: 
			return state;
	}
}