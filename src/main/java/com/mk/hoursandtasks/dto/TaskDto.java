package com.mk.hoursandtasks.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mk.hoursandtasks.entity.task.PRIORITY;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskDto {
    private Long taskId;
    private String name;
    private String text;
    private PRIORITY priority;
    private Date created;
    private Date deadline;
    private boolean isDone;
    private Long projectId;
    private List<TaskLabelDto> labels;
}
