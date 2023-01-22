import { Router, Request, Response } from 'express'
import { existsSync } from 'node:fs'

import { DIR_PATH, INPUT_FILE, isOriginalImgExist } from '../../utils/utilities'

const preview = Router()

preview.get('/', async (req: Request, res: Response) => {
  const filename = req.query.filename as string

  if (!filename)
    return res.status(400).send('Bad request, query parameter ( filename ) is required.')

  if (!isOriginalImgExist(filename) || !existsSync(INPUT_FILE(filename)))
    return res.status(404).send('Image does not exist!, try another filename')

  res.sendFile(`${DIR_PATH}/${filename}.jpg`)
})

export default preview
