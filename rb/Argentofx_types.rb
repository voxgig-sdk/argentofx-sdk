# frozen_string_literal: true

# Typed models for the Argentofx SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Currency entity data model.
#
# @!attribute [rw] compra
#   @return [Float]
#
# @!attribute [rw] fechaActualizacion
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] moneda
#   @return [String]
#
# @!attribute [rw] nombre
#   @return [String]
#
# @!attribute [rw] venta
#   @return [Float]
Currency = Struct.new(
  :compra,
  :fechaActualizacion,
  :id,
  :moneda,
  :nombre,
  :venta,
  keyword_init: true
)

# Request payload for Currency#load.
#
# @!attribute [rw] id
#   @return [String]
CurrencyLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Currency#list.
#
# @!attribute [rw] compra
#   @return [Float, nil]
#
# @!attribute [rw] fechaActualizacion
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] moneda
#   @return [String, nil]
#
# @!attribute [rw] nombre
#   @return [String, nil]
#
# @!attribute [rw] venta
#   @return [Float, nil]
CurrencyListMatch = Struct.new(
  :compra,
  :fechaActualizacion,
  :id,
  :moneda,
  :nombre,
  :venta,
  keyword_init: true
)

# DollarQuote entity data model.
#
# @!attribute [rw] compra
#   @return [Float]
#
# @!attribute [rw] fechaActualizacion
#   @return [String]
#
# @!attribute [rw] nombre
#   @return [String]
#
# @!attribute [rw] venta
#   @return [Float]
DollarQuote = Struct.new(
  :compra,
  :fechaActualizacion,
  :nombre,
  :venta,
  keyword_init: true
)

# Request payload for DollarQuote#load.
#
# @!attribute [rw] type
#   @return [String]
DollarQuoteLoadMatch = Struct.new(
  :type,
  keyword_init: true
)

# Request payload for DollarQuote#list.
#
# @!attribute [rw] compra
#   @return [Float, nil]
#
# @!attribute [rw] fechaActualizacion
#   @return [String, nil]
#
# @!attribute [rw] nombre
#   @return [String, nil]
#
# @!attribute [rw] venta
#   @return [Float, nil]
DollarQuoteListMatch = Struct.new(
  :compra,
  :fechaActualizacion,
  :nombre,
  :venta,
  keyword_init: true
)

# GetRoot entity data model.
#
# @!attribute [rw] documentation
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
GetRoot = Struct.new(
  :documentation,
  :message,
  keyword_init: true
)

# Request payload for GetRoot#load.
#
# @!attribute [rw] documentation
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
GetRootLoadMatch = Struct.new(
  :documentation,
  :message,
  keyword_init: true
)

