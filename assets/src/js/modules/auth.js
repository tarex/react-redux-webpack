const initialState = {
  loading: true,
};

export default function initial(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE': {
      return { ...state, loading: !state.loading };
    }
    default: {
      return state;
    }
  }
}



export function hellothere() {
	return {
		type: 'CHANGE',
	};
}

