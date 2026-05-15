package = "voxgig-sdk-argentofx"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/argentofx-sdk.git"
}
description = {
  summary = "Argentofx SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["argentofx_sdk"] = "argentofx_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
