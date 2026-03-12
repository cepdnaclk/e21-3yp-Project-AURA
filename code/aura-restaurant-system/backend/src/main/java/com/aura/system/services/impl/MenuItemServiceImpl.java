package com.aura.system.services.impl;

import com.aura.system.entities.MenuItem;
import com.aura.system.repositories.MenuItemRepository;
import com.aura.system.services.MenuItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuItemServiceImpl implements MenuItemService {

    private final MenuItemRepository menuItemRepository;

    @Override
    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    @Override
    public MenuItem getMenuItemById(Integer id) {
        return menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found with id: " + id));
    }

    @Override
    public List<MenuItem> getByCategory(String category) {
        return menuItemRepository.findByCategory(category);
    }

    @Override
    public List<MenuItem> getAvailableItems() {
        return menuItemRepository.findByAvailabilityTrue();
    }

    @Override
    public List<MenuItem> searchByName(String keyword) {
        return menuItemRepository.findByNameContainingIgnoreCase(keyword);
    }

    @Override
    public MenuItem createMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    @Override
    public MenuItem updateMenuItem(Integer id, MenuItem updated) {
        MenuItem existing = getMenuItemById(id);  // throws if not found

        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setPrice(updated.getPrice());
        existing.setCategory(updated.getCategory());
        existing.setAvailability(updated.getAvailability());

        return menuItemRepository.save(existing);
    }

    @Override
    public MenuItem toggleAvailability(Integer id) {
        MenuItem existing = getMenuItemById(id);
        existing.setAvailability(!existing.getAvailability());  // flip true ↔ false
        return menuItemRepository.save(existing);
    }

    @Override
    public void deleteMenuItem(Integer id) {
        if (!menuItemRepository.existsById(id)) {
            throw new RuntimeException("Menu item not found with id: " + id);
        }
        menuItemRepository.deleteById(id);
    }
}
