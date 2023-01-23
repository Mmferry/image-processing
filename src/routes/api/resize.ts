import { Router, Request, Response } from 'express'
import { findFileByName, isFileExist, makeDir, processImg, THUMB_PATH } from '../../utils/utilities'

const resize = Router()

resize.get('/', async (req: Request, res: Response) => {
  const filename = req.query.filename as string
  const width = +req.query.width!
  const height = +req.query.height!
  const thumbImgName = `${filename}_${width}_${height}`

  !isFileExist(THUMB_PATH) && makeDir()

  const isFileExists = await findFileByName(THUMB_PATH, thumbImgName)

  try {
    !isFileExists && (await processImg({ filename, width, height }))
  } catch (err) {
    return res.status(500).send('Something went wrong, please try later!')
  }

  return res.sendFile(`${THUMB_PATH}/${thumbImgName}.jpg`)
})

export default resize
