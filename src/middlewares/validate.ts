import { Request, Response, NextFunction } from 'express'
import { INPUT_FILE, isFileExist, isOriginalImgExist } from '../utils/utilities'

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const filename = req.query.filename as string
  const width = +req.query.width!
  const height = +req.query.height!

  if (!filename)
    return res.status(400).send('Bad request, query parameter ( filename ) is required.')

  if (!width) return res.status(400).send('Bad request, query parameter ( width ) is required.')

  if (!height) return res.status(400).send('Bad request, query parameter ( height ) is required.')

  if (width < 1 || height < 1 || typeof width == 'string' || typeof height == 'string')
    return res.status(400).send('Not valid inputs. must be numbers')

  if (!isOriginalImgExist(filename) || !isFileExist(INPUT_FILE(filename)))
    return res.status(404).send('Image does not exist!, try another filename')

  next()
}
