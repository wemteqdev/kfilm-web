const STATE = {
  toggleSidebar:false
}
const sidebar = (state = STATE, action) => {
    switch (action.type) {
      case 'TOGGLE_SIDEBAR':
        return {...state, toggleSidebar: !state.toggleSidebar}
      default:
        return state
    }

}
  
export default sidebar;