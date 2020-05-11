package com.mk.hoursandtasks.entity.tasklabel;

import com.mk.hoursandtasks.dto.TaskLabelDto;
import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.task.Task;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "HT_TASK_LABEL")
public class TaskLabel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LABEL_ID")
    private Long labelId;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "COLOR_ID", nullable = false)
    private TaskLabelColor color;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROJECT_ID")
    private Project project;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "HT_REL_TASK_LABEL",
            joinColumns = {@JoinColumn(name = "LABEL_ID")},
            inverseJoinColumns =  {@JoinColumn(name = "TASK_ID")}
    )
    private List<Task> tasks;

    public TaskLabelDto toTaskLabelDto(){
        TaskLabelDto labelDto = new TaskLabelDto();
        labelDto.setId(this.getLabelId());
        labelDto.setName(this.getName());
        labelDto.setColor(this.getColor().getHex());
        return labelDto;
    }

}
