import Elysia from "elysia";
import { AuthMiddleWere, AuthPayload } from "../middleweres/outh";
import { UserDto } from "../types/user.type";

export const LikeController = new Elysia({
    prefix: "api/like",
    tags: ['Like']
})

    .use(AuthMiddleWere)
    .use(UserDto)

    .put('/', ({ body: { target_id }, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            set.status = "No Content"
        } catch (error) {
            set.status = "Bad Request"
            throw error
        }
    }, {
        detail: { summary: "Toggle Like " },
        isSignIn: true,
        body: "target_id"
    })