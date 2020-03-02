import React from 'react'
import { connect } from 'react-redux'

import './notification.css'

export const Notification = ({ notifications }) => {

  const notificationsList = notifications.length ?
    notifications.map(ntf => {
      let classList = ntf.isVisible ?
                      'notification notification_active' :
                      'notification'
      return (
        <li className={ classList } key={ ntf.id }>
          { ntf.message }
        </li>
      )
    }) : null

  return (
    <>
      <ul className="notifications">
        { notificationsList }
      </ul>
    </>
  )
}

const mapStateToProps = ({ notification: { notifications }}) => ({
  notifications
})

export default connect(mapStateToProps)(Notification)