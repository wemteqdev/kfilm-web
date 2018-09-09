const banner = (state = false, action) => {
    switch (action.type) {
      case 'BANNER_LOAD':
        return {...state, bannerLoad: !state.bannerLoad}
      default:
        return state
    }
}

export default banner;