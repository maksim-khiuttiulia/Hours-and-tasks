package com.mk.hoursandtasks.service;

import com.mk.hoursandtasks.dto.TaskLabelDto;
import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabelColor;
import com.mk.hoursandtasks.exceptions.ValidationException;
import com.mk.hoursandtasks.repository.TaskLabelColorRepository;
import com.mk.hoursandtasks.repository.TaskLabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
public class TaskLabelService {
    @Autowired
    private TaskLabelRepository taskLabelRepository;

    @Autowired
    private TaskLabelColorRepository labelColorRepository;

    @Autowired
    private ProjectService projectService;

    public TaskLabel getTaskLabel(Long labelId, Project project){
        return taskLabelRepository.findByLabelIdAndProject(labelId, project);
    }

    public List<TaskLabel> getAllOnProject(Project project){
        List<TaskLabel> taskLabels = taskLabelRepository.findAllByProject(project);
        return taskLabels;
    }

    @Transactional(rollbackOn = Exception.class)
    public TaskLabel addTaskLabel(TaskLabel taskLabel, Project project){
        Objects.requireNonNull(taskLabel);
        Objects.requireNonNull(project);
        if (StringUtils.isEmpty(taskLabel.getName())){
            throw new ValidationException("Name is empty");
        }
        if (taskLabel.getColor() == null){
            throw new ValidationException("Color is null");
        }
        if (project.getLabels().contains(taskLabel)){
            throw new ValidationException("Project already contains similar task label");
        }
        taskLabel.setProject(project);
        return taskLabelRepository.save(taskLabel);
    }

    @Transactional(rollbackOn = Exception.class)
    public void deleteTaskLabel(TaskLabel taskLabel){
        taskLabelRepository.delete(taskLabel);
    }

    public List<TaskLabelColor> getAllColors(){
        List<TaskLabelColor> taskLabelColors = labelColorRepository.findAll();
        return taskLabelColors;
    }

    public TaskLabel convert(TaskLabelDto taskLabelDto){
        TaskLabel taskLabel = new TaskLabel();
        taskLabel.setLabelId(taskLabelDto.getId());
        taskLabel.setName(taskLabelDto.getName());
        TaskLabelColor taskLabelColor = labelColorRepository.findByHex(taskLabelDto.getColor());
        taskLabel.setColor(taskLabelColor);
        if (taskLabelDto.getProjectDto() != null){
            Project project = projectService.getProject(taskLabelDto.getProjectDto().getProjectId());
            taskLabel.setProject(project);
        }
        return taskLabel;
    }





}
