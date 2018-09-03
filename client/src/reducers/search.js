const search = (state = {}, action) => {
    switch (action.type) {
      case 'TOGGLE_SEARCH':
        return {...state, toggleSearch: !state.toggleSearch}
      default:
        return state
    }
  }
  
export default search;