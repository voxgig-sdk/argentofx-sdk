import { ArgentofxEntityBase } from '../ArgentofxEntityBase';
import type { ArgentofxSDK } from '../ArgentofxSDK';
import type { Control } from '../types';
import type { Currency, CurrencyLoadMatch, CurrencyListMatch } from '../ArgentofxTypes';
declare class CurrencyEntity extends ArgentofxEntityBase<Currency> {
    constructor(client: ArgentofxSDK, entopts: any);
    make(this: CurrencyEntity): CurrencyEntity;
    load(this: any, reqmatch?: CurrencyLoadMatch, ctrl?: Control): Promise<CurrencyEntity>;
    list(this: any, reqmatch?: CurrencyListMatch, ctrl?: Control): Promise<CurrencyEntity[]>;
}
export { CurrencyEntity };
