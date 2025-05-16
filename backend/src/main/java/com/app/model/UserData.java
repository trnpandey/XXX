package com.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "userData")
public class UserData {
    @Id
    private String userId; // Google email
    private double venterRating;
    private double listenerRating;
    private int karmaPoints;
    // getters/setters/constructors omitted for brevity
}
