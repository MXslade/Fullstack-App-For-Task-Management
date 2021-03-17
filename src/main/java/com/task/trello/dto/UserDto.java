package com.task.trello.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserDto implements Serializable {

    private String fullName;

    private String email;

    private String password;

    private String oldPassword;

    private String newPassword;

}
