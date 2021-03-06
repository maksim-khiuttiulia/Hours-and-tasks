package com.mk.hoursandtasks.entity;

import com.mk.hoursandtasks.dto.ProjectDto;
import com.mk.hoursandtasks.entity.task.Task;
import com.mk.hoursandtasks.entity.tasklabel.TaskLabel;
import com.mk.hoursandtasks.entity.user.User;
import liquibase.util.BooleanUtils;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

    public ProjectDto toProjectDto(boolean initTasks, boolean initLabels){
        ProjectDto projectDto = new ProjectDto();
        projectDto.setProjectId(this.projectId);
        projectDto.setName(this.name);
        projectDto.setDescription(this.description);
        projectDto.setOwner(owner.toUserDto());

        List<Task> tasks = getTasks();
        projectDto.setTasksCount(tasks.size());

        int tasksCount = tasks.size();
        int doneTasksCount = 0;
        int todoTasksCount = 0;
        Date nearestDeadline = null;
        for (Task task : getTasks()){
            if (BooleanUtils.isTrue(task.getIsDone())){
                doneTasksCount++;
            } else {
                todoTasksCount++;
            }

            Date deadline = task.getDeadline();

            if (nearestDeadline == null){
                nearestDeadline = deadline;
            } else {
                if (deadline != null && deadline.before(nearestDeadline)){
                    nearestDeadline = deadline;
                }
            }
        }

        projectDto.setTasksCount(tasksCount);
        projectDto.setNearestDeadline(nearestDeadline);
        projectDto.setDoneTasksCount(doneTasksCount);
        projectDto.setTodoTasksCount(todoTasksCount);

        if (initTasks){
            projectDto.setTasks(tasks.stream().map(Task::toTaskDto).collect(Collectors.toList()));
        }
        if (initLabels){
            projectDto.setLabels(labels.stream().map(TaskLabel::toTaskLabelDto).collect(Collectors.toList()));
        }
        return projectDto;
    }
}
