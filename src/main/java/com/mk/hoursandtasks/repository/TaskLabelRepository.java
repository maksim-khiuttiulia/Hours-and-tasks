package com.mk.hoursandtasks.repository;

import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskLabelRepository extends JpaRepository<TaskLabel, Long> {
}
