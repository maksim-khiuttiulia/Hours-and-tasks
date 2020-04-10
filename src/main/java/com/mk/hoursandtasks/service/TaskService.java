package com.mk.hoursandtasks.service;

import com.mk.hoursandtasks.dto.TaskDto;
import com.mk.hoursandtasks.dto.TaskLabelDto;
import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.task.Task;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import com.mk.hoursandtasks.exceptions.ValidationException;
import com.mk.hoursandtasks.repository.ProjectRepository;
import com.mk.hoursandtasks.repository.TaskLabelRepository;
import com.mk.hoursandtasks.repository.TaskRepository;
import com.mk.hoursandtasks.utils.DateUtils;
import liquibase.util.BooleanUtils;
import liquibase.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskLabelRepository taskLabelRepository;

    @Autowired
    private ProjectRepository projectRepository;


    public List<TaskDto> getAll(){
        List<Task> tasks = taskRepository.findAll();
        List<TaskDto> taskDtos = tasks.stream().map(Task::toTaskDto).collect(Collectors.toList());
        return taskDtos;
    }

    public TaskDto getTask(Long taskId){
        Task task = taskRepository.findById(taskId).orElse(null);
        if (task == null){
            throw new ValidationException("Task " + taskId + " doesnt exist");
        }
        return task.toTaskDto();
    }

    @Transactional(rollbackFor = Exception.class)
    public TaskDto saveTask(TaskDto taskDto){
        Date currentDate = DateUtils.getCurrentDate();
        if (taskDto == null){
            throw new ValidationException("Task is null");
        }

        Task task = new Task();
        task.setTaskId(taskDto.getTaskId());

        if (StringUtils.isEmpty(taskDto.getName())){
            throw new ValidationException("Task name is empty");
        }
        task.setName(taskDto.getName());
        task.setText(taskDto.getText());
        task.setCreated(currentDate);

        if (taskDto.getDeadline() != null){
            if (taskDto.getDeadline().before(currentDate)){
                throw new ValidationException("Deadline is before current date");
            }
            task.setDeadline(taskDto.getDeadline());
        }

        task.setIsDone(BooleanUtils.isTrue(taskDto.isDone()));

        if (taskDto.getProjectId() == null){
            throw new ValidationException("Project id is null");
        }

        Project project = projectRepository.getOne(taskDto.getProjectId());
        if (project == null){
            throw new ValidationException("Project with id " + taskDto.getProjectId() + " doesnt exist");
        }
        task.setProject(project);

        task.getLabels().clear();
        for (TaskLabelDto taskLabelDto : taskDto.getLabels()){
            TaskLabel taskLabel = taskLabelRepository.getOne(taskLabelDto.getLabelId());
            if (taskLabel == null){
                throw new ValidationException("Task label " + taskLabelDto.getLabelId() + " not exists");
            }
            task.getLabels().add(taskLabel);
        }

        task = taskRepository.save(task);
        taskDto.setTaskId(task.getTaskId());
        return taskDto;
    }

    @Transactional(rollbackFor = Exception.class)
    public TaskDto updateTask(Long taskId, TaskDto taskDto){
        Date currentDate = DateUtils.getCurrentDate();
        if (taskId == null){
            throw new ValidationException("Task id is null");
        }
        if (taskDto == null){
            throw new ValidationException("Task is null");
        }

        Task task = taskRepository.getOne(taskId);
        if (task == null){
            throw new ValidationException("Task with id " + taskId + " doesnt exist");
        }

        if (taskDto.getText() != null){
            task.setText(taskDto.getText());
        }

        if (taskDto.getDeadline() != null){
            if (taskDto.getDeadline().before(currentDate)){
                throw new ValidationException("Deadline is before current date");
            }
            task.setDeadline(taskDto.getDeadline());
        }

        task.setIsDone(BooleanUtils.isTrue(taskDto.isDone()));

        task.getLabels().clear();
        for (TaskLabelDto taskLabelDto : taskDto.getLabels()){
            TaskLabel taskLabel = taskLabelRepository.getOne(taskLabelDto.getLabelId());
            if (taskLabel == null){
                throw new ValidationException("Task label " + taskLabelDto.getLabelId() + " not exists");
            }
            task.getLabels().add(taskLabel);
        }

        task = taskRepository.save(task);
        taskDto.setTaskId(task.getTaskId());
        return taskDto;
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteTask(TaskDto taskDto){
        if (taskDto == null){
            throw new ValidationException("Task is null");
        }
        if (taskDto.getTaskId() == null){
            throw new ValidationException("Task id is null");
        }
        taskRepository.deleteById(taskDto.getTaskId());
    }
}
