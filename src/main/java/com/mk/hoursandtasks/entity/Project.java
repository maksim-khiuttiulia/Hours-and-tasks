package com.mk.hoursandtasks.entity;

import lombok.Data;

import javax.persistence.*;

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
}
