import user from './user'
import auth from './auth'
import { internalServerError, notFoundRoute } from '../middlewears/handle_error'

const initRoutes = (app) => {
    app.use('/api/user', user)
    app.use('/api/auth', auth)

    app.use(notFoundRoute)
}

module.exports = initRoutes