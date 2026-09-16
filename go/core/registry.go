package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewCurrencyEntityFunc func(client *ArgentofxSDK, entopts map[string]any) ArgentofxEntity

var NewDollarQuoteEntityFunc func(client *ArgentofxSDK, entopts map[string]any) ArgentofxEntity

var NewGetRootEntityFunc func(client *ArgentofxSDK, entopts map[string]any) ArgentofxEntity

