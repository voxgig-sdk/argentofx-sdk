# Argentofx SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Argentofx",
            "slug": "argentofx",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "short": "Buy price",
            "type": "`$NUMBER`",
          },
          {
            "name": "fechaActualizacion",
            "req": True,
            "short": "Last update timestamp",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "moneda",
            "req": True,
            "short": "Currency code",
            "type": "`$STRING`",
          },
          {
            "name": "nombre",
            "req": True,
            "short": "Currency name",
            "type": "`$STRING`",
          },
          {
            "name": "venta",
            "req": True,
            "short": "Sell price",
            "type": "`$NUMBER`",
          },
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
                  "currencies",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
            "short": "Buy price",
            "type": "`$NUMBER`",
          },
          {
            "name": "fechaActualizacion",
            "req": True,
            "short": "Last update timestamp",
            "type": "`$STRING`",
          },
          {
            "name": "nombre",
            "req": True,
            "short": "Name of the dollar type",
            "type": "`$STRING`",
          },
          {
            "name": "venta",
            "req": True,
            "short": "Sell price",
            "type": "`$NUMBER`",
          },
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
                  "dolares",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
            "type": "`$STRING`",
          },
          {
            "name": "message",
            "type": "`$STRING`",
          },
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
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
