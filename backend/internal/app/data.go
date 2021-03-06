package app

import (
	uuid "github.com/satori/go.uuid"
	"threadule/backend/internal/data/models"
)

type Data interface {
	Cleanup() error

	CountUsers() (int64, error)
	AddUser(user *models.User) error
	UpdateUser(user *models.User) error
	GetUser(id uuid.UUID) (*models.User, error)
	GetUserByUsername(username string) (*models.User, error)
	AddUserToGroup(user *models.User, group *models.Group) error
	DeleteUserFromGroup(user *models.User, group *models.Group) error

	AddGroup(group *models.Group) error

	GetSession(id string) (*models.Session, error)
	AddSession(session *models.Session) error
	UpdateSession(session *models.Session) error
	CleanupSessions() error

	GetAccountsByUser(user *models.User) ([]models.Account, error)
	GetAccountById(user *models.User, id string) (*models.Account, error)
	AddAccount(account *models.Account) error
	UpdateAccount(account *models.Account) error

	AddThread(thread *models.Thread) error
	UpdateThread(thread *models.Thread) error
	DeleteThread(id uuid.UUID) error
	GetThread(id uuid.UUID, user *models.User) (*models.Thread, error)
	GetThreads(user *models.User) ([]models.Thread, error)
	GetScheduledThreads() ([]models.Thread, error)
	GetTweetsForThread(thread *models.Thread) ([]models.Tweet, error)
	UpdateThreadWithoutTweets(thread *models.Thread) error

	UpdateTweet(tweet *models.Tweet) error
}
