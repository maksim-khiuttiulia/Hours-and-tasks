package com.mk.hoursandtasks.service;

import com.mk.hoursandtasks.dto.ProjectDto;
import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.exceptions.ValidationException;
import com.mk.hoursandtasks.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private TaskLabelService taskLabelService;

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

    @Transactional(rollbackOn = Exception.class)
    public Project createProject(Project project, User user){
        Objects.requireNonNull(project);
        Objects.requireNonNull(user);

        if (StringUtils.isEmpty(project.getName())){
            throw new ValidationException("Name is empty");
        }
        if (StringUtils.isEmpty(project.getDescription())){
            throw new ValidationException("Description is empty");
        }
        project.setOwner(user);
        return projectRepository.save(project);
    }

    @Transactional(rollbackOn = Exception.class)
    public Project updateProject(Long id, Project project){
        Objects.requireNonNull(project);

        Project projectFromDB = projectRepository.findById(id).orElse(null);
        if (projectFromDB == null){
            throw new ValidationException("Project not exists");
        }

        if (StringUtils.isEmpty(project.getName())){
            throw new ValidationException("Name is empty");
        }
        projectFromDB.setName(project.getName());

        if (StringUtils.isEmpty(project.getDescription())){
            throw new ValidationException("Description is empty");
        }
        projectFromDB.setDescription(project.getDescription());

        return projectRepository.save(project);
    }

    @Transactional(rollbackOn = Exception.class)
    public void deleteProject(Project project) {
        projectRepository.delete(project);
    }

    public Project convert(ProjectDto projectDto){
        Project project = new Project();
        project.setName(projectDto.getName());
        project.setDescription(projectDto.getDescription());
        if (project.getOwner() != null){
            User user = userService.findById(project.getOwner().getUserId());
            project.setOwner(user);
        }
        return project;
    }


}
