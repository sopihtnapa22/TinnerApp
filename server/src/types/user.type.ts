import Elysia, { t, Static } from "elysia"
import { _register } from "./register.type"
import { _pagination, CreatePagination } from "./pagination.type"
import { _photo } from "./photo.type"

export const _profile = t.Object({
    ...t.Omit(_register, ['password']).properties,
    id: t.String(),
    _introduction: t.Optional(t.String()),
    get introduction() {
        return this._introduction
    },
    set introduction(value) {
        this._introduction = value
    },
    interest: t.Optional(t.String()),
    location: t.Optional(t.String()),
    age: t.Optional(t.String()),
    last_active: t.Optional(t.Date()),
    created_at: t.Optional(t.Date()),
    updated_at: t.Optional(t.Date()),
    photos: t.Optional(t.Array(_photo))

    //todo: implement upload feature
    //photos: photo_id[]
})

export const _user = t.Object({
    ..._profile.properties,
    //todo:implement like feature
    followers: t.Optional(t.Array(t.Union([t.Partial(_profile), t.String()]))),
    following: t.Optional(t.Array(t.Union([t.Partial(_profile), t.String()]))),
})
// export const _user = t.Object({
//     ..._profile.properties,
//     followers: t.Optional(t.Array(t.Union(([t.Partial(_profile).t.String()])))),
//     following: t.Optional(t.Array(t.Union(([t.Partial(_profile).t.String()])))),


// })

const _userPagination = t.Object({
    ..._pagination.properties,
    username: t.Optional(t.String()),
    min_age: t.Optional(t.Number()),
    max_age: t.Optional(t.Number()),
    looking_for: t.Optional(t.Union([t.Literal('male'), t.Literal('femal'), t.Literal('all')])),
    gender: t.Optional(t.Union([t.Literal('male'), t.Literal('femal'), t.Literal('all')]))
})
export const _userPaginator = CreatePagination(_user, _userPagination)
export const _updateProfile = t.Omit(_profile, ['id', 'username', 'updated_at', 'created_at', 'last_active',])

export const UserDto = new Elysia().model({
    pagination: t.Optional(_userPagination),
    _updateProfile: _updateProfile,
    users: _userPaginator,
    user: _user,
    target_id: t.Object({ target_id: t.String() }),
})

export type user = Static<typeof _user>
export type userPaginator = Static<typeof _userPaginator>
export type userPagination = Static<typeof _userPagination>
export type _updateProfile = Static<typeof _updateProfile>