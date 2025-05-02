import user from './user'
import auth from './auth'
import location from './location'
import schedule from './schedule'
import booking from './booking'
import seat from './seat'

import { internalServerError, notFoundRoute } from '../middlewears/handle_error'

const initRoutes = (app) => {
    app.use('/api/user', user)
    app.use('/api/auth', auth)
    app.use('/api/location', location)
    app.use('/api/schedule', schedule)
    app.use('/api/booking', booking)
    app.use('/api/seat', seat)

    app.use(notFoundRoute)
}

module.exports = initRoutes