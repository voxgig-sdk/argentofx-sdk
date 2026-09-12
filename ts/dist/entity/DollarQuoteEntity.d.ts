import { ArgentofxEntityBase } from '../ArgentofxEntityBase';
import type { ArgentofxSDK } from '../ArgentofxSDK';
import type { Control } from '../types';
import type { DollarQuote, DollarQuoteLoadMatch, DollarQuoteListMatch } from '../ArgentofxTypes';
declare class DollarQuoteEntity extends ArgentofxEntityBase<DollarQuote> {
    constructor(client: ArgentofxSDK, entopts: any);
    make(this: DollarQuoteEntity): DollarQuoteEntity;
    load(this: any, reqmatch?: DollarQuoteLoadMatch, ctrl?: Control): Promise<DollarQuoteEntity>;
    list(this: any, reqmatch?: DollarQuoteListMatch, ctrl?: Control): Promise<DollarQuoteEntity[]>;
}
export { DollarQuoteEntity };
