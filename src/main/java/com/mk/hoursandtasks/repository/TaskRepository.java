package com.mk.hoursandtasks.repository;

import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.task.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface TaskRepository extends PagingAndSortingRepository<Task, Long> {
    List<Task> findAllByProject(Project project);
    Page<Task> findAllByProject(Project project, Pageable pageable);
    Page<Task> findAllByProjectAndIsDone(Project project, boolean isDone ,Pageable pageable);
}
