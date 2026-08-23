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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["req"] = true,
            ["short"] = "Buy price",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "fechaActualizacion",
            ["req"] = true,
            ["short"] = "Last update timestamp",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "moneda",
            ["req"] = true,
            ["short"] = "Currency code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "nombre",
            ["req"] = true,
            ["short"] = "Currency name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "venta",
            ["req"] = true,
            ["short"] = "Sell price",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "currency",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/currencies",
                ["parts"] = {
                  "currencies",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "EUR",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "currency",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/currencies/{currency}",
                ["parts"] = {
                  "currencies",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["currency"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
            ["req"] = true,
            ["short"] = "Buy price",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "fechaActualizacion",
            ["req"] = true,
            ["short"] = "Last update timestamp",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "nombre",
            ["req"] = true,
            ["short"] = "Name of the dollar type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "venta",
            ["req"] = true,
            ["short"] = "Sell price",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "dollar_quote",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/dolares",
                ["parts"] = {
                  "dolares",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/dolares/{type}",
                ["parts"] = {
                  "dolares",
                  "{type}",
                },
                ["select"] = {
                  ["exist"] = {
                    "type",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "dolare",
            },
          },
        },
      },
      ["get_root"] = {
        ["fields"] = {
          {
            ["name"] = "documentation",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "message",
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
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/",
                ["parts"] = {},
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
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
