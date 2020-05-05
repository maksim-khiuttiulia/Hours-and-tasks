package com.mk.hoursandtasks.service;

import com.mk.hoursandtasks.dto.TaskLabelColorDto;
import com.mk.hoursandtasks.dto.TaskLabelDto;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabelColor;
import com.mk.hoursandtasks.repository.TaskLabelColorRepository;
import com.mk.hoursandtasks.repository.TaskLabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskLabelService {
    @Autowired
    private TaskLabelRepository taskLabelRepository;

    @Autowired
    private TaskLabelColorRepository labelColorRepository;

    public List<TaskLabelDto> getAll(){
        List<TaskLabel> taskLabels = taskLabelRepository.findAll();
        return taskLabels.stream().map(TaskLabel::taskLabelDto).collect(Collectors.toList());
    }

    public List<TaskLabelColorDto> getAllColors(){
        List<TaskLabelColor> taskLabelColors = labelColorRepository.findAll();
        return taskLabelColors.stream().map(TaskLabelColor::taskLabelColorDto).collect(Collectors.toList());
    }





}
