import Elysia, { Static, t } from "elysia"
import { _user } from "./user.type"
import { _register } from "./register.type"


export const _login = t.Object({
    username: t.String(),
    password: t.String()
})


export const _userAndtoken = t.Object({
    user: _user,
    token: t.String()
})

export const AccountDto = new Elysia().model({
    register: _register,
    login: _login,

    account: _userAndtoken
})

export type register = Static<typeof _register>
export type login = Static<typeof _login>