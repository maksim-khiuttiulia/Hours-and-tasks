package com.mk.hoursandtasks.service;

import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects(User user){
        Objects.requireNonNull(user);
        return projectRepository.findAllByOwner_Username(user.getUsername());
    }

    public Project getProject(Long id, User user){
        Objects.requireNonNull(id);
        Objects.requireNonNull(user);
        return projectRepository.findByProjectIdAndOwner_Username(id, user.getUsername());
    }
}
