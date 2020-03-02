import React from 'react'
import AppHeader from '../app-header'
import Gallery from '../gallery'
import AddForm from '../add-form'
import Notification from '../notification'
import Preview from '../preview'
import Preloader from '../preloader'
import Modal from '../modal'
import { connect } from 'react-redux'

import './app.css'

const App = ({ isPreviewVisible }) => {

  return (
    <>
      <AppHeader />
      <div className="container">
        <Gallery />
      </div>
      <AddForm />
      <Notification />
      { isPreviewVisible ? <Preview /> : null }
      <Preloader />
      <Modal />
    </>
  )
}

const mapStateToProps = ({ gallery }) => ({
  isPreviewVisible: gallery.preview.isVisible
})

export default connect(mapStateToProps)(App)