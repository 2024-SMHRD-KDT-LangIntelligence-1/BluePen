package com.cothink.bluepen.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cothink.bluepen.entity.Tblschedule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cothink.bluepen.entity.Tblschedule;

@Repository
public interface ScheduleRepo extends JpaRepository<Tblschedule, Integer> {
	
	List<Tblschedule> findByUserId(String userId);
}

