
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Argentofx',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "name": "compra",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "fechaActualizacion",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "moneda",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "nombre",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "venta",
          "req": true,
          "type": "`$NUMBER`"
        }
      ],
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
              "parts": [
                "currencies"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "currencies",
                "{id}"
              ],
              "rename": {
                "param": {
                  "currency": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "name": "compra",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "fechaActualizacion",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "nombre",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "venta",
          "req": true,
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
              "parts": [
                "dolares"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "dolares",
                "{type}"
              ],
              "select": {
                "exist": [
                  "type"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

