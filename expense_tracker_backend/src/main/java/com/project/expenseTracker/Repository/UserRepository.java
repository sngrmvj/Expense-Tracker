package com.project.expenseTracker.Repository;

import com.project.expenseTracker.Entity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserDetails,Integer> {
}
