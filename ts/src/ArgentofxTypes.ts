// Typed models for the Argentofx SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Currency {
  compra: number
  fecha_actualizacion: string
  moneda: string
  nombre: string
  venta: number
}

export interface CurrencyLoadMatch {
  id: string
}

export type CurrencyListMatch = Partial<Currency>

export interface DollarQuote {
  compra: number
  fecha_actualizacion: string
  nombre: string
  venta: number
}

export interface DollarQuoteLoadMatch {
  type: string
}

export type DollarQuoteListMatch = Partial<DollarQuote>

export interface GetRoot {
  documentation?: string
  message?: string
}

export type GetRootLoadMatch = Partial<GetRoot>

