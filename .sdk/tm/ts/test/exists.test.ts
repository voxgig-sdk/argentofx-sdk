
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ArgentofxSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ArgentofxSDK.test()
    equal(testsdk instanceof ArgentofxSDK, true,
      'ArgentofxSDK.test() must return a client synchronously')
  })

})
