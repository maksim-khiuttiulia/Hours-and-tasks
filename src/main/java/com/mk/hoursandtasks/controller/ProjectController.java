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
import org.springframework.beans.factory.annotation.Autowired;
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
    List<ProjectDto> getProjects(HttpServletRequest request){
        User user = getCurrentUser(request);
        return projectService.getAllProjects(user).stream().map(Project::toProjectDto).collect(Collectors.toList());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public @ResponseBody
    ProjectDto getProjects(@PathVariable(name = "id") Long id, HttpServletRequest request){
        User user = getCurrentUser(request);
        return projectService.getProject(id, user).toProjectDto();
    }

    @RequestMapping(value = "/{id}/tasks", method = RequestMethod.GET)
    public @ResponseBody
    List<TaskDto> getTaskInProject(@PathVariable(name = "id") Long id, HttpServletRequest request){
        User user = getCurrentUser(request);
        Project project = projectService.getProject(id, user);
        return taskService.getAllInProject(project).stream().map(Task::toTaskDto).collect(Collectors.toList());
    }

    @RequestMapping(value = "/{id}/labels", method = RequestMethod.GET)
    public @ResponseBody
    List<TaskLabelDto> getLabelsInProject(@PathVariable(name = "id") Long id, HttpServletRequest request){
        User user = getCurrentUser(request);
        Project project = projectService.getProject(id, user);
        return taskLabelService.getAllOnProject(project).stream().map(TaskLabel::toTaskLabelDto).collect(Collectors.toList());
    }


}
