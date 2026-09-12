
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Argentofx',
        slug: "argentofx",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://fastapiproject-1-eziw.onrender.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      currency: {
      },

      dollar_quote: {
      },

      get_root: {
      },

    }
  }


  entity = {
    "currency": {
      "fields": [
        {
          "format": "float",
          "name": "compra",
          "req": true,
          "short": "Buy price",
          "type": "`$NUMBER`"
        },
        {
          "format": "date-time",
          "name": "fechaActualizacion",
          "req": true,
          "short": "Last update timestamp",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "moneda",
          "req": true,
          "short": "Currency code",
          "type": "`$STRING`"
        },
        {
          "name": "nombre",
          "req": true,
          "short": "Currency name",
          "type": "`$STRING`"
        },
        {
          "format": "float",
          "name": "venta",
          "req": true,
          "short": "Sell price",
          "type": "`$NUMBER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "currency",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/currencies",
              "segments": [
                {
                  "lit": "currencies"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "currencies"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "EUR",
                    "kind": "param",
                    "name": "id",
                    "orig": "currency",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/currencies/{currency}",
              "rename": {
                "param": {
                  "currency": "id"
                }
              },
              "segments": [
                {
                  "lit": "currencies"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "currencies",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "dollar_quote": {
      "fields": [
        {
          "format": "float",
          "name": "compra",
          "req": true,
          "short": "Buy price",
          "type": "`$NUMBER`"
        },
        {
          "format": "date-time",
          "name": "fechaActualizacion",
          "req": true,
          "short": "Last update timestamp",
          "type": "`$STRING`"
        },
        {
          "name": "nombre",
          "req": true,
          "short": "Name of the dollar type",
          "type": "`$STRING`"
        },
        {
          "format": "float",
          "name": "venta",
          "req": true,
          "short": "Sell price",
          "type": "`$NUMBER`"
        }
      ],
      "name": "dollar_quote",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/dolares",
              "segments": [
                {
                  "lit": "dolares"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "dolares"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "type",
                    "orig": "type",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/dolares/{type}",
              "segments": [
                {
                  "lit": "dolares"
                },
                {
                  "var": "type"
                }
              ],
              "select": {
                "exist": [
                  "type"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "dolares",
                "{type}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "dolare"
          ]
        ]
      }
    },
    "get_root": {
      "fields": [
        {
          "name": "documentation",
          "type": "`$STRING`"
        },
        {
          "name": "message",
          "type": "`$STRING`"
        }
      ],
      "name": "get_root",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/",
              "segments": [],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": []
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

