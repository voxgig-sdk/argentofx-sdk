# Typed models for the Argentofx SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Currency(TypedDict):
    compra: float
    fecha_actualizacion: str
    moneda: str
    nombre: str
    venta: float


class CurrencyLoadMatch(TypedDict):
    id: str


class CurrencyListMatch(TypedDict, total=False):
    compra: float
    fecha_actualizacion: str
    moneda: str
    nombre: str
    venta: float


class DollarQuote(TypedDict):
    compra: float
    fecha_actualizacion: str
    nombre: str
    venta: float


class DollarQuoteLoadMatch(TypedDict):
    type: str


class DollarQuoteListMatch(TypedDict, total=False):
    compra: float
    fecha_actualizacion: str
    nombre: str
    venta: float


class GetRoot(TypedDict, total=False):
    documentation: str
    message: str


class GetRootLoadMatch(TypedDict, total=False):
    documentation: str
    message: str
