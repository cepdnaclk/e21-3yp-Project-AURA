package com.aura.system.repositories;

import com.aura.system.entities.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

    // Find all feedback for a specific order
    List<Feedback> findByOrderOrderId(Integer orderId);

    // Find feedback by rating (e.g. all 5-star reviews)
    List<Feedback> findByRating(Integer rating);

    // Find feedback with rating above a threshold
    List<Feedback> findByRatingGreaterThanEqual(Integer minRating);

    // Custom query — calculate average rating
    @Query("SELECT AVG(f.rating) FROM Feedback f")
    Double findAverageRating();

    // Custom query — find recent negative feedback (rating <= 2)
    @Query("SELECT f FROM Feedback f WHERE f.rating <= 2 ORDER BY f.feedbackTime DESC")
    List<Feedback> findRecentNegativeFeedback();
}
