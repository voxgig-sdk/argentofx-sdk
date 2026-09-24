

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ArgentofxSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetRootEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ARGENTOFX_TEST_LIVE=TRUE.
  afterEach(liveDelay('ARGENTOFX_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ArgentofxSDK.test()
    const ent = testsdk.GetRoot()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ARGENTOFX_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_root.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"documentation":{"a":true,"h":"Documentation","n":"documentation","r":false,"t":"`$STRING`","key$":"documentation","index$":0},"message":{"a":true,"h":"Message","n":"message","r":false,"t":"`$STRING`","key$":"message","index$":1}},"name":"get_root","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/","q":{},"r":{},"s":[],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_root","name__orig":"get_root","Name":"GetRoot","name_":"get_root","name-":"get-root","NAME":"GET_ROOT","index$":2}, {"active":true,"entity":"get_root","key$":"BasicGetRootFlow","kind":"basic","name":"BasicGetRootFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"get_root_ref01","srcdatavar":"get_root_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_root_ref01"}}],"index$":0}]}, 'GetRoot', {"GET /":{"protocol":"http","operationId":"getRoot","responses":{"200":{"description":"Successful response with API information","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"example":"Welcome to ArgentoFX API","key$":"message","type":"string"},"documentation":{"example":"/docs","key$":"documentation","type":"string"}},"index$":0}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_root_ref01_data = Object.values(setup.data.existing.get_root)[0] as any

    // LOAD
    const get_root_ref01_ent = client.GetRoot()
    const get_root_ref01_match_dt0: any = {}
    const get_root_ref01_data_dt0 = (await get_root_ref01_ent.load(get_root_ref01_match_dt0)).data()
    assert(null != get_root_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_root/GetRootTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ArgentofxSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_root01','get_root02','get_root03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ARGENTOFX_TEST_GET_ROOT_ENTID': idmap,
    'ARGENTOFX_TEST_LIVE': 'FALSE',
    'ARGENTOFX_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ARGENTOFX_TEST_GET_ROOT_ENTID']

  const live = 'TRUE' === env.ARGENTOFX_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ARGENTOFX_TEST_GET_ROOT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ArgentofxSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.ARGENTOFX_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
