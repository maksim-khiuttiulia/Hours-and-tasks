package com.mk.hoursandtasks.repository;

import com.mk.hoursandtasks.entity.tasklabel.TaskLabelColor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskLabelColorRepository extends JpaRepository<TaskLabelColor, Long> {
    TaskLabelColor findByHex(String hex);
}
