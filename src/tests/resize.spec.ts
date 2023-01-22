import { isFileExist, makeDir, removeDir } from './../utils/utilities'
import supertest from 'supertest'
import fs from 'node:fs'
import app from '../index'
import { THUMB_PATH } from '../utils/utilities'

const request = supertest(app)

describe('Testing the resize endpoint response', () => {
  const width = 200 as number
  const height = 200 as number

  beforeAll(async () => {
    await removeDir()
    await makeDir()
  })

  it('Using the endpoint with a valid parameters and filename returns 200', async () => {
    if (isFileExist(`${THUMB_PATH}/fjord_${width}_${height}.jpg`)) {
      await fs.unlinkSync(`${THUMB_PATH}/fjord_${width}_${height}.jpg`)
    }

    const response = await request.get(`/resize/?filename=fjord&width=${+width}&height=${+height}`)

    expect(response.status).toBe(200)
  })

  it('Should found the image in thumbnails dir by second time', () => {
    expect(isFileExist(`${THUMB_PATH}/fjord_200_200.jpg`)).toBeTruthy()
  })

  it('Should not found the image in thumbnails dir by first time', () => {
    expect(isFileExist(`${THUMB_PATH}/fjord_800_800.jpg`)).toBeFalsy()
  })

  it('Using the endpoint without providing the filename parameter returns 400', async () => {
    const response = await request.get('/resize')

    expect(response.status).toBe(400)
  })
})
