package com.aura.system.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "robot")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Robot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "robot_id")
    private Integer robotId;

    @Column(name = "device_status")
    private String deviceStatus;

    @Column(name = "location")
    private String location;

    @Column(name = "battery_level")
    private String batteryLevel;
}
