package com.mk.hoursandtasks.controller;

import com.mk.hoursandtasks.dto.TaskLabelColorDto;
import com.mk.hoursandtasks.service.TaskLabelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/labelColor")
public class TaskLabelColorController {
    @Autowired
    private TaskLabelService taskLabelService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public @ResponseBody
    List<TaskLabelColorDto> getAll(){
        return taskLabelService.getColors();
    }
}
