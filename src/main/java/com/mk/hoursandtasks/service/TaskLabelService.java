package com.mk.hoursandtasks.service;

import com.mk.hoursandtasks.dto.TaskLabelColorDto;
import com.mk.hoursandtasks.dto.TaskLabelDto;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabelColor;
import com.mk.hoursandtasks.repository.TaskLabelColorRepository;
import com.mk.hoursandtasks.repository.TaskLabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskLabelService {
    @Autowired
    private TaskLabelRepository taskLabelRepository;

    @Autowired
    private TaskLabelColorRepository labelColorRepository;

    public List<TaskLabelDto> getAll(){
        List<TaskLabel> taskLabels = taskLabelRepository.findAll();
        List<TaskLabelDto> dtos = new ArrayList<>();
        for (TaskLabel taskLabel : taskLabels){
            TaskLabelDto labelDto = new TaskLabelDto();
            labelDto.setLabelId(taskLabel.getLabelId());
            labelDto.setName(taskLabel.getName());
            labelDto.setColor(taskLabel.getColor().getHex());
            dtos.add(labelDto);
        }
        return dtos;
    }

    public List<TaskLabelColorDto> getColors(){
        List<TaskLabelColor> taskLabelColors = labelColorRepository.findAll();
        List<TaskLabelColorDto> dtos = new ArrayList<>();
        for (TaskLabelColor color : taskLabelColors){
            TaskLabelColorDto colorDto = new TaskLabelColorDto();
            colorDto.setHex(color.getHex());
            dtos.add(colorDto);
        }
        return dtos;
    }


}
