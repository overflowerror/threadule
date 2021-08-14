package web

import (
	"fmt"
	"net/http"
	"threadule/backend/internal/app"
)

func StartServer(ctx *app.Context, handler http.Handler) error {
	return http.ListenAndServe(fmt.Sprintf("0.0.0.0:%d", ctx.Config.Port), handler)
}
