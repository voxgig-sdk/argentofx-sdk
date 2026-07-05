<?php
declare(strict_types=1);

// Typed models for the Argentofx SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Currency entity data model. */
class Currency
{
    public float $compra;
    public string $fecha_actualizacion;
    public string $moneda;
    public string $nombre;
    public float $venta;
}

/** Request payload for Currency#load. */
class CurrencyLoadMatch
{
    public string $id;
}

/** Request payload for Currency#list. */
class CurrencyListMatch
{
    public ?float $compra = null;
    public ?string $fecha_actualizacion = null;
    public ?string $moneda = null;
    public ?string $nombre = null;
    public ?float $venta = null;
}

/** DollarQuote entity data model. */
class DollarQuote
{
    public float $compra;
    public string $fecha_actualizacion;
    public string $nombre;
    public float $venta;
}

/** Request payload for DollarQuote#load. */
class DollarQuoteLoadMatch
{
    public string $type;
}

/** Request payload for DollarQuote#list. */
class DollarQuoteListMatch
{
    public ?float $compra = null;
    public ?string $fecha_actualizacion = null;
    public ?string $nombre = null;
    public ?float $venta = null;
}

/** GetRoot entity data model. */
class GetRoot
{
    public ?string $documentation = null;
    public ?string $message = null;
}

/** Request payload for GetRoot#load. */
class GetRootLoadMatch
{
    public ?string $documentation = null;
    public ?string $message = null;
}

