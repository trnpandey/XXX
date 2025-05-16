package com.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.app.model.UserData;

public interface UserRepository extends MongoRepository<UserData, String> {}
