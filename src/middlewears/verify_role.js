import { notAuth } from "./handle_error"

export const isAdmin = (req, res, next) => {
    console.log(req.user)
    const roleCode = req.user.role_code
    console.log(roleCode)
    if (roleCode !== 'R1') return notAuth('Required Admin', res)
    next()
}