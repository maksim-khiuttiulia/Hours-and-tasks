package com.mk.hoursandtasks.controller;

import com.mk.hoursandtasks.dto.TaskDto;
import com.mk.hoursandtasks.entity.task.Task;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/tasks")
public class TaskController extends ControllerAncestor {

    @Autowired
    private TaskService taskService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<TaskDto> getAllTasks(HttpServletRequest request){
        User user = getCurrentUser(request);
        return taskService.getAll(user).stream().map(Task::toTaskDto).collect(Collectors.toList());
    }

    @RequestMapping(value = "/{taskId}", method = RequestMethod.GET)
    public @ResponseBody TaskDto getAllTasks(@PathVariable(name = "taskId") Long taskId){
        Task task = taskService.getTask(taskId);
        if (task == null){
            return null;
        }
        return task.toTaskDto();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<TaskDto> addNewTask(@RequestBody TaskDto taskDto){
        Task newTask = taskService.convertToTask(taskDto);
        newTask =  taskService.createNewTask(newTask);
        return new ResponseEntity<>(newTask.toTaskDto(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{taskId}", method = RequestMethod.PUT)
    public ResponseEntity<TaskDto> updateTask(@PathVariable(name = "taskId") Long taskId, @RequestBody TaskDto taskDto){
        Task task = taskService.convertToTask(taskDto);
        taskService.updateTask(taskId, task);
        return new ResponseEntity<>(task.toTaskDto(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{taskId}/done", method = RequestMethod.PUT)
    public ResponseEntity<TaskDto> doneTask(@PathVariable(name = "taskId") Long taskId){
        Task task =  taskService.doneTask(taskId, true);
        return new ResponseEntity<>(task.toTaskDto(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{taskId}/notDone", method = RequestMethod.PUT)
    public ResponseEntity<TaskDto> notDoneTask(@PathVariable(name = "taskId") Long taskId){
        Task task =  taskService.doneTask(taskId, false);
        return new ResponseEntity<>(task.toTaskDto(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{taskId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteTask(@PathVariable(name = "taskId") Long taskId){
        taskService.deleteTask(taskId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
