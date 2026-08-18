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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "fechaActualizacion",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "moneda",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nombre",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "venta",
						"req": true,
						"type": "`$NUMBER`",
					},
				},
				"name": "currency",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/currencies",
								"parts": []any{
									"currencies",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "EUR",
											"kind": "param",
											"name": "id",
											"orig": "currency",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/currencies/{currency}",
								"parts": []any{
									"currencies",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"currency": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "fechaActualizacion",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nombre",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "venta",
						"req": true,
						"type": "`$NUMBER`",
					},
				},
				"name": "dollar_quote",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/dolares",
								"parts": []any{
									"dolares",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "type",
											"orig": "type",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/dolares/{type}",
								"parts": []any{
									"dolares",
									"{type}",
								},
								"select": map[string]any{
									"exist": []any{
										"type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"dolare",
						},
					},
				},
			},
			"get_root": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "documentation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "message",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"parts": []any{},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
