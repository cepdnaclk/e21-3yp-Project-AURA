package com.aura.system.repositories;

import com.aura.system.entities.KitchenOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface KitchenOrderRepository extends JpaRepository<KitchenOrder, Integer> {

    // Find kitchen orders for a specific order
    List<KitchenOrder> findByOrderOrderId(Integer orderId);

    // Find kitchen orders by preparation status name
    // e.g. findByPreparationStatusStatusName("preparing")
    List<KitchenOrder> findByPreparationStatusStatusName(String statusName);

    // Find all kitchen orders that have not yet finished (endTime is null)
    List<KitchenOrder> findByEndTimeIsNull();

    // Custom query — find all pending kitchen orders ordered by start time
    @Query("SELECT k FROM KitchenOrder k WHERE k.endTime IS NULL ORDER BY k.startTime ASC")
    List<KitchenOrder> findAllPendingOrderedByTime();
}
