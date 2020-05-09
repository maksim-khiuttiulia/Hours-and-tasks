package com.mk.hoursandtasks.entity;

import com.mk.hoursandtasks.entity.task.Task;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import com.mk.hoursandtasks.entity.user.User;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "HT_PROJECT")
public class Project {
    @Id
    @Column(name = "PROJECT_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private String description;

    @OneToMany(mappedBy = "project")
    private List<Task> tasks;

    @OneToMany(mappedBy = "project")
    private List<TaskLabel> labels;

    @ManyToOne
    @JoinColumn(name = "OWNER", nullable = false)
    private User owner;

    public List<Task> getTasks() {
        if (tasks == null){
            tasks = new ArrayList<>();
        }
        return tasks;
    }

    public List<TaskLabel> getLabels() {
        if (labels == null){
            labels = new ArrayList<>();
        }
        return labels;
    }
}
