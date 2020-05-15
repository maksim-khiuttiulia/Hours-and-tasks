package com.mk.hoursandtasks.repository;

import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskLabelRepository extends JpaRepository<TaskLabel, Long> {
    List<TaskLabel> findAllByProject_ProjectId(Long projectId);
    TaskLabel findByLabelIdAndProject_ProjectId(Long labelId, Long projectId);
}
