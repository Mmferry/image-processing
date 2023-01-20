import { Router, Request, Response } from 'express';
import sharp from 'sharp';
import path from 'node:path';
import { promises as fsPromises, existsSync } from 'node:fs';

import { images } from '../../utils/data';

interface ResizeImgProps {
  filename: string;
  width: number;
  height: number;
  res: Response;
}

const resize = Router();
const DIR_PATH = `${path.resolve('./')}/images`;
const THUMB_PATH = `${DIR_PATH}/thumbnails`;
const INPUT_FILE = (filename: string): string => `${DIR_PATH}/${filename}.jpg`;

const makeDir = async () => {
  await fsPromises.mkdir('images/thumbnails');
};

const resizeImg = (props: ResizeImgProps) => {
  sharp(INPUT_FILE(props.filename))
    .resize(props.width, props.height)
    .toFile(
      `${THUMB_PATH}/${props.filename}_${props.width}_${props.height}.jpg`,
      (err, info) => {
        if (err) {
          return props.res
            .status(500)
            .send('Something went wrong, please try later!');
        }

        return props.res.sendFile(
          `${THUMB_PATH}/${props.filename}_${props.width}_${props.height}.jpg`
        );
      }
    );
};

const isOriginalImgExist = (filename: string): boolean => {
  return images.includes(filename);
};

const errorHandler = (props: ResizeImgProps) => {
  if (!props.filename)
    return props.res
      .status(400)
      .send('<p>Bad request, query parameter ( filename ) is required.</p>');

  if (!props.width)
    return props.res
      .status(400)
      .send('<p>Bad request, query parameter ( width ) is required.</p>');

  if (!props.height)
    return props.res
      .status(400)
      .send('<p>Bad request, query parameter ( height ) is required.</p>');

  if (
    !isOriginalImgExist(props.filename) ||
    !existsSync(INPUT_FILE(props.filename))
  )
    return props.res
      .status(404)
      .send('Image does not exist!, try another filename');
};

resize.get('/', (req: Request, res: Response) => {
  const filename = req.query.filename as string;
  const width = +req.query.width!;
  const height = +req.query.height!;

  errorHandler({ filename, width, height, res });

  !existsSync(THUMB_PATH) && makeDir();

  resizeImg({ filename, width, height, res });
});

export default resize;
