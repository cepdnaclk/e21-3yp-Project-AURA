package com.aura.system.repositories;

import com.aura.system.entities.Robot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RobotRepository extends JpaRepository<Robot, Integer> {

    // Find robots by status (e.g. "active", "idle", "charging")
    List<Robot> findByDeviceStatus(String deviceStatus);

    // Find robots by location
    List<Robot> findByLocation(String location);

    // Find all active robots with sufficient battery
    List<Robot> findByDeviceStatusAndBatteryLevel(String deviceStatus, String batteryLevel);
}
