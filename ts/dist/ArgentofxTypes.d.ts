export interface Currency {
    compra: number;
    fechaActualizacion: string;
    id?: string;
    moneda: string;
    nombre: string;
    venta: number;
}
export interface CurrencyLoadMatch {
    id: string;
}
export interface CurrencyListMatch {
    compra?: number;
    fechaActualizacion?: string;
    id?: string;
    moneda?: string;
    nombre?: string;
    venta?: number;
}
export interface DollarQuote {
    compra: number;
    fechaActualizacion: string;
    nombre: string;
    venta: number;
}
export interface DollarQuoteLoadMatch {
    type: string;
}
export interface DollarQuoteListMatch {
    compra?: number;
    fechaActualizacion?: string;
    nombre?: string;
    venta?: number;
}
export interface GetRoot {
    documentation?: string;
    message?: string;
}
export interface GetRootLoadMatch {
    documentation?: string;
    message?: string;
}
