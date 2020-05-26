package com.mk.hoursandtasks.controller;

import com.mk.hoursandtasks.dto.ProjectDto;
import com.mk.hoursandtasks.dto.TaskDto;
import com.mk.hoursandtasks.dto.TaskLabelDto;
import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.task.Task;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.service.ProjectService;
import com.mk.hoursandtasks.service.TaskLabelService;
import com.mk.hoursandtasks.service.TaskService;
import liquibase.util.BooleanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        return projectService.getAllProjects(user, pageable).map(Project::toProjectDto);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public @ResponseBody
    ProjectDto getProjects(@PathVariable(name = "id") Long id, HttpServletRequest request){
        User user = getCurrentUser(request);
        return projectService.getProject(id, user).toProjectDto();
    }

    @RequestMapping(value = "/{id}/tasks", method = RequestMethod.GET)
    public @ResponseBody
    Page<TaskDto> getTaskInProject(@PathVariable(name = "id") Long id,
                                   @RequestParam(name = "done", required = false) Boolean done,
                                   Pageable pageable, HttpServletRequest request){

        User user = getCurrentUser(request);
        Project project = projectService.getProject(id, user);
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
        Project project = projectService.getProject(id, user);
        return taskLabelService.getAllOnProject(project).stream().map(TaskLabel::toTaskLabelDto).collect(Collectors.toList());
    }


}
