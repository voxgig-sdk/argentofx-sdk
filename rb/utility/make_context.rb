# Argentofx SDK utility: make_context
require_relative '../core/context'
module ArgentofxUtilities
  MakeContext = ->(ctxmap, basectx) {
    ArgentofxContext.new(ctxmap, basectx)
  }
end
