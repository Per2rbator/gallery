
const initialState = {
  editableItemId: null,
  items: JSON.parse(localStorage.getItem('items') || '[]'),
  form: {
    isVisible: false,
    newItem: { link: '', comment: '' }
  },
  preview: {
    isVisible: false
  },
  preloader: {
    isVisible: false
  },
  imageModal: { link: '', isVisible: false }
}

const gallery = (state = initialState, action) => {

  switch (action.type) {

    case 'CHANGE_FORM_VISIBILITY': {
      return {
        ...state,
        form: {
          ...state.form,
          isVisible: action.payload
        }
      }
    }

    case 'SAVE_NEW_ITEM': {
      return {
          ...state,
        form: {
          ...state.form,
          newItem: action.payload
        }
      }
    }

    case 'CHANGE_PREVIEW_STATUS': {
      return {
        ...state,
        preview: {
          isVisible: action.payload
        }
      }
    }

    case 'CHANGE_PRELOADER_VISIBILITY': {
      return {
        ...state,
        preloader: {
          isVisible: action.payload
        }
      }
    }

    case 'SET_ITEMS': {
      return {
        ...state,
        items: action.payload
      }
    }

    case 'SET_NEW_ITEM': {
      return {
        ...state,
        items: [
          action.payload,
          ...state.items
        ]
      }
    }

    case 'SET_ID_FOR_EDIT': {
      return {
        ...state,
        editableItemId: action.payload
      }
    }

    case 'EDIT_ITEM': {
      const id = action.payload.id
      const itemIdx = state.items.findIndex(item => item.id === id)
      const item = state.items[itemIdx]
      
      return {
        ...state,
        items: [
          ...state.items.slice(0, itemIdx),
          { ...item, comment: action.payload.comment },
          ...state.items.slice(itemIdx + 1)
        ]
      }
    }

    case 'IMAGE_MODAL_TOGGLE': {
      return {
        ...state,
        imageModal: action.payload
      }
    }

    default:
      return state
  }
}

export default gallery
