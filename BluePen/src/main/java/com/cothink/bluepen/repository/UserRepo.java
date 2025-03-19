package com.cothink.bluepen.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cothink.bluepen.entity.UserEntity;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, String>{

}
