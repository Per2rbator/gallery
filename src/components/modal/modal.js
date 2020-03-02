import React from 'react'
import { connect } from 'react-redux'
import { imageModalToggle } from '../../actions'

import './modal.css'

export const Modal = ({ imageModal, closeModal }) => {

  const clickToOverlay = e => {
    if (e.target.className === 'image-modal') closeModal()
  }

  return imageModal.isVisible ? (
    <div className="image-modal" onClick={ e => clickToOverlay(e) }>
      <div className="image-modal__wrapper">
        <div className="image-modal__close">
          <i
            className="material-icons image-modal__close-button"
            onClick={ () => closeModal() }
          >
            close
          </i>
        </div>
        <div className="image-modal__image-wrapper">
          <img src={ imageModal.link } alt="" />
        </div>
      </div>
    </div>
  ) : null
}

const mapStateToProps = ({ gallery: { imageModal }}) => ({
  imageModal
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(imageModalToggle({
    link: '',
    isVisible: false
  }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)