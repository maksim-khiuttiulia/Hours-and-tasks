package com.mk.hoursandtasks.controller;

import com.mk.hoursandtasks.dto.TaskLabelDto;
import com.mk.hoursandtasks.service.TaskLabelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/taskLabel")
public class TaskLabelController {

    @Autowired
    private TaskLabelService taskLabelService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public @ResponseBody List<TaskLabelDto> getAllLabels(){
        return taskLabelService.getAll();
    }
}
