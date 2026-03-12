package com.aura.system.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "status")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "status_id")
    private Integer statusId;

    @Column(name = "status_name", nullable = false, unique = true)
    private String statusName;
}
