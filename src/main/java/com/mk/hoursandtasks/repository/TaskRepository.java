package com.mk.hoursandtasks.repository;

import com.mk.hoursandtasks.entity.task.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByProject_ProjectId(Long projectId);
    void deleteByTaskId(Long taskId);
}
