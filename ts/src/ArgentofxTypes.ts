// Typed models for the Argentofx SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Currency {
  compra: number
  fechaActualizacion: string
  moneda: string
  nombre: string
  venta: number
}

export interface CurrencyLoadMatch {
  id: string
}

export interface CurrencyListMatch {
  compra?: number
  fechaActualizacion?: string
  moneda?: string
  nombre?: string
  venta?: number
}

export interface DollarQuote {
  compra: number
  fechaActualizacion: string
  nombre: string
  venta: number
}

export interface DollarQuoteLoadMatch {
  type: string
}

export interface DollarQuoteListMatch {
  compra?: number
  fechaActualizacion?: string
  nombre?: string
  venta?: number
}

export interface GetRoot {
  documentation?: string
  message?: string
}

export interface GetRootLoadMatch {
  documentation?: string
  message?: string
}

