

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('DollarQuoteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ARGENTOFX_TEST_LIVE=TRUE.
  afterEach(liveDelay('ARGENTOFX_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ArgentofxSDK.test()
    const ent = testsdk.DollarQuote()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ARGENTOFX_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dollar_quote.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"float","name":"compra","req":true,"short":"Buy price","type":"`$NUMBER`","index$":0},{"active":true,"format":"date-time","name":"fechaActualizacion","req":true,"short":"Last update timestamp","type":"`$STRING`","index$":1},{"active":true,"name":"nombre","req":true,"short":"Name of the dollar type","type":"`$STRING`","index$":2},{"active":true,"format":"float","name":"venta","req":true,"short":"Sell price","type":"`$NUMBER`","index$":3}],"name":"dollar_quote","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /dolares","json":"{\"operationId\":\"getAllDollarQuotes\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"compra\":{\"description\":\"Buy price\",\"example\":365.5,\"format\":\"float\",\"type\":\"number\"},\"fechaActualizacion\":{\"description\":\"Last update timestamp\",\"example\":\"2024-01-15T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"nombre\":{\"description\":\"Name of the dollar type\",\"example\":\"Dólar Blue\",\"type\":\"string\"},\"venta\":{\"description\":\"Sell price\",\"example\":385.5,\"format\":\"float\",\"type\":\"number\"}},\"required\":[\"nombre\",\"compra\",\"venta\",\"fechaActualizacion\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with all dollar quotations\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"Error message\",\"example\":\"Resource not found\",\"type\":\"string\"}},\"required\":[\"detail\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/dolares","segments":[{"lit":"dolares"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"type","orig":"type","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /dolares/{type}","json":"{\"operationId\":\"getDollarQuoteByType\",\"parameters\":[{\"description\":\"Type of dollar quotation (oficial, blue, mep, ccl, tarjeta, mayorista, cripto)\",\"in\":\"path\",\"name\":\"type\",\"required\":true,\"schema\":{\"enum\":[\"oficial\",\"blue\",\"mep\",\"ccl\",\"tarjeta\",\"mayorista\",\"cripto\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"compra\":{\"description\":\"Buy price\",\"example\":365.5,\"format\":\"float\",\"type\":\"number\"},\"fechaActualizacion\":{\"description\":\"Last update timestamp\",\"example\":\"2024-01-15T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"nombre\":{\"description\":\"Name of the dollar type\",\"example\":\"Dólar Blue\",\"type\":\"string\"},\"venta\":{\"description\":\"Sell price\",\"example\":385.5,\"format\":\"float\",\"type\":\"number\"}},\"required\":[\"nombre\",\"compra\",\"venta\",\"fechaActualizacion\"],\"type\":\"object\"}}},\"description\":\"Successful response with specific dollar quotation\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"Error message\",\"example\":\"Resource not found\",\"type\":\"string\"}},\"required\":[\"detail\"],\"type\":\"object\"}}},\"description\":\"Dollar quotation type not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"Error message\",\"example\":\"Resource not found\",\"type\":\"string\"}},\"required\":[\"detail\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/dolares/{type}","segments":[{"lit":"dolares"},{"var":"type"}],"select":{"exist":["type"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["dolare"]]},"key$":"dollar_quote","name__orig":"dollar_quote","Name":"DollarQuote","name_":"dollar_quote","name-":"dollar-quote","NAME":"DOLLAR_QUOTE","index$":1}, {"active":true,"entity":"dollar_quote","key$":"BasicDollarQuoteFlow","kind":"basic","name":"BasicDollarQuoteFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"dollar_quote_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"dollar_quote_ref01","srcdatavar":"dollar_quote_ref01_data","suffix":"_dt0"},"match":{"id":"dollar_quote01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-dollar_quote_ref01"}}],"index$":1}]}, 'DollarQuote')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let dollar_quote_ref01_data = Object.values(setup.data.existing.dollar_quote)[0] as any

    // LIST
    const dollar_quote_ref01_ent = client.DollarQuote()
    const dollar_quote_ref01_match: any = {}

    const dollar_quote_ref01_list = (await dollar_quote_ref01_ent.list(dollar_quote_ref01_match)).map((e: any) => e.data())



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/dollar_quote/DollarQuoteTestData.json')

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
    ['dollar_quote01','dollar_quote02','dollar_quote03','dolare01','dolare02','dolare03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ARGENTOFX_TEST_DOLLAR_QUOTE_ENTID': idmap,
    'ARGENTOFX_TEST_LIVE': 'FALSE',
    'ARGENTOFX_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ARGENTOFX_TEST_DOLLAR_QUOTE_ENTID']

  const live = 'TRUE' === env.ARGENTOFX_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ARGENTOFX_TEST_DOLLAR_QUOTE_ENTID']
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
  
