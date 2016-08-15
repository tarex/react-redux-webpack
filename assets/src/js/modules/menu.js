const initialState = {
  mobileMenu: 'hey',
  halum: false,
  refat: 'ramu',
  todos: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: state.todos.concat(['1']),
        tareq: action.tareq,
      };


    default:
      return state;
  }
}


export function doRoman() {
  return {
    type: 'ADD_TODO',
    tareq: 'jobayere'
  };
}
