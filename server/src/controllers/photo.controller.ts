import Elysia, { error, t } from "elysia";
import { ImageHelper } from "../helpers/image.helper";
import { PhotoDto } from "../types/photo.type";
import { AuthMiddleWere, AuthPayload } from "../middleweres/outh";
import { PhotoService } from "../services/photo.service";

//const _imageDB: { id: string, data: string, type: string }[] = []

export const PhotoController = new Elysia({
    prefix: "api/photo",
    tags: ['Photo']
})
    .use(PhotoDto)
    .use(AuthMiddleWere)
    .post('/', async ({ body: { file }, set, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        try {
            return await PhotoService.upload(file, user_id)
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw error
            throw new Error("Something went wrong,try again later!!")
        }
    }, {
        detail: { summary: "Upload Photo" },
        body: "upload",
        response: "photo",
        isSignIn: true
    })
