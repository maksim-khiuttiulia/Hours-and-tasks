package com.mk.hoursandtasks.service;

import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.exceptions.ValidationException;
import com.mk.hoursandtasks.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects(User user){
        Objects.requireNonNull(user);
        return projectRepository.findAllByOwner(user);
    }

    public Page<Project> getAllProjects(User user, Pageable pageable){
        Objects.requireNonNull(user);
        return projectRepository.findAllByOwner(user, pageable);
    }

    public Project getProject(Long id){
        Objects.requireNonNull(id);
        return projectRepository.findById(id).orElse(null);
    }

    public Project getProject(Long id, User user){
        Objects.requireNonNull(id);
        Objects.requireNonNull(user);
        Project project = projectRepository.findByProjectIdAndOwner(id, user);
        if (project == null){
            throw new ValidationException("Project not exists or user hasn't access");
        }
        return project;
    }


}
