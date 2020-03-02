import React from 'react'
import { connect } from 'react-redux'

import './preloader.css'

const Preloader = ({ isVisible }) => {

  return isVisible ? (
    <div className="preloader">
      <div className="lds-ripple">
        <div/>
        <div/>
      </div>
    </div>
  ) : null
}

const mapStateToProps = ({ gallery: { preloader }}) => ({
  isVisible: preloader.isVisible
})

export default connect(mapStateToProps)(Preloader)