

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"compra":{"a":true,"fo":"float","h":"Compra","n":"compra","r":true,"sh":"Buy price","t":"`$NUMBER`","key$":"compra","index$":0},"fechaActualizacion":{"a":true,"fo":"date-time","h":"Fecha Actualizacion","n":"fechaActualizacion","r":true,"sh":"Last update timestamp","t":"`$STRING`","key$":"fechaActualizacion","index$":1},"nombre":{"a":true,"h":"Nombre","n":"nombre","r":true,"sh":"Name of the dollar type","t":"`$STRING`","key$":"nombre","index$":2},"venta":{"a":true,"fo":"float","h":"Venta","n":"venta","r":true,"sh":"Sell price","t":"`$NUMBER`","key$":"venta","index$":3}},"name":"dollar_quote","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /dolares","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/dolares","q":{},"r":{},"s":[{"lit":"dolares"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /dolares/{type}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"type","or":"type","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/dolares/{type}","q":{"exist":["type"]},"r":{},"s":[{"lit":"dolares"},{"var":"type"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"dollar_quote","name__orig":"dollar_quote","Name":"DollarQuote","name_":"dollar_quote","name-":"dollar-quote","NAME":"DOLLAR_QUOTE","index$":1}, {"active":true,"entity":"dollar_quote","key$":"BasicDollarQuoteFlow","kind":"basic","name":"BasicDollarQuoteFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"dollar_quote_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"dollar_quote_ref01","srcdatavar":"dollar_quote_ref01_data","suffix":"_dt0"},"m":{"id":"dollar_quote01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-dollar_quote_ref01"}}],"index$":1}]}, 'DollarQuote', {"GET /dolares":{"protocol":"http","operationId":"getAllDollarQuotes","responses":{"200":{"description":"Successful response with all dollar quotations","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"nombre":{"type":"string","description":"Name of the dollar type","example":"Dólar Blue","key$":"nombre"},"compra":{"type":"number","format":"float","description":"Buy price","example":365.5,"key$":"compra"},"venta":{"type":"number","format":"float","description":"Sell price","example":385.5,"key$":"venta"},"fechaActualizacion":{"type":"string","format":"date-time","description":"Last update timestamp","example":"2024-01-15T10:30:00Z","key$":"fechaActualizacion"}},"required":["nombre","compra","venta","fechaActualizacion"],"x-ref":"#/components/schemas/DollarQuote","index$":0}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"detail":{"type":"string","description":"Error message","example":"Resource not found"}},"required":["detail"],"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /dolares/{type}":{"protocol":"http","operationId":"getDollarQuoteByType","responses":{"200":{"description":"Successful response with specific dollar quotation","content":{"application/json":{"schema":{"type":"object","properties":{"nombre":{"type":"string","description":"Name of the dollar type","example":"Dólar Blue","key$":"nombre"},"compra":{"type":"number","format":"float","description":"Buy price","example":365.5,"key$":"compra"},"venta":{"type":"number","format":"float","description":"Sell price","example":385.5,"key$":"venta"},"fechaActualizacion":{"type":"string","format":"date-time","description":"Last update timestamp","example":"2024-01-15T10:30:00Z","key$":"fechaActualizacion"}},"required":["nombre","compra","venta","fechaActualizacion"],"x-ref":"#/components/schemas/DollarQuote","index$":0}}}},"404":{"description":"Dollar quotation type not found","content":{"application/json":{"schema":{"type":"object","properties":{"detail":{"type":"string","description":"Error message","example":"Resource not found"}},"required":["detail"],"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"detail":{"type":"string","description":"Error message","example":"Resource not found"}},"required":["detail"],"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"type","in":"path","required":true,"description":"Type of dollar quotation (oficial, blue, mep, ccl, tarjeta, mayorista, cripto)","schema":{"type":"string","enum":["oficial","blue","mep","ccl","tarjeta","mayorista","cripto"]},"index$":0}],"securitySource":"unspecified"}})
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
    ['dollar_quote01','dollar_quote02','dollar_quote03'],
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
  
