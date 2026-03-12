package com.aura.system.repositories;

import com.aura.system.entities.DailySummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DailySummaryRepository extends JpaRepository<DailySummary, Integer> {

    // Find summary for a specific date
    Optional<DailySummary> findBySummaryDate(LocalDate summaryDate);

    // Find summaries between two dates — e.g. for weekly/monthly reports
    List<DailySummary> findBySummaryDateBetween(LocalDate startDate, LocalDate endDate);

    // Check if summary already exists for a date
    boolean existsBySummaryDate(LocalDate summaryDate);
}
