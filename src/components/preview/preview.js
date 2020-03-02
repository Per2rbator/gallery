import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  changePreviewStatus,
  acceptEdits,
  saveNewItem,
  setIdForEdit,
  editItemById
} from '../../actions'

import './preview.css'

export class Preview extends Component{

  state = {
    comment: ''
  }

  componentDidMount() {
    document.querySelector('.preview__comment-edit').focus()

    this.setState(() => ({
      comment: this.props.item.comment
    }))
  }

  onChange = e => {
    const value = e.target.value
    
    this.setState(() => ({
      comment: value
    }))
  }

  handleClick = e => {
    e.preventDefault()
    if (e.target.className === 'preview') this.props.onClose()
    if (e.key === 'Enter') this.acceptEdits()
  }
  
  acceptEdits = () => {
    const link = this.props.item.link
    const comment = this.state.comment

    if (this.props.editableId) {
      this.props.editItemById({
        id: this.props.editableId,
        comment: this.state.comment.trim()
      })
    } else {
      this.props.acceptEdits({ imgUrl: link, comment })
    }

    this.onClose()
  }

  onClose = () => {
    this.props.saveNewItem({})
    this.props.setIdForEdit()
    this.props.onClose()
  }

  render() {
    const { item } = this.props

    return (
      <div className="preview" onClick={ this.handleClick }>
        <div className="preview__box">
          <i
            className="material-icons preview__close"
            onClick={ this.onClose }
          >
            close
          </i>
          <p className="preview__heading">Preview</p>
          <div className="preview__data-wrapper">
            <div className="preview__image-wrapper">
              <img src={ item.link } alt="" className="preview__image"/>
            </div>
            <div className="preview__comment-section">
              <p className="preview__comment-heading">Can edit</p>
              <textarea
                className="preview__comment-edit"
                value={ this.state.comment }
                onChange={ this.onChange }
                onKeyUp={ this.handleClick}
              />
            </div>
          </div>
          <button
            className="preview__accept"
            onClick={ this.acceptEdits }
          >
            I agree
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ gallery }) => ({
  isVisible: gallery.preview.isVisible,
  item: gallery.form.newItem,
  editableId: gallery.editableItemId
})

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(changePreviewStatus(false)),
  acceptEdits: item => acceptEdits(item)(dispatch),
  saveNewItem: item => dispatch(saveNewItem(item)),
  setIdForEdit: () => dispatch(setIdForEdit(null)),
  editItemById: data => editItemById(data)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
