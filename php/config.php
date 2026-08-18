<?php
declare(strict_types=1);

// Argentofx SDK configuration

class ArgentofxConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Argentofx",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://fastapiproject-1-eziw.onrender.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "currency" => [],
                    "dollar_quote" => [],
                    "get_root" => [],
                ],
            ],
            "entity" => [
        'currency' => [
          'fields' => [
            [
              'name' => 'compra',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'fechaActualizacion',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'moneda',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'nombre',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'venta',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'currency',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/currencies',
                  'parts' => [
                    'currencies',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'EUR',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'currency',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/currencies/{currency}',
                  'parts' => [
                    'currencies',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'currency' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'dollar_quote' => [
          'fields' => [
            [
              'name' => 'compra',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'fechaActualizacion',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'nombre',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'venta',
              'req' => true,
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'dollar_quote',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/dolares',
                  'parts' => [
                    'dolares',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'type',
                        'orig' => 'type',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/dolares/{type}',
                  'parts' => [
                    'dolares',
                    '{type}',
                  ],
                  'select' => [
                    'exist' => [
                      'type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'dolare',
              ],
            ],
          ],
        ],
        'get_root' => [
          'fields' => [
            [
              'name' => 'documentation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'message',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'get_root',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/',
                  'parts' => [],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return ArgentofxFeatures::make_feature($name);
    }
}
