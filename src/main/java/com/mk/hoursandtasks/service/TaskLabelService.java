package com.mk.hoursandtasks.service;

import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabelColor;
import com.mk.hoursandtasks.repository.TaskLabelColorRepository;
import com.mk.hoursandtasks.repository.TaskLabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskLabelService {
    @Autowired
    private TaskLabelRepository taskLabelRepository;

    @Autowired
    private TaskLabelColorRepository labelColorRepository;

    public List<TaskLabel> getAllOnProject(Project project){
        List<TaskLabel> taskLabels = taskLabelRepository.findAllByProject_ProjectId(project.getProjectId());
        return taskLabels;
    }

    public List<TaskLabelColor> getAllColors(){
        List<TaskLabelColor> taskLabelColors = labelColorRepository.findAll();
        return taskLabelColors;
    }





}
