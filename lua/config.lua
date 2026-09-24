-- Argentofx SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Argentofx",
      slug = "argentofx",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://fastapiproject-1-eziw.onrender.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["currency"] = {},
        ["dollar_quote"] = {},
        ["get_root"] = {},
      },
    },
    entity = {
      ["currency"] = {
        ["fields"] = {
          {
            ["name"] = "compra",
            ["title"] = "Compra",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "Buy price",
            ["format"] = "float",
          },
          {
            ["name"] = "fechaActualizacion",
            ["title"] = "Fecha Actualizacion",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Last update timestamp",
            ["format"] = "date-time",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "moneda",
            ["title"] = "Moneda",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Currency code",
          },
          {
            ["name"] = "nombre",
            ["title"] = "Nombre",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Currency name",
          },
          {
            ["name"] = "venta",
            ["title"] = "Venta",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "Sell price",
            ["format"] = "float",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "currency",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/currencies",
                ["segments"] = {
                  {
                    ["lit"] = "currencies",
                  },
                },
                ["parts"] = {
                  "currencies",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/currencies/{currency}",
                ["segments"] = {
                  {
                    ["lit"] = "currencies",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "currencies",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["currency"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "currency",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "EUR",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["dollar_quote"] = {
        ["fields"] = {
          {
            ["name"] = "compra",
            ["title"] = "Compra",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "Buy price",
            ["format"] = "float",
          },
          {
            ["name"] = "fechaActualizacion",
            ["title"] = "Fecha Actualizacion",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Last update timestamp",
            ["format"] = "date-time",
          },
          {
            ["name"] = "nombre",
            ["title"] = "Nombre",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Name of the dollar type",
          },
          {
            ["name"] = "venta",
            ["title"] = "Venta",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "Sell price",
            ["format"] = "float",
          },
        },
        ["name"] = "dollar_quote",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/dolares",
                ["segments"] = {
                  {
                    ["lit"] = "dolares",
                  },
                },
                ["parts"] = {
                  "dolares",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/dolares/{type}",
                ["segments"] = {
                  {
                    ["lit"] = "dolares",
                  },
                  {
                    ["var"] = "type",
                  },
                },
                ["parts"] = {
                  "dolares",
                  "{type}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "type",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["get_root"] = {
        ["fields"] = {
          {
            ["name"] = "documentation",
            ["title"] = "Documentation",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "message",
            ["title"] = "Message",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "get_root",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/",
                ["segments"] = {},
                ["parts"] = {},
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
