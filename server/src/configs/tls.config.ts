import { file } from "bun"

let _tls = {}
const mode = Bun.env.MODE || 'production'

if (mode !== 'production') {
    const cert = file("../ssl/localhost.pem")
    const key = file("../ssl/localhost-key.pem")
}
export const tlsConfig = {}