package com.mk.hoursandtasks.service;

import com.mk.hoursandtasks.dto.TaskDto;
import com.mk.hoursandtasks.dto.TaskLabelDto;
import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.task.Task;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.exceptions.ValidationException;
import com.mk.hoursandtasks.repository.TaskRepository;
import com.mk.hoursandtasks.utils.DateUtils;
import liquibase.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskLabelService taskLabelService;

    @Autowired
    private ProjectService projectService;


    public List<Task> getAll(User user){
        Objects.requireNonNull(user);
        List<Task> tasks = new LinkedList<>();
        List<Project> projects = projectService.getAllProjects(user);
        for (Project project : projects){
            tasks.addAll(taskRepository.findAllByProject_ProjectId(project.getProjectId()));
        }
        return tasks;
    }

    public List<Task> getAllInProject(Project project){
        Objects.requireNonNull(project);
        return taskRepository.findAllByProject_ProjectId(project.getProjectId());
    }

    public Page<Task> getAllInProject(Project project, Pageable pageable){
        Objects.requireNonNull(project);
        return taskRepository.findAllByProject_ProjectId(project.getProjectId(), pageable);
    }

    public Task getTask(Long taskId, User user){
        Objects.requireNonNull(taskId);
        Objects.requireNonNull(user);
        Task task = taskRepository.findById(taskId).orElse(null);
        if (task == null){
            return null;
        }
        checkTaskAccess(task,user);
        return task;
    }

    @Transactional(rollbackFor = Exception.class)
    public Task createNewTask(Task task, User user){
        Date currentDate = DateUtils.getCurrentDate();
        if (task == null){
            throw new ValidationException("Task is null");
        }

        if (StringUtils.isEmpty(task.getName())){
            throw new ValidationException("Task name is empty");
        }

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

        Project project = projectService.getProject(task.getProject().getProjectId(), user);
        if (project == null){
            throw new ValidationException("Project with id " + task.getProject().getProjectId() + " doesnt exist");
        }
        if (!project.getOwner().equals(user)){
            throw new ValidationException("User hasnt access to this project");
        }

        List<TaskLabel> taskLabels = new ArrayList<>();
        for (TaskLabel taskLabel : task.getLabels()){
            TaskLabel taskLabelDB = taskLabelService.getTaskLabel(taskLabel.getLabelId(), project);
            if (taskLabelDB == null){
                throw new ValidationException("Task label " + taskLabel.getLabelId() + " not exists");
            }
            taskLabels.add(taskLabelDB);
        }
        task.setLabels(taskLabels);

        task = taskRepository.save(task);
        return task;
    }

    @Transactional(rollbackFor = Exception.class)
    public Task updateTask(Long taskId, Task task, User user){
        Date currentDate = DateUtils.getCurrentDate();
        if (taskId == null){
            throw new ValidationException("Task id is null");
        }
        if (task == null){
            throw new ValidationException("Task is null");
        }

        Task taskFromDB = taskRepository.findById(taskId).orElse(null);
        if (taskFromDB == null){
            throw new ValidationException("Task with id " + taskId + " doesnt exist");
        }
        if (!taskFromDB.getProject().getOwner().equals(user)){
            throw new ValidationException("User hasnt access to this project");
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
            TaskLabel taskLabelDB = taskLabelService.getTaskLabel(taskLabel.getLabelId(), taskFromDB.getProject());
            if (taskLabelDB == null){
                throw new ValidationException("Task label " + taskLabel.getLabelId() + " not exists");
            }
            taskFromDB.getLabels().add(taskLabelDB);
        }

        taskFromDB = taskRepository.save(taskFromDB);
        return taskFromDB;
    }

    @Transactional(rollbackFor = Exception.class)
    public Task doneTask(Long taskId, boolean done, User user){
        if (taskId == null){
            throw new ValidationException("Task id is null");
        }

        Task task = taskRepository.findById(taskId).orElse(null);
        if (task == null){
            throw new ValidationException("Task with id " + taskId + " doesnt exist");
        }
        checkTaskAccess(task, user);

        task.setIsDone(done);

        task = taskRepository.save(task);
        return task;
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteTask(Long taskId, User user){
        Task task = taskRepository.findById(taskId).orElse(null);
        if (task != null){
            checkTaskAccess(task, user);
            taskRepository.deleteById(taskId);
        }
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
        Project project = projectService.getProject(taskDto.getProjectId());
        if (project == null){
            throw new ValidationException("Project with id " + taskDto.getProjectId() + " doesnt exist");
        }
        task.setProject(project);

        task.getLabels().clear();
        for (TaskLabelDto taskLabelDto : taskDto.getLabels()){
            TaskLabel taskLabelDB = taskLabelService.getTaskLabel(taskLabelDto.getId(), project);
            if (taskLabelDB == null){
                throw new ValidationException("Task label " + taskLabelDto.getId() + " not exists");
            }
            task.getLabels().add(taskLabelDB);
        }
        return task;
    }

    private void checkTaskAccess(Task task, User user){
        if (!task.getProject().getOwner().equals(user)){
            throw new ValidationException("User hasnt access to this project");
        }
    }

    private void checkProjectAccess(Task task, User user){
        if (!task.getProject().getOwner().equals(user)){
            throw new ValidationException("User hasnt access to this project");
        }
    }
}
