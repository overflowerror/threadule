package app

import (
	"net/url"
	"threadule/backend/internal/data/models"
)

type Logic interface {
	AuthenticateSession(token string) (*models.User, error)
	Login(username, password string) (string, error)

	GetAccounts(user *models.User) ([]models.Account, error)
	AddAccount(user *models.User) (string, *url.URL, error)
	AddAccountResolve(user *models.User, id string, pin string) (*models.Account, error)
}
