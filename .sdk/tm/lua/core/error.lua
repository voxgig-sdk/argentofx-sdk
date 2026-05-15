-- Argentofx SDK error

local ArgentofxError = {}
ArgentofxError.__index = ArgentofxError


function ArgentofxError.new(code, msg, ctx)
  local self = setmetatable({}, ArgentofxError)
  self.is_sdk_error = true
  self.sdk = "Argentofx"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ArgentofxError:error()
  return self.msg
end


function ArgentofxError:__tostring()
  return self.msg
end


return ArgentofxError
