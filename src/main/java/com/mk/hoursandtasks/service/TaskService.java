package com.mk.hoursandtasks.service;

import com.mk.hoursandtasks.entity.task.Task;
import com.mk.hoursandtasks.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAll(){
        return taskRepository.findAll();
    }

    public Task saveTask(Task task){
        return taskRepository.save(task);
    }
}
