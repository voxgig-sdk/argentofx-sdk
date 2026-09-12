import { CurrencyEntity } from './entity/CurrencyEntity';
import { DollarQuoteEntity } from './entity/DollarQuoteEntity';
import { GetRootEntity } from './entity/GetRootEntity';
export type * from './ArgentofxTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ArgentofxEntityBase } from './ArgentofxEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ArgentofxSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Currency(entopts?: Record<string, any>): CurrencyEntity;
    DollarQuote(entopts?: Record<string, any>): DollarQuoteEntity;
    GetRoot(entopts?: Record<string, any>): GetRootEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ArgentofxSDK;
    tester(testopts?: any, sdkopts?: any): ArgentofxSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ArgentofxSDK;
export { stdutil, config, BaseFeature, ArgentofxEntityBase, ArgentofxSDK, SDK, };
