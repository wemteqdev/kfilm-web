const billLoading = (state = true, action) => {
    switch (action.type) {
      case 'BILL_LOADING':
        return {...state, billLoading: !state.billLoading}
      default:
        return state
    }
  }
  
export default billLoading;