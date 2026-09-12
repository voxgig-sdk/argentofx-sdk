import { Context } from './Context';
declare class ArgentofxError extends Error {
    isArgentofxError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { ArgentofxError };
