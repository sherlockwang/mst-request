import { describe, expect, it } from 'vitest'
import mstRequest from '../src/index'

describe('mst-request', () => {
  it('should init correctly', () => {
    const testRequest = mstRequest.create()

    expect(testRequest.status).toEqual('init')
  })
})
