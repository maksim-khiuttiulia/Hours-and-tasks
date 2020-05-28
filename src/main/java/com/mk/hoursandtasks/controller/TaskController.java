package com.mk.hoursandtasks.controller;

import com.mk.hoursandtasks.dto.TaskDto;
import com.mk.hoursandtasks.entity.task.Task;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/api/tasks")
public class TaskController extends ControllerAncestor {

    @Autowired
    private TaskService taskService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Page<TaskDto> getAllTasks(Pageable pageable, HttpServletRequest request){
        User user = getCurrentUser(request);
        return taskService.getAll(user, pageable).map(Task::toTaskDto);
    }

    @RequestMapping(value = "/{taskId}", method = RequestMethod.GET)
    public @ResponseBody TaskDto getTask(@PathVariable(name = "taskId") Long taskId, HttpServletRequest request){
        User user = getCurrentUser(request);
        Task task = taskService.getTask(taskId, user);
        if (task == null){
            return null;
        }
        return task.toTaskDto();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<TaskDto> addNewTask(@RequestBody TaskDto taskDto, HttpServletRequest request){
        User user = getCurrentUser(request);
        Task newTask = taskService.convertToTask(taskDto);
        newTask =  taskService.createNewTask(newTask, user);
        return new ResponseEntity<>(newTask.toTaskDto(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{taskId}", method = RequestMethod.PUT)
    public ResponseEntity<TaskDto> updateTask(@PathVariable(name = "taskId") Long taskId, @RequestBody TaskDto taskDto, HttpServletRequest request){
        User user = getCurrentUser(request);
        Task task = taskService.convertToTask(taskDto);
        taskService.updateTask(taskId, task, user);
        return new ResponseEntity<>(task.toTaskDto(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{taskId}/done", method = RequestMethod.PUT)
    public ResponseEntity<TaskDto> doneTask(@PathVariable(name = "taskId") Long taskId, HttpServletRequest request){
        User user = getCurrentUser(request);
        Task task =  taskService.doneTask(taskId, true, user);
        return new ResponseEntity<>(task.toTaskDto(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{taskId}/notDone", method = RequestMethod.PUT)
    public ResponseEntity<TaskDto> notDoneTask(@PathVariable(name = "taskId") Long taskId, HttpServletRequest request){
        User user = getCurrentUser(request);
        Task task =  taskService.doneTask(taskId, false, user);
        return new ResponseEntity<>(task.toTaskDto(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{taskId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteTask(@PathVariable(name = "taskId") Long taskId, HttpServletRequest request){
        User user = getCurrentUser(request);
        taskService.deleteTask(taskId, user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
