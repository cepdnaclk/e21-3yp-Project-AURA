package com.aura.system.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "kitchen_order")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KitchenOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "kitchen_order_id")
    private Integer kitchenOrderId;

    // FK → orders.order_id  (relationship: ORDER sent_to KITCHEN_ORDER)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    // FK → status.status_id  (relationship: STATUS in KITCHEN_ORDER)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "preparation_status", referencedColumnName = "status_id")
    private Status preparationStatus;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;
}
