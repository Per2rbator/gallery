import React, { Component } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { connect } from 'react-redux'
import {
  applyChanges,
  deleteItem,
  saveNewItem,
  setIdForEdit,
  changePreviewStatus,
  imageModalToggle
} from '../../actions'

import './gallery.css'

export class Gallery extends Component {

  applyChanges = newState => this.props.applyChanges(newState)

  editComment = item => {
    this.props.setIdForEdit(item.id)
    this.props.saveNewItem({ link: item.imgUrl, comment: item.comment })
    this.props.openPreview()
  }

  render() {
    return this.props.items.length ? (
      <ReactSortable
        className="gallery"
        list={ this.props.items }
        setList={ this.applyChanges }
        animation={500}
        delayOnTouchStart={true}
        delay={2}
      >
        { this.props.items.map(item => (
          <div className="g-item" key={ item.id }>
            <div className="g-item__image-wrapper">
              <i
                className="g-item__delete material-icons"
                onClick={ () => this.props.deleteItem(item.id) }
              >
                close
              </i>
              <img
                className="g-item__image" src={ item.imgUrl } alt=""
                onClick={ () => this.props.openModal(item.imgUrl)}
              />
            </div>
            <div className="g-item__comment">
              <div className="g-item__comment-edit">
                <span>Comment:</span>
                <i
                  className="material-icons g-item__edit"
                  title="Edit comment"
                  onClick={ () => this.editComment(item) }
                > 
                  edit
                </i>
              </div>
              <p className="g-item__comment-text">
                { item.comment.length ? item.comment : 'no comments yet' }
              </p>
            </div>
          </div>
        ))}
      </ReactSortable>
    ) : (
      <div className="gallery_no-photos">
        You have no photos yet. To add, click on the button in the upper right.
      </div>
    )
  }
}

const mapStateToProps = ({ gallery: { items }}) => ({
  items
})

const mapDispatchToProps = dispatch => ({
  applyChanges: items => applyChanges(items)(dispatch),
  deleteItem: id => deleteItem(id)(dispatch),
  saveNewItem: item => dispatch(saveNewItem(item)),
  setIdForEdit: id => dispatch(setIdForEdit(id)),
  openPreview: () => dispatch(changePreviewStatus(true)),
  openModal: imageLink => dispatch(imageModalToggle({
    link: imageLink,
    isVisible: true
  }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
