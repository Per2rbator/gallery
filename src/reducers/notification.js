
const initialState = {
  notifications: []
}

const notification = (state = initialState, action) => {

  switch (action.type) {

    case 'APPEND_NOTIFICATION': {
      return {
        notifications: [
          action.payload,
          ...state.notifications
        ]
      }
    }

    case 'HIDE_NOTIFICATION': {
      const id = action.payload
      const itemIdx = state.notifications.findIndex(n => n.id === id)
      const item = state.notifications[itemIdx]

      return {
        notifications: [
          ...state.notifications.slice(0, itemIdx),
          { ...item, isVisible: false },
          ...state.notifications.slice(itemIdx + 1)
        ]
      }
    }

    case 'REMOVE_NOTIFICATION': {
      const id = action.payload
      return {
        notifications: state.notifications.filter(n => n.id !== id)
      }
    }

    default:
      return state
  }
}

export default notification
