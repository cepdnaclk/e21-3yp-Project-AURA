package com.aura.system.repositories;

import com.aura.system.entities.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface StatusRepository extends JpaRepository<Status, Integer> {

    // Find status by name — e.g. findByStatusName("pending")
    Optional<Status> findByStatusName(String statusName);

    // Check if a status name already exists
    boolean existsByStatusName(String statusName);
}
