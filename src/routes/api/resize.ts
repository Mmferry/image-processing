import { Router, Request, Response } from 'express'
import { existsSync } from 'node:fs'
import {
  errorHandler,
  findFileByName,
  makeDir,
  processImg,
  THUMB_PATH
} from '../../utils/utilities'

const resize = Router()

resize.get('/', async (req: Request, res: Response) => {
  const filename = req.query.filename as string
  const width = +req.query.width!
  const height = +req.query.height!
  const thumbImgName = `${filename}_${width}_${height}`

  errorHandler({ filename, width, height, res })

  !existsSync(THUMB_PATH) && makeDir()

  const isFileExists = await findFileByName(THUMB_PATH, thumbImgName)

  !isFileExists && (await processImg({ filename, width, height, res }))

  return res.sendFile(`${THUMB_PATH}/${thumbImgName}.jpg`)
})

export default resize
