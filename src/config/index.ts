import 'dotenv/config'
import { object, string, number } from 'yup'

const config = object({
  server: object({
    host: string().required(),
    port: number().required(),
  }),
}).validateSync({
  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
  },
})

export default config
