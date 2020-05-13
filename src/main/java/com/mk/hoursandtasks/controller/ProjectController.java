package com.mk.hoursandtasks.controller;

import com.mk.hoursandtasks.dto.ProjectDto;
import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/projects")
public class ProjectController extends ControllerAncestor {
    @Autowired
    private ProjectService projectService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public @ResponseBody
    List<ProjectDto> getProjects(HttpServletRequest request){
        User user = getCurrentUser(request);
        return projectService.getAllProjects(user).stream().map(Project::toProjectDto).collect(Collectors.toList());
    }
}
