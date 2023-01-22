import { Router, Request, Response } from 'express'
import preview from './api/preview'
import resize from './api/resize'

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
  res.send(
    'Welcome to IMAGI 🌍 - check our services in two different ways The first, as a simple image previewer, the second via resizing image.'
  )
})

routes.use('/resize', resize)
routes.use('/preview', preview)

export default routes
