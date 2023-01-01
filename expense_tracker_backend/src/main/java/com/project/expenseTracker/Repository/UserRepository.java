package com.project.expenseTracker.Repository;

import com.project.expenseTracker.Entity.UserDetails;
import com.project.expenseTracker.Response.FirstAndLastNameResponse;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserDetails,Integer> {

    @Query(value="SELECT current_monthly_expense FROM users WHERE email_id=:emailId",nativeQuery = true)
    public Optional<Double> leftOverCurrentMonthlyExpense(@Param("emailId") String emailId);

    @Query(value="SELECT password FROM users WHERE email_id=:email", nativeQuery = true)
    public String findUserByEmail(@Param("email") String emailId);

    @Query(value="SELECT * FROM users WHERE email_id=:email", nativeQuery = true)
    public UserDetails getNameByEmail(@Param("email") String emailId);

    @Transactional
    @Modifying
    @Query(value="UPDATE users SET current_monthly_expense=:leftOverAmount WHERE email_id=:emailId",nativeQuery = true)
    public void updateBalance(@Param("emailId") String emailId, @Param("leftOverAmount") Double leftOverAmount);
}
