package com.mk.hoursandtasks.entity.tasklabel;


import com.mk.hoursandtasks.dto.TaskLabelColorDto;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "HT_TASK_LABEL_COLOR", indexes = {@Index(columnList = "hex", name = "INDEX_HEX")})
public class TaskLabelColor {

    @Id
    @Column(name = "COLOR_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long colorId;

    @Column(name = "HEX", nullable = false, unique = true)
    private String hex;

    @OneToMany(mappedBy = "color")
    private List<TaskLabel> labels;

    public TaskLabelColorDto taskLabelColorDto(){
        TaskLabelColorDto colorDto = new TaskLabelColorDto();
        colorDto.setId(this.getColorId());
        colorDto.setHex(this.getHex());
        return colorDto;
    }
}
