package com.example.admin;

public class TimeSlot {
    private String id;
    private boolean available;

    public TimeSlot(String id, boolean available) {
        this.id = id;
        this.available = available;
    }

    public String getId() {
        return id;
    }

    public boolean isAvailable() {
        return available;
    }
}
