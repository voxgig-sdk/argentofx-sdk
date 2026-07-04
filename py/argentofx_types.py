# Typed models for the Argentofx SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Currency:
    compra: float
    fecha_actualizacion: str
    moneda: str
    nombre: str
    venta: float


@dataclass
class CurrencyLoadMatch:
    id: str


@dataclass
class CurrencyListMatch:
    compra: Optional[float] = None
    fecha_actualizacion: Optional[str] = None
    moneda: Optional[str] = None
    nombre: Optional[str] = None
    venta: Optional[float] = None


@dataclass
class DollarQuote:
    compra: float
    fecha_actualizacion: str
    nombre: str
    venta: float


@dataclass
class DollarQuoteLoadMatch:
    type: str


@dataclass
class DollarQuoteListMatch:
    compra: Optional[float] = None
    fecha_actualizacion: Optional[str] = None
    nombre: Optional[str] = None
    venta: Optional[float] = None


@dataclass
class GetRoot:
    documentation: Optional[str] = None
    message: Optional[str] = None


@dataclass
class GetRootLoadMatch:
    documentation: Optional[str] = None
    message: Optional[str] = None

