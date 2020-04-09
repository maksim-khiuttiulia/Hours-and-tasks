package com.mk.hoursandtasks.repository;

import com.mk.hoursandtasks.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
