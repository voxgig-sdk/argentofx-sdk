"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('DollarQuoteEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ARGENTOFX_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ARGENTOFX_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ArgentofxSDK.test();
        const ent = testsdk.DollarQuote();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ARGENTOFX_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'dollar_quote.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "compra": { "a": true, "fo": "float", "h": "Compra", "n": "compra", "r": true, "sh": "Buy price", "t": "`$NUMBER`", "key$": "compra", "index$": 0 }, "fechaActualizacion": { "a": true, "fo": "date-time", "h": "Fecha Actualizacion", "n": "fechaActualizacion", "r": true, "sh": "Last update timestamp", "t": "`$STRING`", "key$": "fechaActualizacion", "index$": 1 }, "nombre": { "a": true, "h": "Nombre", "n": "nombre", "r": true, "sh": "Name of the dollar type", "t": "`$STRING`", "key$": "nombre", "index$": 2 }, "venta": { "a": true, "fo": "float", "h": "Venta", "n": "venta", "r": true, "sh": "Sell price", "t": "`$NUMBER`", "key$": "venta", "index$": 3 } }, "name": "dollar_quote", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /dolares", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/dolares", "q": {}, "r": {}, "s": [{ "lit": "dolares" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /dolares/{type}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "type", "or": "type", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/dolares/{type}", "q": { "exist": ["type"] }, "r": {}, "s": [{ "lit": "dolares" }, { "var": "type" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "dollar_quote", "name__orig": "dollar_quote", "Name": "DollarQuote", "name_": "dollar_quote", "name-": "dollar-quote", "NAME": "DOLLAR_QUOTE", "index$": 1 }, { "active": true, "entity": "dollar_quote", "key$": "BasicDollarQuoteFlow", "kind": "basic", "name": "BasicDollarQuoteFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "dollar_quote_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "dollar_quote_ref01", "srcdatavar": "dollar_quote_ref01_data", "suffix": "_dt0" }, "m": { "id": "dollar_quote01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-dollar_quote_ref01" } }], "index$": 1 }] }, 'DollarQuote', { "GET /dolares": { "protocol": "http", "operationId": "getAllDollarQuotes", "responses": { "200": { "description": "Successful response with all dollar quotations", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "nombre": { "type": "string", "description": "Name of the dollar type", "example": "Dólar Blue", "key$": "nombre" }, "compra": { "type": "number", "format": "float", "description": "Buy price", "example": 365.5, "key$": "compra" }, "venta": { "type": "number", "format": "float", "description": "Sell price", "example": 385.5, "key$": "venta" }, "fechaActualizacion": { "type": "string", "format": "date-time", "description": "Last update timestamp", "example": "2024-01-15T10:30:00Z", "key$": "fechaActualizacion" } }, "required": ["nombre", "compra", "venta", "fechaActualizacion"], "x-ref": "#/components/schemas/DollarQuote", "index$": 0 } } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "detail": { "type": "string", "description": "Error message", "example": "Resource not found" } }, "required": ["detail"], "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /dolares/{type}": { "protocol": "http", "operationId": "getDollarQuoteByType", "responses": { "200": { "description": "Successful response with specific dollar quotation", "content": { "application/json": { "schema": { "type": "object", "properties": { "nombre": { "type": "string", "description": "Name of the dollar type", "example": "Dólar Blue", "key$": "nombre" }, "compra": { "type": "number", "format": "float", "description": "Buy price", "example": 365.5, "key$": "compra" }, "venta": { "type": "number", "format": "float", "description": "Sell price", "example": 385.5, "key$": "venta" }, "fechaActualizacion": { "type": "string", "format": "date-time", "description": "Last update timestamp", "example": "2024-01-15T10:30:00Z", "key$": "fechaActualizacion" } }, "required": ["nombre", "compra", "venta", "fechaActualizacion"], "x-ref": "#/components/schemas/DollarQuote", "index$": 0 } } } }, "404": { "description": "Dollar quotation type not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "detail": { "type": "string", "description": "Error message", "example": "Resource not found" } }, "required": ["detail"], "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "detail": { "type": "string", "description": "Error message", "example": "Resource not found" } }, "required": ["detail"], "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "type", "in": "path", "required": true, "description": "Type of dollar quotation (oficial, blue, mep, ccl, tarjeta, mayorista, cripto)", "schema": { "type": "string", "enum": ["oficial", "blue", "mep", "ccl", "tarjeta", "mayorista", "cripto"] }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let dollar_quote_ref01_data = Object.values(setup.data.existing.dollar_quote)[0];
        // LIST
        const dollar_quote_ref01_ent = client.DollarQuote();
        const dollar_quote_ref01_match = {};
        const dollar_quote_ref01_list = (await dollar_quote_ref01_ent.list(dollar_quote_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/dollar_quote/DollarQuoteTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ArgentofxSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['dollar_quote01', 'dollar_quote02', 'dollar_quote03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ARGENTOFX_TEST_DOLLAR_QUOTE_ENTID': idmap,
        'ARGENTOFX_TEST_LIVE': 'FALSE',
        'ARGENTOFX_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ARGENTOFX_TEST_DOLLAR_QUOTE_ENTID'];
    const live = 'TRUE' === env.ARGENTOFX_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ARGENTOFX_TEST_DOLLAR_QUOTE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ArgentofxSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=DollarQuoteEntity.test.js.map