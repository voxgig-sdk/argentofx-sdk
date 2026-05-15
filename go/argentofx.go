package voxgigargentofxsdk

import (
	"github.com/voxgig-sdk/argentofx-sdk/core"
	"github.com/voxgig-sdk/argentofx-sdk/entity"
	"github.com/voxgig-sdk/argentofx-sdk/feature"
	_ "github.com/voxgig-sdk/argentofx-sdk/utility"
)

// Type aliases preserve external API.
type ArgentofxSDK = core.ArgentofxSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ArgentofxEntity = core.ArgentofxEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ArgentofxError = core.ArgentofxError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCurrencyEntityFunc = func(client *core.ArgentofxSDK, entopts map[string]any) core.ArgentofxEntity {
		return entity.NewCurrencyEntity(client, entopts)
	}
	core.NewDollarQuoteEntityFunc = func(client *core.ArgentofxSDK, entopts map[string]any) core.ArgentofxEntity {
		return entity.NewDollarQuoteEntity(client, entopts)
	}
	core.NewGetRootEntityFunc = func(client *core.ArgentofxSDK, entopts map[string]any) core.ArgentofxEntity {
		return entity.NewGetRootEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewArgentofxSDK = core.NewArgentofxSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
