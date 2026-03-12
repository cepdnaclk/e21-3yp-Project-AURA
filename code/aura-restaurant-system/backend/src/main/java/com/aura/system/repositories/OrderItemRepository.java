package com.aura.system.repositories;

import com.aura.system.entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    // Find all items belonging to a specific order
    List<OrderItem> findByOrderOrderId(Integer orderId);

    // Find all order items for a specific menu item
    List<OrderItem> findByMenuItemMenuItemId(Integer menuItemId);

    // Custom query — find most ordered menu items
    @Query("SELECT oi.menuItem.name, SUM(oi.quantity) as total " +
           "FROM OrderItem oi GROUP BY oi.menuItem.name ORDER BY total DESC")
    List<Object[]> findMostOrderedItems();

    // Find items with customizations
    @Query("SELECT oi FROM OrderItem oi WHERE oi.customization IS NOT NULL " +
           "AND oi.order.orderId = :orderId")
    List<OrderItem> findCustomizedItemsByOrder(@Param("orderId") Integer orderId);
}
