import { Static, t, TSchema } from "elysia"
export const _pagination = t.Object({
    size: t.Number(),
    currentPage: t.Number(),
    length: t.Optional(t.Number()),
})
export type paginator = Static<typeof _pagination>
export function CreatePagination<T extends TSchema, U extends TSchema>(itemType: T, paginator: U) {
    return t.Object({
        item: t.Array(itemType),
        paginator: paginatorType
    })
}