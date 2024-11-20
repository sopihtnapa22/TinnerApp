import Elysia, { t } from "elysia"

export const example = new Elysia()
    .get("/", () => "Hello World", {
        detail: {
            tags: ["Example"],
            summary: "Get Hello World",
            deprecation: "bla bla bla"
        }
    })
    .post("/about/", ({ body }) => {
        return {
            id: 'xxx',
            name: 'hello' + body.name
        }
    }, {
        body: t.Object({
            name: t.String()
        })
        , detail: {
            tags: ["Example"],
            summary: "Get Hello World",
            deprecation: "bla bla bla"
        }
    })

