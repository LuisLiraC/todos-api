import { App } from './app'
import { config } from './config'

const main = async () => {
  const app = new App(config.port)
  await app.listen()
}

main()