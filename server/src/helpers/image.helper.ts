
import { fileTypeFromBuffer } from 'file-type';

const acceptFileTypes = ['image/jpeg', 'image/png']

export const ImageHelper = {
    isImage: async function (fileArrayBuffer: ArrayBuffer): Promise<boolean> {
        //const buffer = await file.arrayBuffer()
        const fileTypeResault = await fileTypeFromBuffer(fileArrayBuffer)
        if (fileTypeResault == undefined)
            return false
        return acceptFileTypes.includes(fileTypeResault.mime)

    }
}