package com.mk.hoursandtasks.service;

import com.mk.hoursandtasks.dto.TaskDto;
import com.mk.hoursandtasks.dto.TaskLabelDto;
import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.task.Task;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.exceptions.ValidationException;
import com.mk.hoursandtasks.repository.ProjectRepository;
import com.mk.hoursandtasks.repository.TaskLabelRepository;
import com.mk.hoursandtasks.repository.TaskRepository;
import com.mk.hoursandtasks.utils.DateUtils;
import liquibase.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskLabelRepository taskLabelRepository;

    @Autowired
    private ProjectRepository projectRepository;


    public List<Task> getAll(User user){
        Objects.requireNonNull(user);
        List<Task> tasks = new LinkedList<>();
        List<Project> projects = projectRepository.findAllByOwner_Username(user.getUsername());
        for (Project project : projects){
            tasks.addAll(taskRepository.findAllByProject_ProjectId(project.getProjectId()));
        }
        return tasks;
    }

    public List<Task> getAllInProject(Project project){
        Objects.requireNonNull(project);
        return taskRepository.findAllByProject_ProjectId(project.getProjectId());
    }

    public Task getTask(Long taskId){
        return taskRepository.findById(taskId).orElse(null);
    }

    @Transactional(rollbackFor = Exception.class)
    public Task createNewTask(Task task){
        Date currentDate = DateUtils.getCurrentDate();
        if (task == null){
            throw new ValidationException("Task is null");
        }

        if (StringUtils.isEmpty(task.getName())){
            throw new ValidationException("Task name is empty");
        }
        task.setCreated(currentDate);

        if (task.getDeadline() != null){
            if (task.getDeadline().before(currentDate)){
                throw new ValidationException("Deadline is before current date");
            }
        }

        if (task.getProject() == null){
            throw new ValidationException("Project is null");
        }

        if (task.getProject().getProjectId() == null){
            throw new ValidationException("Project id is null");
        }

        Project project = projectRepository.getOne(task.getProject().getProjectId());
        if (project == null){
            throw new ValidationException("Project with id " + task.getProject().getProjectId() + " doesnt exist");
        }
        task.setProject(project);

        for (TaskLabel taskLabel : task.getLabels()){
            TaskLabel taskLabelDB = taskLabelRepository.getOne(taskLabel.getLabelId());
            if (taskLabelDB == null){
                throw new ValidationException("Task label " + taskLabel.getLabelId() + " not exists");
            }
            task.getLabels().add(taskLabelDB);
        }

        task = taskRepository.save(task);
        return task;
    }

    @Transactional(rollbackFor = Exception.class)
    public Task updateTask(Long taskId, Task task){
        Date currentDate = DateUtils.getCurrentDate();
        if (taskId == null){
            throw new ValidationException("Task id is null");
        }
        if (task == null){
            throw new ValidationException("Task is null");
        }

        Task taskFromDB = taskRepository.getOne(taskId);
        if (taskFromDB == null){
            throw new ValidationException("Task with id " + taskId + " doesnt exist");
        }

        taskFromDB.setDescription(task.getDescription());

        if (task.getDeadline() != null){
            if (task.getDeadline().before(currentDate)){
                throw new ValidationException("Deadline is before current date");
            }
            taskFromDB.setDeadline(task.getDeadline());
        }

        task.setIsDone(task.getIsDone());

        taskFromDB.getLabels().clear();
        for (TaskLabel taskLabel : task.getLabels()){
            TaskLabel taskLabelDB = taskLabelRepository.getOne(taskLabel.getLabelId());
            if (taskLabelDB == null){
                throw new ValidationException("Task label " + taskLabel.getLabelId() + " not exists");
            }
            taskFromDB.getLabels().add(taskLabelDB);
        }

        taskFromDB = taskRepository.save(taskFromDB);
        return taskFromDB;
    }

    @Transactional(rollbackFor = Exception.class)
    public Task doneTask(Long taskId, boolean done){
        if (taskId == null){
            throw new ValidationException("Task id is null");
        }

        Task task = taskRepository.getOne(taskId);
        if (task == null){
            throw new ValidationException("Task with id " + taskId + " doesnt exist");
        }

        task.setIsDone(done);

        task = taskRepository.save(task);
        return task;
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteTask(Long taskId){
        taskRepository.deleteById(taskId);
    }

    public Task convertToTask(TaskDto taskDto){
        if (taskDto == null){
            return null;
        }
        Task task = new Task();
        task.setTaskId(taskDto.getId());
        task.setName(taskDto.getName());
        task.setDescription(taskDto.getDescription());
        task.setCreated(taskDto.getCreated());
        task.setDeadline(taskDto.getDeadline());
        task.setIsDone(taskDto.isDone());
        Project project = projectRepository.getOne(taskDto.getProjectId());
        if (project == null){
            throw new ValidationException("Project with id " + taskDto.getProjectId() + " doesnt exist");
        }
        task.setProject(project);

        task.getLabels().clear();
        for (TaskLabelDto taskLabelDto : taskDto.getLabels()){
            TaskLabel taskLabelDB = taskLabelRepository.getOne(taskLabelDto.getId());
            if (taskLabelDB == null){
                throw new ValidationException("Task label " + taskLabelDto.getId() + " not exists");
            }
            task.getLabels().add(taskLabelDB);
        }
        return task;
    }
}
