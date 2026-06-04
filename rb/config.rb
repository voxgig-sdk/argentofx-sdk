# Argentofx SDK configuration

module ArgentofxConfig
  def self.make_config
    {
      "main" => {
        "name" => "Argentofx",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://fastapiproject-1-eziw.onrender.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "currency" => {},
          "dollar_quote" => {},
          "get_root" => {},
        },
      },
      "entity" => {
        "currency" => {
          "fields" => [
            {
              "name" => "compra",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "fecha_actualizacion",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "moneda",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "nombre",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "venta",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 4,
            },
          ],
          "name" => "currency",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/currencies",
                  "parts" => [
                    "currencies",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "EUR",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "currency",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/currencies/{currency}",
                  "parts" => [
                    "currencies",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "currency" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "dollar_quote" => {
          "fields" => [
            {
              "name" => "compra",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "fecha_actualizacion",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "nombre",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "venta",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 3,
            },
          ],
          "name" => "dollar_quote",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/dolares",
                  "parts" => [
                    "dolares",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "type",
                        "orig" => "type",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/dolares/{type}",
                  "parts" => [
                    "dolares",
                    "{type}",
                  ],
                  "select" => {
                    "exist" => [
                      "type",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "dolare",
              ],
            ],
          },
        },
        "get_root" => {
          "fields" => [
            {
              "name" => "documentation",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "message",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
          ],
          "name" => "get_root",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/",
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "parts" => [],
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    ArgentofxFeatures.make_feature(name)
  end
end
