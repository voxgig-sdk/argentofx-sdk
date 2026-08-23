# Argentofx SDK configuration

module ArgentofxConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Argentofx",
        "slug" => "argentofx",
        "version" => "0.0.1",
        "target" => "rb",
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
              "short" => "Buy price",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "fechaActualizacion",
              "req" => true,
              "short" => "Last update timestamp",
              "type" => "`$STRING`",
            },
            {
              "name" => "moneda",
              "req" => true,
              "short" => "Currency code",
              "type" => "`$STRING`",
            },
            {
              "name" => "nombre",
              "req" => true,
              "short" => "Currency name",
              "type" => "`$STRING`",
            },
            {
              "name" => "venta",
              "req" => true,
              "short" => "Sell price",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "currency",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/currencies",
                  "parts" => [
                    "currencies",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
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
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
              "short" => "Buy price",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "fechaActualizacion",
              "req" => true,
              "short" => "Last update timestamp",
              "type" => "`$STRING`",
            },
            {
              "name" => "nombre",
              "req" => true,
              "short" => "Name of the dollar type",
              "type" => "`$STRING`",
            },
            {
              "name" => "venta",
              "req" => true,
              "short" => "Sell price",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "dollar_quote",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/dolares",
                  "parts" => [
                    "dolares",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
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
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
              "type" => "`$STRING`",
            },
            {
              "name" => "message",
              "type" => "`$STRING`",
            },
          ],
          "name" => "get_root",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/",
                  "parts" => [],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
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
