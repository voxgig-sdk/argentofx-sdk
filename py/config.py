# Argentofx SDK configuration


def make_config():
    return {
        "main": {
            "name": "Argentofx",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://fastapiproject-1-eziw.onrender.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "currency": {},
                "dollar_quote": {},
                "get_root": {},
            },
        },
        "entity": {
      "currency": {
        "fields": [
          {
            "name": "compra",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "fecha_actualizacion",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "moneda",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "nombre",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "venta",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "currency",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/currencies",
                "parts": [
                  "currencies",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
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
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/currencies/{currency}",
                "parts": [
                  "currencies",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "currency": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "dollar_quote": {
        "fields": [
          {
            "name": "compra",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "fecha_actualizacion",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "nombre",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "venta",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "dollar_quote",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/dolares",
                "parts": [
                  "dolares",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "type",
                      "orig": "type",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/dolares/{type}",
                "parts": [
                  "dolares",
                  "{type}",
                ],
                "select": {
                  "exist": [
                    "type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "dolare",
            ],
          ],
        },
      },
      "get_root": {
        "fields": [
          {
            "name": "documentation",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "message",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "get_root",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "method": "GET",
                "orig": "/",
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "parts": [],
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
