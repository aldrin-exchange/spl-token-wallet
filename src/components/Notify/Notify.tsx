/* eslint-disable default-case */
import { NotificationManager } from 'react-notifications'

const createNotification = (type) => () => {
  // eslint-disable-next-line no-console
  console.log('createNotification', type)
  switch (type) {
    case 'info':
      NotificationManager.info('Info message')
      break
    case 'success':
      NotificationManager.success('Success message', 'Title here')
      break
    case 'warning':
      NotificationManager.warning(
        'Warning message',
        'Close after 3000ms',
        3000,
      )
      break
    case 'error':
      NotificationManager.error('Error message', 'Click me!', 5000)
      break
  }
}

export default createNotification
