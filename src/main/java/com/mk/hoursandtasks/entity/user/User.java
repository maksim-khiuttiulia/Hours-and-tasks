package com.mk.hoursandtasks.entity.user;

import com.mk.hoursandtasks.entity.Project;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "HT_USER")
public class User {
    @Id
    @Column(name = "USER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String username;

    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, name = "FIRST_NAME")
    private String firstName;

    @Column(nullable = false, name = "LAST_NAME")
    private String lastName;

    @OneToMany(mappedBy = "owner")
    private List<Project> projects;

    public List<Project> getProjects() {
        if (projects == null){
            projects = new ArrayList<>();
        }
        return projects;
    }
}
