import Elysia from "elysia";
import { UserDto } from "../types/user.type";
import { AuthMiddleWere, AuthPayload } from "../middleweres/outh";
import { UserService } from "../services/user.service";

export const UserController = new Elysia({
    prefix: "/api/user",
    tags: ['User']
})
    .use(UserDto)
    .use(AuthMiddleWere)

    .get('/all', () => {
        return {
            text: "Hello word"
        }
    }, {
        isSignIn: true
    })
    .get('/', ({ query, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        return UserService.get(query, user_id)
    }, {
        detail: { summary: "Get User" },
        query: "pagination",
        response: "users",
        isSignIn: true,
    })

    .patch('/', async ({ body, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await UserService.updateProfile(body, user_id)
            set.status = "No Content"

        }
        catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw new Error(error.message)
            set.status = "Internal Server Error"
            throw new Error("Somthing went wrong, try again later")
        }
    }, {
        detail: { summary: "Update Profile" },
        body: "_updateProfile",
        // response: "user",
        isSignIn: true,

    })