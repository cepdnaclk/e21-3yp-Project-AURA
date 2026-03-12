package com.aura.system.services;

import com.aura.system.entities.RestaurantTable;
import java.util.List;

public interface RestaurantTableService {

    List<RestaurantTable> getAllTables();

    RestaurantTable getTableById(Integer id);

    List<RestaurantTable> getByStatus(String status);

    List<RestaurantTable> getByCapacity(Integer capacity);

    RestaurantTable createTable(RestaurantTable table);

    RestaurantTable updateTable(Integer id, RestaurantTable table);

    RestaurantTable updateStatus(Integer id, String status);

    void deleteTable(Integer id);
}
