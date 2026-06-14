package cache

import (
	"sync"
	"time"
)


type entry struct {
	data []byte
	expiresAt time.Time
}

type Cache struct {
	mu sync.RWMutex
	items map[string]entry
}

func New() *Cache{
	return &Cache{
		items: make(map[string]entry),
	}
}

func (c *Cache) Get(key string) ([]byte, bool){
	c.mu.RLock()
	defer c.mu.RUnlock()

	item, exists := c.items[key]
	
	if !exists{
		return nil, false
	}

	if time.Now().After(item.expiresAt){
		return nil, false
	}

	return item.data, true
}

func (c *Cache) Set(key string, data []byte, ttl time.Duration){
	c.mu.Lock()
	defer c.mu.Unlock()

	c.items[key] = entry{
		data: data,
		expiresAt: time.Now().Add(ttl),
	}
}