package com.aura.system.repositories;

import com.aura.system.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    // Find orders by status (e.g. "pending", "completed")
    List<Order> findByStatus(String status);

    // Find all orders for a specific table
    List<Order> findByTableTableId(Integer tableId);

    // Find orders placed between two timestamps
    List<Order> findByOrderTimeBetween(LocalDateTime start, LocalDateTime end);

    // Find orders above a certain total amount
    List<Order> findByTotalAmountGreaterThanEqual(Float amount);

    // Custom query — find today's orders
    @Query("SELECT o FROM Order o WHERE o.orderTime >= :startOfDay AND o.orderTime < :endOfDay")
    List<Order> findTodaysOrders(
        @Param("startOfDay") LocalDateTime startOfDay,
        @Param("endOfDay") LocalDateTime endOfDay
    );
    // Custom query — total revenue for a date range
    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.orderTime BETWEEN :start AND :end")
    Float calculateRevenueBetween(@Param("start") LocalDateTime start,
                                  @Param("end") LocalDateTime end);
}
