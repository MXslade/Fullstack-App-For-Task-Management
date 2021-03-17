package com.task.trello.services.impl;

import com.task.trello.models.Role;
import com.task.trello.models.User;
import com.task.trello.repositories.RoleRepository;
import com.task.trello.repositories.UserRepository;
import com.task.trello.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(s);
        if (user != null) {
            return user;
        }
        throw new UsernameNotFoundException("USER NOT FOUND");
    }

    @Override
    public User addUser(String email, String password, String fullName) {
        User checkUser = userRepository.findByEmail(email);
        if (checkUser == null) {
            User user = new User();
            user.setEmail(email);
            user.setPassword(password);
            user.setFullName(fullName);
            Role role = roleRepository.findByName("user");
            if (role != null) {
                List<Role> roles = new ArrayList<>();
                roles.add(role);
                user.setRoles(roles);
                user.setPassword(passwordEncoder.encode(password));
                return userRepository.save(user);
            }
        }
        return null;
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User updateUserData(User user) {
        return userRepository.save(user);
    }
}
