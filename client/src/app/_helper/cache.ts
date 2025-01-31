import { User } from "../_models/user"
import { parseUserPhoto } from "./helper"
import { Paginator, UserQueryPagination } from "./pagination"
const data = new Map()
type cacheOpt = 'members' | 'chat' | 'followers' | 'following'
type cacheValue = Paginator<UserQueryPagination, User>

export const cacheManager = {
    createKey: function <T extends { [key: string]: any }>(query: T) {
        return Object.values(query).join('-')
    },
    load: function (key: string, opt: cacheOpt): cacheValue | undefined {
        return data.get(opt + key)

    },

    save: function (key: string, opt: cacheOpt, value: cacheValue) {
        if (opt === 'chat')
            value.items = value.items.map(u => parseUserPhoto(u))
        data.set(opt + key, value)
    },
    clear: function (opt: cacheOpt | 'all') {
        if (opt === 'all')
            data.clear()
        else
            for (const key of data.keys()) {
                if (key.startWiith(opt))
                    data.delete(key)
            }
    },
}