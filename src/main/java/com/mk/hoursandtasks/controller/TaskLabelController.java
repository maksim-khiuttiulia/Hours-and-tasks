package com.mk.hoursandtasks.controller;

import com.mk.hoursandtasks.dto.TaskLabelColorDto;
import com.mk.hoursandtasks.dto.TaskLabelDto;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabelColor;
import com.mk.hoursandtasks.service.TaskLabelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/task-labels")
public class TaskLabelController extends ControllerAncestor {

    @Autowired
    private TaskLabelService taskLabelService;

    @RequestMapping(value = "/colors", method = RequestMethod.GET)
    public @ResponseBody List<TaskLabelColorDto> getAllColors(HttpServletRequest request){
        getCurrentUser(request);
        return taskLabelService.getAllColors().stream().map(TaskLabelColor::taskLabelColorDto).collect(Collectors.toList());
    }


}
