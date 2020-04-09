package com.mk.hoursandtasks.entity.task;

import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

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

    private String text;

    @Enumerated(EnumType.STRING)
    private PRIORITY priority;

    @Column(name = "CREATED")
    private Date created;

    @Column(name = "DEADLINE")
    private Date deadline;

    @Column(name = "IS_DONE")
    private Boolean isDone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FK_PROJECT")
    private Project project;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "HT_TASK_LABEL",
            joinColumns = {@JoinColumn(name = "TASK_ID")},
            inverseJoinColumns =  {@JoinColumn(name = "LABEL_ID")}
    )
    private List<TaskLabel> labels;
}
