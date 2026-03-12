package com.aura.system.services.impl;

import com.aura.system.entities.RestaurantTable;
import com.aura.system.repositories.RestaurantTableRepository;
import com.aura.system.services.RestaurantTableService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantTableServiceImpl implements RestaurantTableService {

    private final RestaurantTableRepository tableRepository;

    @Override
    public List<RestaurantTable> getAllTables() {
        return tableRepository.findAll();
    }

    @Override
    public RestaurantTable getTableById(Integer id) {
        return tableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Table not found with id: " + id));
    }

    @Override
    public List<RestaurantTable> getByStatus(String status) {
        return tableRepository.findByStatus(status);
    }

    @Override
    public List<RestaurantTable> getByCapacity(Integer capacity) {
        return tableRepository.findByCapacityGreaterThanEqual(capacity);
    }

    @Override
    public RestaurantTable createTable(RestaurantTable table) {
        // Check if table number already exists
        if (tableRepository.findByTableNumber(table.getTableNumber()) != null) {
            throw new RuntimeException("Table number already exists: " + table.getTableNumber());
        }
        return tableRepository.save(table);
    }

    @Override
    public RestaurantTable updateTable(Integer id, RestaurantTable updated) {
        RestaurantTable existing = getTableById(id);  // throws if not found

        existing.setTableNumber(updated.getTableNumber());
        existing.setCapacity(updated.getCapacity());
        existing.setStatus(updated.getStatus());

        return tableRepository.save(existing);
    }

    @Override
    public RestaurantTable updateStatus(Integer id, String status) {
        RestaurantTable existing = getTableById(id);
        existing.setStatus(status);
        return tableRepository.save(existing);
    }

    @Override
    public void deleteTable(Integer id) {
        if (!tableRepository.existsById(id)) {
            throw new RuntimeException("Table not found with id: " + id);
        }
        tableRepository.deleteById(id);
    }
}
