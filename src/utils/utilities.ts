import sharp from 'sharp'
import { promises as fsPromises, existsSync, PathLike } from 'node:fs'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

import { images } from './data'

export interface ResizeImgProps {
  filename: string
  width: number
  height: number
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

export const isFileExist = (path: PathLike) => {
  return existsSync(path)
}

export const processImg = async (props: ResizeImgProps) => {
  await sharp(INPUT_FILE(props.filename))
    .resize(props.width, props.height)
    .toFile(`${THUMB_PATH}/${props.filename}_${props.width}_${props.height}.jpg`)
    .catch((err) => {
      throw new Error(err)
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
