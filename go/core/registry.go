package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCurrencyEntityFunc func(client *ArgentofxSDK, entopts map[string]any) ArgentofxEntity

var NewDollarQuoteEntityFunc func(client *ArgentofxSDK, entopts map[string]any) ArgentofxEntity

var NewGetRootEntityFunc func(client *ArgentofxSDK, entopts map[string]any) ArgentofxEntity

