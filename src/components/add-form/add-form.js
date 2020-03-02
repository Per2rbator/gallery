import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  changeFormVisibility,
  showNotify,
  chechLink,
  saveNewItem,
  changePreviewStatus,
  changePreloaderVisibility
} from '../../actions'

import './add-form.css'

export class AddForm extends Component {

  state = {
    imageUrl: '',
    comment: '',
    isButtonDisabled: false
  }

  close = () => {
    this.setState(() => ({
      imageUrl: '',
      comment: ''
    }))

    this.props.closeForm()
  }

  addNewImage = e => {
    e.preventDefault()
    this.setState(() => ({ isButtonDisabled: true }))

    const { imageUrl, comment } = this.state
    const { isNotificationVisible, checkLink,
            saveNewItem, setPreloaderStatus } = this.props

    if ((!imageUrl || !imageUrl.trim()) && !isNotificationVisible) {
      this.props.showNotify('Введите ссылку')
      this.setState(() => ({ isButtonDisabled: false }))
      return
    }
    
    if (navigator.onLine) {
      setPreloaderStatus(true)
      checkLink(imageUrl)
        .then(res => {
          if (!res.ok) {
            this.props.showNotify('Ссылка битая')
            this.setState(() => ({ isButtonDisabled: false }))
            setPreloaderStatus(false)
            return
          }

          if (res.headers.get('Content-Type').includes('image')) {
            saveNewItem({
              link: imageUrl,
              comment: comment.trim()
            })

            this.props.closeForm()
            this.props.openPreview()
  
            this.setState(() => ({
              imageUrl: '',
              comment: '',
              isButtonDisabled: false
            }))
          } else {
            this.props.showNotify('Ссылка не на картинку')
            this.setState(() => ({ isButtonDisabled: false }))
          }
          setPreloaderStatus(false)
        })
        .catch(err => {
          this.props.showNotify('Ссылка битая')
          this.setState(() => ({ isButtonDisabled: false }))
          setPreloaderStatus(false)
        })
    } else {
      this.props.showNotify('Нет соединения')
      this.setState(() => ({ isButtonDisabled: false }))
    }
    this.setState(() => ({ isButtonDisabled: false }))
  }

  handleChangeValue(e) {
    const prop = e.currentTarget.getAttribute('data')
    const value = e.target.value

    this.setState(() => ({
      [prop]: value
    }))
  }

  render() {
    return this.props.isFormVisible ? (
      <div className="add-form__overlay">
        <form className="add-form__form" onSubmit={ this.addNewImage }>
          <i
            className="material-icons add-form__close"
            onClick={ this.close }
          >
            close
          </i>
          <p className="add-form__heading">Add new picture</p>
          <div className="add-form__input-wrapper">
            <p className="add-form__explanation">Link:</p>
            <input
              data="imageUrl"
              className="add-form__link"
              type="text"
              value={ this.state.imageUrl }
              onChange={ e => this.handleChangeValue(e) }
              placeholder="Enter image link"
            />
          </div>
          <div className="add-form__input-wrapper">
            <p className="add-form__explanation">Comment:</p>
            <textarea
              data="comment"
              className="add-form__comment"
              cols="30"
              rows="3"
              value={ this.state.comment }
              onChange={ e => this.handleChangeValue(e) }
              placeholder="Enter comment (optional)"
            />
          </div>
          <button
            className="add-form__add-new"
            disabled={ this.state.isButtonDisabled }
            onClick={ this.addNewImage }
          >
            Next
          </button>
        </form>
      </div>
    ) : null
  }
}

const mapStateToProps = ({ gallery, notification }) => ({
  isFormVisible: gallery.form.isVisible,
  isNotificationVisible: notification.isVisible
})

const mapDispatchToProps = dispatch => ({
  closeForm: () => dispatch(changeFormVisibility(false)),
  showNotify: message => showNotify(message)(dispatch),
  checkLink: link => chechLink(link),
  saveNewItem: item => dispatch(saveNewItem(item)),
  openPreview: () => dispatch(changePreviewStatus(true)),
  setPreloaderStatus: status => dispatch(changePreloaderVisibility(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddForm)