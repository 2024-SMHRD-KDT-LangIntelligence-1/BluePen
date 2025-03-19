package com.cothink.bluepen.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cothink.bluepen.entity.TblUser;

@Repository
public interface UserRepo extends JpaRepository<TblUser, String> {

}
