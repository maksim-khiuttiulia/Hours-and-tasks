package com.mk.hoursandtasks.controller;

import com.mk.hoursandtasks.dto.ProjectDto;
import com.mk.hoursandtasks.dto.TaskDto;
import com.mk.hoursandtasks.dto.TaskLabelDto;
import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.task.Task;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.exceptions.ValidationException;
import com.mk.hoursandtasks.service.ProjectService;
import com.mk.hoursandtasks.service.TaskLabelService;
import com.mk.hoursandtasks.service.TaskService;
import liquibase.util.BooleanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/projects")
public class ProjectController extends ControllerAncestor {
    @Autowired
    private ProjectService projectService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskLabelService taskLabelService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public @ResponseBody
    Page<ProjectDto> getProjects(Pageable pageable, HttpServletRequest request){
        User user = getCurrentUser(request);
        return projectService.getAllProjects(user, pageable).map(project -> project.toProjectDto(false, false));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public @ResponseBody
    ProjectDto getProject(@PathVariable(name = "id") Long id, HttpServletRequest request){
        User user = getCurrentUser(request);
        Project project = projectService.getProject(id);
        if (project == null){
            throw new ValidationException("Project not exists");
        }
        if (project.getOwner() != user){
            throw new ValidationException("User hasn't access");
        }
        return project.toProjectDto(false, true);
    }

    @RequestMapping(value = "/{id}/tasks", method = RequestMethod.GET)
    public @ResponseBody
    Page<TaskDto> getTasksInProject(@PathVariable(name = "id") Long id,
                                   @RequestParam(name = "done", required = false) Boolean done,
                                   Pageable pageable, HttpServletRequest request){

        User user = getCurrentUser(request);
        Project project = projectService.getProject(id);
        if (project == null){
            throw new ValidationException("Project not exists");
        }
        if (project.getOwner() != user){
            throw new ValidationException("User hasn't access");
        }
        Page<Task> taskPage = null;
        if (done == null){
            taskPage = taskService.getAllInProject(project, pageable);
        } else {
            taskPage = taskService.getAllInProject(project, BooleanUtils.isTrue(done), pageable);
        }

        return taskPage.map(Task::toTaskDto);
    }

    @RequestMapping(value = "/{id}/labels", method = RequestMethod.GET)
    public @ResponseBody
    List<TaskLabelDto> getLabelsInProject(@PathVariable(name = "id") Long id, HttpServletRequest request){
        User user = getCurrentUser(request);
        Project project = projectService.getProject(id);
        if (project == null){
            throw new ValidationException("Project not exists");
        }
        if (project.getOwner() != user){
            throw new ValidationException("User hasn't access");
        }
        return taskLabelService.getAllOnProject(project).stream().map(TaskLabel::toTaskLabelDto).collect(Collectors.toList());
    }

    @RequestMapping(value = "/{id}/labels", method = RequestMethod.POST)
    public @ResponseBody TaskLabelDto addTaskLabel(@PathVariable(name = "id") Long id, @RequestBody TaskLabelDto dto, HttpServletRequest request){
        User user = getCurrentUser(request);
        Project project = projectService.getProject(id);
        if (project == null){
            throw new ValidationException("Project not exists");
        }
        if (project.getOwner() != user){
            throw new ValidationException("User hasn't access");
        }
        TaskLabel taskLabel = taskLabelService.convert(dto);
        return taskLabelService.addTaskLabel(taskLabel, project).toTaskLabelDto();
    }

    @RequestMapping(value = "/{id}/labels/{labelId}", method = RequestMethod.POST)
    public ResponseEntity<?> deleteTaskLabel(@PathVariable(name = "id") Long id, @PathVariable(name = "labelId") Long labelId, HttpServletRequest request){
        User user = getCurrentUser(request);
        Project project = projectService.getProject(id);
        if (project == null){
            throw new ValidationException("Project not exists");
        }
        if (project.getOwner() != user){
            throw new ValidationException("User hasn't access");
        }
        TaskLabel taskLabel = taskLabelService.getTaskLabel(labelId, project);
        if (taskLabel != null){
            taskLabelService.deleteTaskLabel(taskLabel);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public @ResponseBody ProjectDto createProject(@RequestBody ProjectDto projectDto, HttpServletRequest request){
        User user = getCurrentUser(request);
        Project project = projectService.convert(projectDto);
        return projectService.createProject(project, user).toProjectDto(false, false);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public @ResponseBody ProjectDto updateProject(@PathVariable(name = "id") Long id, @RequestBody ProjectDto projectDto, HttpServletRequest request){
        User user = getCurrentUser(request);
        Project project = projectService.getProject(id);
        if (project == null){
            throw new ValidationException("Project not exist");
        }
        if (!user.equals(project.getOwner())){
            throw new ValidationException("User hasnt access to project");
        }
        Project newProject = projectService.convert(projectDto);
        return projectService.updateProject(project.getProjectId(), newProject).toProjectDto(false, false);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?>  deleteProject(@PathVariable(name = "id") Long id, HttpServletRequest request){
        User user = getCurrentUser(request);
        Project project = projectService.getProject(id);
        if (project == null){
            throw new ValidationException("Project not exist");
        }
        if (!user.equals(project.getOwner())){
            throw new ValidationException("User hasnt access to project");
        }
        projectService.deleteProject(project);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
