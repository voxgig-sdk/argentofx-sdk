import { ArgentofxEntityBase } from '../ArgentofxEntityBase';
import type { ArgentofxSDK } from '../ArgentofxSDK';
import type { Control } from '../types';
import type { GetRoot, GetRootLoadMatch } from '../ArgentofxTypes';
declare class GetRootEntity extends ArgentofxEntityBase<GetRoot> {
    constructor(client: ArgentofxSDK, entopts: any);
    make(this: GetRootEntity): GetRootEntity;
    load(this: any, reqmatch?: GetRootLoadMatch, ctrl?: Control): Promise<GetRootEntity>;
}
export { GetRootEntity };
