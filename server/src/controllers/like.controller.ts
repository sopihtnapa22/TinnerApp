import Elysia from "elysia"
import { AuthMiddleWere, AuthPayload } from "../middleweres/outh"
import { UserDto } from "../types/user.type"
import { PhotoDto } from "../types/photo.type"
import { LikeService } from "../services/like.service"

export const LikeController = new Elysia({
    prefix: "api/like",
    tags: ['Like']
})
    .use(AuthMiddleWere)
    .use(UserDto)

    .put('/', async ({ body: { target_id }, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await LikeService.toggleLike(user_id, target_id)
            set.status = "No Content"
        } catch (error) {
            set.status = "Bad Request"
            throw error
        }
    }, {
        detail: { summary: "Toggle Like" },
        isSignIn: true,
        body: "target_id"
    })

    .get('/followers', async ({ Auth, query }) => {
        const user_id = (Auth.payload as AuthPayload).id
        const user_pagination = await LikeService.getFollowers(user_id, query)
        return user_pagination
    }, {
        detail: { summary: "Get Followers" },
        isSignIn: true,
        query: "pagination",
        response: "users"
    })

    .get('/following', async ({ Auth, query }) => {
        const user_id = (Auth.payload as AuthPayload).id
        const user_pagination = await LikeService.getFollowing(user_id, query)
        return user_pagination
    }, {
        detail: { summary: "Get Following" },
        isSignIn: true,
        query: "pagination",
        response: "users"
    })