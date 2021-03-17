package com.task.trello.services.impl;

import com.task.trello.models.User;
import com.task.trello.services.UserDataService;
import com.task.trello.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserDataServiceImpl implements UserDataService {
    @Autowired
    private UserService userService;

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            User user = (User) authentication.getPrincipal();
            user = userService.getUserByEmail(user.getEmail());
            return user;
        }
        return null;
    }
}
