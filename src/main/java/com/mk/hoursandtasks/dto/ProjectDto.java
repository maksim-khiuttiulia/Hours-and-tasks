package com.mk.hoursandtasks.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ProjectDto {
    private Long projectId;
    private String name;
    private String description;
    private Integer tasksCount;
    private Integer doneTasksCount;
    private Integer todoTasksCount;
    private Date nearestDeadline;
    private List<TaskDto> tasks;
    private List<TaskLabelDto> labels;
    private UserDto owner;
}
