package com.mk.hoursandtasks.entity.task;

import com.mk.hoursandtasks.dto.ProjectDto;
import com.mk.hoursandtasks.dto.TaskDto;
import com.mk.hoursandtasks.dto.TaskLabelDto;
import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import liquibase.util.BooleanUtils;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "HT_TASK")
public class Task {

    @Id
    @Column(name = "TASK_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;

    @Column(nullable = false)
    private String name;

    private String description;

    @CreationTimestamp
    @Column(name = "CREATED", nullable = false)
    private Date created;

    @Column(name = "DEADLINE")
    private Date deadline;

    @Column(name = "IS_DONE", nullable = false)
    private Boolean isDone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROJECT_ID")
    private Project project;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "HT_REL_TASK_LABEL",
            joinColumns = {@JoinColumn(name = "TASK_ID")},
            inverseJoinColumns =  {@JoinColumn(name = "LABEL_ID")}
    )
    private List<TaskLabel> labels;

    public List<TaskLabel> getLabels() {
        if (labels == null){
            labels = new ArrayList<>();
        }
        return labels;
    }

    public TaskDto toTaskDto(){
        TaskDto taskDto = new TaskDto();
        taskDto.setId(this.getTaskId());
        taskDto.setName(this.getName());
        taskDto.setDescription(this.getDescription());
        taskDto.setCreated(this.getCreated());
        taskDto.setDeadline(this.getDeadline());
        taskDto.setDone(BooleanUtils.isTrue(this.getIsDone()));

        if (this.getProject() != null){
            ProjectDto projectDto = this.getProject().toProjectDto(false, false);
            taskDto.setProject(projectDto);
        }

        List<TaskLabelDto> labelDtos = this.getLabels().stream().map(TaskLabel::toTaskLabelDto).collect(Collectors.toList());

        taskDto.setLabels(labelDtos);

        return taskDto;
    }
}
