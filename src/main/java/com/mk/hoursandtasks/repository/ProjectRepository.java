package com.mk.hoursandtasks.repository;

import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ProjectRepository extends PagingAndSortingRepository<Project, Long> {
    List<Project> findAllByOwner(User user);
    Page<Project> findAllByOwner(User user, Pageable pageable);
    Project findByProjectIdAndOwner(Long projectId, User user);
}
