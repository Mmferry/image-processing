import { Response } from 'express'
import sharp from 'sharp'
import { promises as fsPromises, existsSync, PathLike } from 'node:fs'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

import { images } from './data'

export interface ResizeImgProps {
  filename: string
  width: number
  height: number
  res: Response
}

export const DIR_PATH = `${path.resolve('./')}/src/images`
export const THUMB_PATH = `${DIR_PATH}/thumbnails`

export const INPUT_FILE = (filename: string): string => `${DIR_PATH}/${filename}.jpg`

export const removeDir = async () => {
  await fsPromises.rmdir(THUMB_PATH, { recursive: true })
}

export const makeDir = async () => {
  await fsPromises.mkdir(THUMB_PATH)
}

export const isOriginalImgExist = (filename: string): boolean => {
  return images.includes(filename)
}

export const errorHandler = (props: ResizeImgProps) => {
  if (!props.filename)
    return props.res.status(400).send('Bad request, query parameter ( filename ) is required.')

  if (!props.width)
    return props.res.status(400).send('Bad request, query parameter ( width ) is required.')

  if (!props.height)
    return props.res.status(400).send('Bad request, query parameter ( height ) is required.')

  if (
    props.width < 1 ||
    props.height < 1 ||
    typeof props.width == 'string' ||
    typeof props.height == 'string'
  )
    return props.res.status(400).send('Not valid inputs. must be numbers')

  if (!isOriginalImgExist(props.filename) || !existsSync(INPUT_FILE(props.filename)))
    return props.res.status(404).send('Image does not exist!, try another filename')
}

export const processImg = async (props: ResizeImgProps) => {
  await sharp(INPUT_FILE(props.filename))
    .resize(props.width, props.height)
    .toFile(`${THUMB_PATH}/${props.filename}_${props.width}_${props.height}.jpg`)
    .catch((err) => {
      return props.res.status(500).send('Something went wrong, please try later!')
    })
}

export const findFileByName = async (dir: PathLike, name: string): Promise<boolean> => {
  let matchedFile = false
  try {
    const files = await readdir(dir)

    for (const file of files) {
      const filename = path.parse(file).name

      if (filename === name) {
        matchedFile = true
      }
    }
  } catch (err) {
    console.error(err)
  }

  return matchedFile
}
