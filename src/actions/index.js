import store from '../store';

export const changeFormVisibility = status => ({
  type: 'CHANGE_FORM_VISIBILITY',
  payload: status
})

export const chechLink = link => {
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  
  return fetch(proxy + link)
}

export const saveNewItem = ({ link, comment }) => ({
  type: 'SAVE_NEW_ITEM',
  payload: { link, comment }
})

export const changePreviewStatus = status => ({
  type: 'CHANGE_PREVIEW_STATUS',
  payload: status
})

export const changePreloaderVisibility = status => ({
  type: 'CHANGE_PRELOADER_VISIBILITY',
  payload: status
})

export const setItems = items => ({
  type: 'SET_ITEMS',
  payload: items
})

export const setNewItem = item => ({
  type: 'SET_NEW_ITEM',
  payload: item
})

export const setIdForEdit = id => ({
  type: 'SET_ID_FOR_EDIT',
  payload: id
})

export const appendNotification = notification => ({
  type: 'APPEND_NOTIFICATION',
  payload: notification
})

export const hideNotification = id => {
  console.log(id)
  return {
    type: 'HIDE_NOTIFICATION',
    payload: id
  }
}

export const removeNotification = id => ({
  type: 'REMOVE_NOTIFICATION',
  payload: id
})

export const imageModalToggle = modalParams => ({
  type: 'IMAGE_MODAL_TOGGLE',
  payload: modalParams
})

// ----------- thunk`s

export const showNotify = message => dispatch => {
  const notificationId = Date.now()
  const notification = { id: notificationId, message, isVisible: true }

  dispatch(appendNotification(notification))
  setTimeout(() => dispatch(hideNotification(notificationId)), 4000)
  setTimeout(() => dispatch(removeNotification(notificationId)), 5000)
}

export const applyChanges = items => dispatch => {
  localStorage.setItem('items', JSON.stringify(items))
  dispatch(setItems(items))
}

export const acceptEdits = item => dispatch => {
  const items = JSON.parse(localStorage.getItem('items') || '[]')
  const completedItem = { id: Date.now(), ...item }

  localStorage.setItem('items', JSON.stringify([completedItem, ...items]))
  dispatch(setNewItem(completedItem))
}

export const deleteItem = id => dispatch => {
  let items = JSON.parse(localStorage.getItem('items') || '[]')
  items = items.filter(item => item.id !== id)

  localStorage.setItem('items', JSON.stringify(items))
  dispatch(setItems(items))
}

export const editItemById = dataForUpdate => dispatch => {
  // долго пытался вытащить getState из thunk
  const { gallery: { items }} = store.getState()
  const id = dataForUpdate.id
  const itemIdx = items.findIndex(item => item.id === id)
  const item = items[itemIdx]
  const updatedItems = [
    ...items.slice(0, itemIdx),
    { ...item, comment: dataForUpdate.comment },
    ...items.slice(itemIdx + 1)
  ]

  localStorage.setItem('items', JSON.stringify(updatedItems))
  dispatch(setItems(updatedItems))
}