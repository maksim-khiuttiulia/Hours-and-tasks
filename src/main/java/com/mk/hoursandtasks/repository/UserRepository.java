package com.mk.hoursandtasks.repository;

import com.mk.hoursandtasks.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
