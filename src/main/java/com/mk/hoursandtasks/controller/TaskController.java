package com.mk.hoursandtasks.controller;

import com.mk.hoursandtasks.dto.TaskDto;
import com.mk.hoursandtasks.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<TaskDto> getAllTasks(){
        return taskService.getAll();
    }

    @RequestMapping(value = "/{taskId}", method = RequestMethod.GET)
    public @ResponseBody TaskDto getAllTasks(@PathVariable(name = "taskId") Long taskId){
        return taskService.getTask(taskId);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<TaskDto> addNewTask(@RequestBody TaskDto taskDto){
        TaskDto newTask =  taskService.createNewTask(taskDto);
        return new ResponseEntity<>(newTask, HttpStatus.OK);
    }

}
