# Argentofx SDK utility: make_context

from argentofx_sdk.core.context import ArgentofxContext


def make_context_util(ctxmap, basectx):
    return ArgentofxContext(ctxmap, basectx)
