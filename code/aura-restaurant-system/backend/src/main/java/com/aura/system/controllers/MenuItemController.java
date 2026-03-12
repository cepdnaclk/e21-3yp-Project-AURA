package com.aura.system.controllers;

import com.aura.system.entities.MenuItem;
import com.aura.system.services.MenuItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuItemController {

    private final MenuItemService menuItemService;

    // ─── GET ALL MENU ITEMS ─────────────────────────────────────────
    // GET http://localhost:8080/api/menu
    @GetMapping
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        return ResponseEntity.ok(menuItemService.getAllMenuItems());
    }

    // ─── GET MENU ITEM BY ID ────────────────────────────────────────
    // GET http://localhost:8080/api/menu/1
    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getMenuItemById(@PathVariable Integer id) {
        return ResponseEntity.ok(menuItemService.getMenuItemById(id));
    }

    // ─── GET BY CATEGORY ────────────────────────────────────────────
    // GET http://localhost:8080/api/menu/category/mains
    @GetMapping("/category/{category}")
    public ResponseEntity<List<MenuItem>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(menuItemService.getByCategory(category));
    }

    // ─── GET AVAILABLE ITEMS ONLY ───────────────────────────────────
    // GET http://localhost:8080/api/menu/available
    @GetMapping("/available")
    public ResponseEntity<List<MenuItem>> getAvailableItems() {
        return ResponseEntity.ok(menuItemService.getAvailableItems());
    }

    // ─── SEARCH BY NAME ─────────────────────────────────────────────
    // GET http://localhost:8080/api/menu/search?keyword=pizza
    @GetMapping("/search")
    public ResponseEntity<List<MenuItem>> searchByName(@RequestParam String keyword) {
        return ResponseEntity.ok(menuItemService.searchByName(keyword));
    }

    // ─── CREATE MENU ITEM ───────────────────────────────────────────
    // POST http://localhost:8080/api/menu
    // Body: { "name": "Pizza", "price": 9.99, "category": "mains", "availability": true }
    @PostMapping
    public ResponseEntity<MenuItem> createMenuItem(@RequestBody MenuItem menuItem) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(menuItemService.createMenuItem(menuItem));
    }

    // ─── UPDATE MENU ITEM ───────────────────────────────────────────
    // PUT http://localhost:8080/api/menu/1
    // Body: { "name": "Pizza", "price": 12.99, "category": "mains", "availability": true }
    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Integer id,
                                                    @RequestBody MenuItem menuItem) {
        return ResponseEntity.ok(menuItemService.updateMenuItem(id, menuItem));
    }

    // ─── TOGGLE AVAILABILITY ────────────────────────────────────────
    // PATCH http://localhost:8080/api/menu/1/availability
    @PatchMapping("/{id}/availability")
    public ResponseEntity<MenuItem> toggleAvailability(@PathVariable Integer id) {
        return ResponseEntity.ok(menuItemService.toggleAvailability(id));
    }

    // ─── DELETE MENU ITEM ───────────────────────────────────────────
    // DELETE http://localhost:8080/api/menu/1
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMenuItem(@PathVariable Integer id) {
        menuItemService.deleteMenuItem(id);
        return ResponseEntity.ok("Menu item deleted successfully");
    }
}
