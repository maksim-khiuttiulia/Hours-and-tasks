package com.mk.hoursandtasks.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskDto {

    private Long id;

    private String name;

    private String text;

    private Date created;

    private Date deadline;

    private boolean isDone;

    private Long projectId;

    private List<TaskLabelDto> labels;
}
