import { notAuth } from "./handle_error"

export const isAdmin = (req, res, next) => {
    const {roleCode} = req.user.role_code
    if (roleCode !== 'R1') return notAuth('Required Admin', res)
    next()
}