import Menu from './menu';

const initialState = {
  loading: true,
};

function initial(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        loading: !state.loading
      };
    default: {
      return state;
    }
  }
}

export {
  initial,
  Menu,
};
