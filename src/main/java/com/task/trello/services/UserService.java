package com.task.trello.services;

import com.task.trello.models.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    User addUser(String email, String password, String fullName);

    User getUserByEmail(String email);

    User updateUserData(User user);

}
