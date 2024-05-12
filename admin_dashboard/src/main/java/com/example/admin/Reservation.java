package com.example.admin;

import org.bson.Document;

import java.util.List;

public class Reservation {
    private String day;
    private List<Document> timeSlots;

    public Reservation(String day, List<Document> timeSlots) {
        this.day = day;
        this.timeSlots = timeSlots;
    }

    public String getDay() {
        return day;
    }

    public List<Document> getTimeSlots() {
        return timeSlots;
    }

    public void setTimeSlots(List<Document> timeSlots) {
        this.timeSlots = timeSlots;
    }

}
