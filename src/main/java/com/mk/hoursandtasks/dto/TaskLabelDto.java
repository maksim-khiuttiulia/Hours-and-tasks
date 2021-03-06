package com.mk.hoursandtasks.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskLabelDto {
    private Long id;
    private String name;
    private String color;
    private ProjectDto projectDto;
}
