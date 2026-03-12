package com.aura.system.controllers;

import com.aura.system.entities.RestaurantTable;
import com.aura.system.services.RestaurantTableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
@RequiredArgsConstructor
public class RestaurantTableController {

    private final RestaurantTableService tableService;

    // ─── GET ALL TABLES ─────────────────────────────────────────────
    // GET http://localhost:8080/api/tables
    @GetMapping
    public ResponseEntity<List<RestaurantTable>> getAllTables() {
        return ResponseEntity.ok(tableService.getAllTables());
    }

    // ─── GET TABLE BY ID ────────────────────────────────────────────
    // GET http://localhost:8080/api/tables/1
    @GetMapping("/{id}")
    public ResponseEntity<RestaurantTable> getTableById(@PathVariable Integer id) {
        return ResponseEntity.ok(tableService.getTableById(id));
    }

    // ─── GET TABLES BY STATUS ───────────────────────────────────────
    // GET http://localhost:8080/api/tables/status/available
    @GetMapping("/status/{status}")
    public ResponseEntity<List<RestaurantTable>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(tableService.getByStatus(status));
    }

    // ─── GET AVAILABLE TABLES ───────────────────────────────────────
    // GET http://localhost:8080/api/tables/available
    @GetMapping("/available")
    public ResponseEntity<List<RestaurantTable>> getAvailableTables() {
        return ResponseEntity.ok(tableService.getByStatus("available"));
    }

    // ─── GET TABLES BY CAPACITY ─────────────────────────────────────
    // GET http://localhost:8080/api/tables/capacity/4
    @GetMapping("/capacity/{capacity}")
    public ResponseEntity<List<RestaurantTable>> getByCapacity(@PathVariable Integer capacity) {
        return ResponseEntity.ok(tableService.getByCapacity(capacity));
    }

    // ─── CREATE TABLE ───────────────────────────────────────────────
    // POST http://localhost:8080/api/tables
    // Body: { "tableNumber": "T01", "capacity": 4, "status": "available" }
    @PostMapping
    public ResponseEntity<RestaurantTable> createTable(@RequestBody RestaurantTable table) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(tableService.createTable(table));
    }

    // ─── UPDATE TABLE ───────────────────────────────────────────────
    // PUT http://localhost:8080/api/tables/1
    // Body: { "tableNumber": "T01", "capacity": 6, "status": "available" }
    @PutMapping("/{id}")
    public ResponseEntity<RestaurantTable> updateTable(@PathVariable Integer id,
                                                        @RequestBody RestaurantTable table) {
        return ResponseEntity.ok(tableService.updateTable(id, table));
    }

    // ─── UPDATE TABLE STATUS ONLY ───────────────────────────────────
    // PATCH http://localhost:8080/api/tables/1/status?status=occupied
    @PatchMapping("/{id}/status")
    public ResponseEntity<RestaurantTable> updateStatus(@PathVariable Integer id,
                                                         @RequestParam String status) {
        return ResponseEntity.ok(tableService.updateStatus(id, status));
    }

    // ─── DELETE TABLE ───────────────────────────────────────────────
    // DELETE http://localhost:8080/api/tables/1
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTable(@PathVariable Integer id) {
        tableService.deleteTable(id);
        return ResponseEntity.ok("Table deleted successfully");
    }
}
