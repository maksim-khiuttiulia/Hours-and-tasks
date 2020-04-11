package com.mk.hoursandtasks.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskLabelColorDto {
    private Long id;
    private String hex;
}
