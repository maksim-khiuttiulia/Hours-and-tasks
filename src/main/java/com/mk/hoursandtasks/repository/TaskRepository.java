package com.mk.hoursandtasks.repository;

import com.mk.hoursandtasks.entity.task.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
