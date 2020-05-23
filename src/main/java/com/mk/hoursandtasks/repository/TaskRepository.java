package com.mk.hoursandtasks.repository;

import com.mk.hoursandtasks.entity.task.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface TaskRepository extends PagingAndSortingRepository<Task, Long> {
    List<Task> findAllByProject_ProjectId(Long projectId);
    Page<Task> findAllByProject_ProjectId(Long projectId, Pageable pageable);
    Page<Task> findAllByProject_ProjectIdAndIsDone(Long projectId, boolean isDone ,Pageable pageable);
}
