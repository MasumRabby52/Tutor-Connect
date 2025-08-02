package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Teacher struct {
	ID            uint   `json:"id" gorm:"primaryKey"`
	Name          string `json:"name"`
	Email         string `json:"email"`
	PhoneNumber   string `json:"phoneNumber"`
	Bio           string `json:"bio"`
	Location      string `json:"location"`
	Qualification string `json:"qualification"`
	Availability  string `json:"availability"`
	Subject       string `json:"subject"`
	ImageURL      string `json:"imageUrl"`
}

var DB *gorm.DB

// Connect to MySQL Database
func initDB() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbUser, dbPass, dbHost, dbPort, dbName)

	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto migrate Teacher table
	DB.AutoMigrate(&Teacher{})
	fmt.Println("Database Connected & Migrated!")
}

func main() {
	initDB()
	r := gin.Default()

	// GET all teachers
	r.GET("/api/teachers", func(c *gin.Context) {
		var teachers []Teacher
		DB.Find(&teachers)
		c.JSON(http.StatusOK, teachers)
	})

	// GET teacher by ID
	r.GET("/api/teachers/:id", func(c *gin.Context) {
		id := c.Param("id")
		var teacher Teacher
		if err := DB.First(&teacher, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Teacher not found"})
			return
		}
		c.JSON(http.StatusOK, teacher)
	})

	// POST add new teacher
	r.POST("/api/teachers", func(c *gin.Context) {
		var newTeacher Teacher
		if err := c.BindJSON(&newTeacher); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		DB.Create(&newTeacher)
		c.JSON(http.StatusCreated, newTeacher)
	})

	// PUT update teacher
	r.PUT("/api/teachers/:id", func(c *gin.Context) {
		idParam := c.Param("id")
		id, _ := strconv.Atoi(idParam)

		var teacher Teacher
		if err := DB.First(&teacher, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Teacher not found"})
			return
		}

		var updatedTeacher Teacher
		if err := c.BindJSON(&updatedTeacher); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		teacher.Name = updatedTeacher.Name
		teacher.Email = updatedTeacher.Email
		teacher.PhoneNumber = updatedTeacher.PhoneNumber
		teacher.Bio = updatedTeacher.Bio
		teacher.Location = updatedTeacher.Location
		teacher.Qualification = updatedTeacher.Qualification
		teacher.Availability = updatedTeacher.Availability
		teacher.Subject = updatedTeacher.Subject
		teacher.ImageURL = updatedTeacher.ImageURL

		DB.Save(&teacher)
		c.JSON(http.StatusOK, teacher)
	})

	// DELETE teacher
	r.DELETE("/api/teachers/:id", func(c *gin.Context) {
		id := c.Param("id")
		if err := DB.Delete(&Teacher{}, id).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete teacher"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Teacher deleted"})
	})

	r.Run(":8080")
}
