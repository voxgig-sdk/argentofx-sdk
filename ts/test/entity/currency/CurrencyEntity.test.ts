

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


describe('CurrencyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ARGENTOFX_TEST_LIVE=TRUE.
  afterEach(liveDelay('ARGENTOFX_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ArgentofxSDK.test()
    const ent = testsdk.Currency()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ARGENTOFX_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'currency.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"compra":{"a":true,"fo":"float","h":"Compra","n":"compra","r":true,"sh":"Buy price","t":"`$NUMBER`","key$":"compra","index$":0},"fechaActualizacion":{"a":true,"fo":"date-time","h":"Fecha Actualizacion","n":"fechaActualizacion","r":true,"sh":"Last update timestamp","t":"`$STRING`","key$":"fechaActualizacion","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"moneda":{"a":true,"h":"Moneda","n":"moneda","r":true,"sh":"Currency code","t":"`$STRING`","key$":"moneda","index$":3},"nombre":{"a":true,"h":"Nombre","n":"nombre","r":true,"sh":"Currency name","t":"`$STRING`","key$":"nombre","index$":4},"venta":{"a":true,"fo":"float","h":"Venta","n":"venta","r":true,"sh":"Sell price","t":"`$NUMBER`","key$":"venta","index$":5}},"id":{"field":"id","name":"id"},"name":"currency","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /currencies","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/currencies","q":{},"r":{},"s":[{"lit":"currencies"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /currencies/{currency}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"EUR","k":"param","n":"id","or":"currency","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/currencies/{currency}","q":{"exist":["id"]},"r":{"param":{"currency":"id"}},"s":[{"lit":"currencies"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"currency","name__orig":"currency","Name":"Currency","name_":"currency","name-":"currency","NAME":"CURRENCY","index$":0}, {"active":true,"entity":"currency","key$":"BasicCurrencyFlow","kind":"basic","name":"BasicCurrencyFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"currency_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"currency_ref01","srcdatavar":"currency_ref01_data","suffix":"_dt0"},"m":{"id":"currency01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-currency_ref01"}}],"index$":1}]}, 'Currency', {"GET /currencies":{"protocol":"http","operationId":"getAllCurrencies","responses":{"200":{"description":"Successful response with all currency quotations","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"moneda":{"type":"string","description":"Currency code","example":"EUR","key$":"moneda"},"nombre":{"type":"string","description":"Currency name","example":"Euro","key$":"nombre"},"compra":{"type":"number","format":"float","description":"Buy price","example":395.25,"key$":"compra"},"venta":{"type":"number","format":"float","description":"Sell price","example":415.75,"key$":"venta"},"fechaActualizacion":{"type":"string","format":"date-time","description":"Last update timestamp","example":"2024-01-15T10:30:00Z","key$":"fechaActualizacion"}},"required":["moneda","nombre","compra","venta","fechaActualizacion"],"x-ref":"#/components/schemas/CurrencyQuote","index$":0}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"detail":{"type":"string","description":"Error message","example":"Resource not found"}},"required":["detail"],"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /currencies/{currency}":{"protocol":"http","operationId":"getCurrencyQuote","responses":{"200":{"description":"Successful response with specific currency quotation","content":{"application/json":{"schema":{"type":"object","properties":{"moneda":{"type":"string","description":"Currency code","example":"EUR","key$":"moneda"},"nombre":{"type":"string","description":"Currency name","example":"Euro","key$":"nombre"},"compra":{"type":"number","format":"float","description":"Buy price","example":395.25,"key$":"compra"},"venta":{"type":"number","format":"float","description":"Sell price","example":415.75,"key$":"venta"},"fechaActualizacion":{"type":"string","format":"date-time","description":"Last update timestamp","example":"2024-01-15T10:30:00Z","key$":"fechaActualizacion"}},"required":["moneda","nombre","compra","venta","fechaActualizacion"],"x-ref":"#/components/schemas/CurrencyQuote","index$":0}}}},"404":{"description":"Currency not found","content":{"application/json":{"schema":{"type":"object","properties":{"detail":{"type":"string","description":"Error message","example":"Resource not found"}},"required":["detail"],"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"detail":{"type":"string","description":"Error message","example":"Resource not found"}},"required":["detail"],"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"currency","in":"path","required":true,"description":"Currency code (e.g., EUR, BRL, CLP, UYU)","schema":{"type":"string","example":"EUR"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let currency_ref01_data = Object.values(setup.data.existing.currency)[0] as any

    // LIST
    const currency_ref01_ent = client.Currency()
    const currency_ref01_match: any = {}

    const currency_ref01_list = (await currency_ref01_ent.list(currency_ref01_match)).map((e: any) => e.data())


    // LOAD
    const currency_ref01_match_dt0: any = {}
    currency_ref01_match_dt0.id = currency_ref01_data.id
    const currency_ref01_data_dt0 = (await currency_ref01_ent.load(currency_ref01_match_dt0)).data()
    assert(currency_ref01_data_dt0.id === currency_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/currency/CurrencyTestData.json')

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
    ['currency01','currency02','currency03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ARGENTOFX_TEST_CURRENCY_ENTID': idmap,
    'ARGENTOFX_TEST_LIVE': 'FALSE',
    'ARGENTOFX_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ARGENTOFX_TEST_CURRENCY_ENTID']

  const live = 'TRUE' === env.ARGENTOFX_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ARGENTOFX_TEST_CURRENCY_ENTID']
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
  
