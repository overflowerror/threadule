package data

import (
	"threadule/backend/internal/data/models"
	"time"
)

func (d *Data) UpdateThread(thread *models.Thread) error {
	return d.db.
		Save(thread).
		Error
}

func (d *Data) GetTweetsForThread(thread *models.Thread) ([]models.Tweet, error) {
	var tweets []models.Tweet
	err := d.db.
		Where("thread_id = ?", thread.ID).
		Order("ordinal ASC").
		Find(&tweets).
		Error
	return tweets, err
}

func (d *Data) GetScheduledThreads() ([]models.Thread, error) {
	var threads []models.Thread

	err := d.db.
		Where("scheduled_for <= ?", time.Now()).
		Where("status = ?", models.ThreadScheduled).
		Find(&threads).
		Error
	return threads, err
}
