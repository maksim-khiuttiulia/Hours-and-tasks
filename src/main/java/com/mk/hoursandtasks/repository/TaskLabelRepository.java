package com.mk.hoursandtasks.repository;

import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskLabelRepository extends JpaRepository<TaskLabel, Long> {
    List<TaskLabel> findAllByProject(Project project);
    TaskLabel findByLabelIdAndProject(Long labelId, Project project);
}
