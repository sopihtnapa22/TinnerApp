import Elysia from "elysia";

export const UserController = new Elysia({
    prefix: "/api/user",
    tags: ['User']
})
    .get('/all', () => {
        return {
            text: "Hello word"
        }
    }, {
        isSignIn: true
    })