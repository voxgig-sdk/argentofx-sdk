package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Argentofx",
			"slug": "argentofx",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://fastapiproject-1-eziw.onrender.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"currency": map[string]any{},
				"dollar_quote": map[string]any{},
				"get_root": map[string]any{},
			},
		},
		"entity": map[string]any{
			"currency": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "compra",
						"title": "Compra",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Buy price",
						"format": "float",
					},
					map[string]any{
						"name": "fechaActualizacion",
						"title": "Fecha Actualizacion",
						"type": "`$STRING`",
						"req": true,
						"short": "Last update timestamp",
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "moneda",
						"title": "Moneda",
						"type": "`$STRING`",
						"req": true,
						"short": "Currency code",
					},
					map[string]any{
						"name": "nombre",
						"title": "Nombre",
						"type": "`$STRING`",
						"req": true,
						"short": "Currency name",
					},
					map[string]any{
						"name": "venta",
						"title": "Venta",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Sell price",
						"format": "float",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "currency",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/currencies",
								"segments": []any{
									map[string]any{
										"lit": "currencies",
									},
								},
								"parts": []any{
									"currencies",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/currencies/{currency}",
								"segments": []any{
									map[string]any{
										"lit": "currencies",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"currencies",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"currency": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "currency",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "EUR",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"dollar_quote": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "compra",
						"title": "Compra",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Buy price",
						"format": "float",
					},
					map[string]any{
						"name": "fechaActualizacion",
						"title": "Fecha Actualizacion",
						"type": "`$STRING`",
						"req": true,
						"short": "Last update timestamp",
						"format": "date-time",
					},
					map[string]any{
						"name": "nombre",
						"title": "Nombre",
						"type": "`$STRING`",
						"req": true,
						"short": "Name of the dollar type",
					},
					map[string]any{
						"name": "venta",
						"title": "Venta",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Sell price",
						"format": "float",
					},
				},
				"name": "dollar_quote",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/dolares",
								"segments": []any{
									map[string]any{
										"lit": "dolares",
									},
								},
								"parts": []any{
									"dolares",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/dolares/{type}",
								"segments": []any{
									map[string]any{
										"lit": "dolares",
									},
									map[string]any{
										"var": "type",
									},
								},
								"parts": []any{
									"dolares",
									"{type}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"type",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_root": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "documentation",
						"title": "Documentation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
					},
				},
				"name": "get_root",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"segments": []any{},
								"parts": []any{},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
