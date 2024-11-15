package com.hexw.web.mapper;

import com.hexw.web.dto.UserDTO;
import com.hexw.web.models.User;

public class UserMapper {

    public static UserDTO toUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setGender(user.getGender());
        userDTO.setContact(user.getContact());
        userDTO.setAddress(user.getAddress());
        userDTO.setDateOfBirth(user.getDateOfBirth());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    public static User toUserEntity(UserDTO userDTO) {
        User user = new User();
        user.setUserId(userDTO.getUserId());
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setGender(userDTO.getGender());
        user.setContact(userDTO.getContact());
        user.setAddress(userDTO.getAddress());
        user.setDateOfBirth(userDTO.getDateOfBirth());
        user.setRole(userDTO.getRole());
        return user;
    }
}
