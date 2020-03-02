import React from 'react'
import { connect } from 'react-redux'
import { changeFormVisibility } from '../../actions'

import './app-header.css'

const AppHeader = ({ openForm }) => {

  return (
    <header className="header">
      <div className="header__logo">
        Sky Gallery
      </div>
      <button className="header__add-new" onClick={ openForm }>
        <i className="material-icons">add</i>
        <span>Add New</span>
      </button>
    </header>
  )
}

const mapDispatchToProps = (dispatch) => ({
  openForm: () => dispatch(changeFormVisibility(true))
})

export default connect(null, mapDispatchToProps)(AppHeader)