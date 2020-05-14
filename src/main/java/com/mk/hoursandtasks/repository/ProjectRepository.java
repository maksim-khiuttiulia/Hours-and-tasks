package com.mk.hoursandtasks.repository;

import com.mk.hoursandtasks.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByOwner_Username(String username);
    Project findByProjectIdAndOwner_Username(Long projectId, String username);
}
