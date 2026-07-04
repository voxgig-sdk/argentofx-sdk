// Typed models for the Argentofx SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Currency is the typed data model for the currency entity.
type Currency struct {
	Compra float64 `json:"compra"`
	FechaActualizacion string `json:"fecha_actualizacion"`
	Moneda string `json:"moneda"`
	Nombre string `json:"nombre"`
	Venta float64 `json:"venta"`
}

// CurrencyLoadMatch is the typed request payload for Currency.LoadTyped.
type CurrencyLoadMatch struct {
	Id string `json:"id"`
}

// CurrencyListMatch mirrors the currency fields as an all-optional match
// filter (Go analog of Partial<Currency>).
type CurrencyListMatch struct {
	Compra *float64 `json:"compra,omitempty"`
	FechaActualizacion *string `json:"fecha_actualizacion,omitempty"`
	Moneda *string `json:"moneda,omitempty"`
	Nombre *string `json:"nombre,omitempty"`
	Venta *float64 `json:"venta,omitempty"`
}

// DollarQuote is the typed data model for the dollar_quote entity.
type DollarQuote struct {
	Compra float64 `json:"compra"`
	FechaActualizacion string `json:"fecha_actualizacion"`
	Nombre string `json:"nombre"`
	Venta float64 `json:"venta"`
}

// DollarQuoteLoadMatch is the typed request payload for DollarQuote.LoadTyped.
type DollarQuoteLoadMatch struct {
	Type string `json:"type"`
}

// DollarQuoteListMatch mirrors the dollar_quote fields as an all-optional match
// filter (Go analog of Partial<DollarQuote>).
type DollarQuoteListMatch struct {
	Compra *float64 `json:"compra,omitempty"`
	FechaActualizacion *string `json:"fecha_actualizacion,omitempty"`
	Nombre *string `json:"nombre,omitempty"`
	Venta *float64 `json:"venta,omitempty"`
}

// GetRoot is the typed data model for the get_root entity.
type GetRoot struct {
	Documentation *string `json:"documentation,omitempty"`
	Message *string `json:"message,omitempty"`
}

// GetRootLoadMatch mirrors the get_root fields as an all-optional match
// filter (Go analog of Partial<GetRoot>).
type GetRootLoadMatch struct {
	Documentation *string `json:"documentation,omitempty"`
	Message *string `json:"message,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
