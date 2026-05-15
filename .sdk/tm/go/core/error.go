package core

type ArgentofxError struct {
	IsArgentofxError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewArgentofxError(code string, msg string, ctx *Context) *ArgentofxError {
	return &ArgentofxError{
		IsArgentofxError: true,
		Sdk:              "Argentofx",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ArgentofxError) Error() string {
	return e.Msg
}
