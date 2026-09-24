"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgentofxError = void 0;
class ArgentofxError extends Error {
    isArgentofxError = true;
    sdk = 'Argentofx';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.ArgentofxError = ArgentofxError;
//# sourceMappingURL=ArgentofxError.js.map