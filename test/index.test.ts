import { describe, expect, it } from 'vitest'
import mstRequestType from '../src/index'

describe('mst-request', () => {
  it('should init correctly', () => {
    const testRequest = mstRequestType.create()

    expect(testRequest.status).toEqual('init')
  })
})
