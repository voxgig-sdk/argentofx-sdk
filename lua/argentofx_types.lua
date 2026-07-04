-- Typed models for the Argentofx SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Currency
---@field compra number
---@field fecha_actualizacion string
---@field moneda string
---@field nombre string
---@field venta number

---@class CurrencyLoadMatch
---@field id string

---@class CurrencyListMatch

---@class DollarQuote
---@field compra number
---@field fecha_actualizacion string
---@field nombre string
---@field venta number

---@class DollarQuoteLoadMatch
---@field type string

---@class DollarQuoteListMatch

---@class GetRoot
---@field documentation? string
---@field message? string

---@class GetRootLoadMatch

local M = {}

return M
