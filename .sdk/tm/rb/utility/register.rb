# Argentofx SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ArgentofxUtility.registrar = ->(u) {
  u.clean = ArgentofxUtilities::Clean
  u.done = ArgentofxUtilities::Done
  u.make_error = ArgentofxUtilities::MakeError
  u.feature_add = ArgentofxUtilities::FeatureAdd
  u.feature_hook = ArgentofxUtilities::FeatureHook
  u.feature_init = ArgentofxUtilities::FeatureInit
  u.fetcher = ArgentofxUtilities::Fetcher
  u.make_fetch_def = ArgentofxUtilities::MakeFetchDef
  u.make_context = ArgentofxUtilities::MakeContext
  u.make_options = ArgentofxUtilities::MakeOptions
  u.make_request = ArgentofxUtilities::MakeRequest
  u.make_response = ArgentofxUtilities::MakeResponse
  u.make_result = ArgentofxUtilities::MakeResult
  u.make_point = ArgentofxUtilities::MakePoint
  u.make_spec = ArgentofxUtilities::MakeSpec
  u.make_url = ArgentofxUtilities::MakeUrl
  u.param = ArgentofxUtilities::Param
  u.prepare_auth = ArgentofxUtilities::PrepareAuth
  u.prepare_body = ArgentofxUtilities::PrepareBody
  u.prepare_headers = ArgentofxUtilities::PrepareHeaders
  u.prepare_method = ArgentofxUtilities::PrepareMethod
  u.prepare_params = ArgentofxUtilities::PrepareParams
  u.prepare_path = ArgentofxUtilities::PreparePath
  u.prepare_query = ArgentofxUtilities::PrepareQuery
  u.result_basic = ArgentofxUtilities::ResultBasic
  u.result_body = ArgentofxUtilities::ResultBody
  u.result_headers = ArgentofxUtilities::ResultHeaders
  u.transform_request = ArgentofxUtilities::TransformRequest
  u.transform_response = ArgentofxUtilities::TransformResponse
}
