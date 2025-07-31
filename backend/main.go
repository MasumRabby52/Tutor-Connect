package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Teacher struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Subject  string `json:"subject"`
	ImageURL string `json:"imageUrl"`
}

// In-memory "database"
var teachers = []Teacher{
	{ID: 1, Name: "John Doe", Subject: "Math", ImageURL: "https://placekitten.com/200/200"},
	{ID: 2, Name: "Jane Smith", Subject: "Physics", ImageURL: "https://placekitten.com/201/200"},
}

func main() {
	r := gin.Default()

	// GET all teachers
	r.GET("/api/teachers", func(c *gin.Context) {
		c.JSON(http.StatusOK, teachers)
	})

	// GET teacher by ID
	r.GET("/api/teachers/:id", func(c *gin.Context) {
		idParam := c.Param("id")
		id, err := strconv.Atoi(idParam)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid teacher ID"})
			return
		}
		for _, t := range teachers {
			if t.ID == id {
				c.JSON(http.StatusOK, t)
				return
			}
		}
		c.JSON(http.StatusNotFound, gin.H{"error": "Teacher not found"})
	})

	// POST add new teacher
	r.POST("/api/teachers", func(c *gin.Context) {
		var newTeacher Teacher
		if err := c.BindJSON(&newTeacher); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		// Assign new ID (max existing ID + 1)
		maxID := 0
		for _, t := range teachers {
			if t.ID > maxID {
				maxID = t.ID
			}
		}
		newTeacher.ID = maxID + 1
		teachers = append(teachers, newTeacher)
		c.JSON(http.StatusCreated, newTeacher)
	})

	// PUT update teacher by ID
	r.PUT("/api/teachers/:id", func(c *gin.Context) {
		idParam := c.Param("id")
		id, err := strconv.Atoi(idParam)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid teacher ID"})
			return
		}
		var updatedTeacher Teacher
		if err := c.BindJSON(&updatedTeacher); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		for i, t := range teachers {
			if t.ID == id {
				updatedTeacher.ID = id // keep same ID
				teachers[i] = updatedTeacher
				c.JSON(http.StatusOK, updatedTeacher)
				return
			}
		}
		c.JSON(http.StatusNotFound, gin.H{"error": "Teacher not found"})
	})

	// DELETE teacher by ID
	r.DELETE("/api/teachers/:id", func(c *gin.Context) {
		idParam := c.Param("id")
		id, err := strconv.Atoi(idParam)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid teacher ID"})
			return
		}
		for i, t := range teachers {
			if t.ID == id {
				teachers = append(teachers[:i], teachers[i+1:]...)
				c.JSON(http.StatusOK, gin.H{"message": "Teacher deleted"})
				return
			}
		}
		c.JSON(http.StatusNotFound, gin.H{"error": "Teacher not found"})
	})

	r.Run(":8080")
}
