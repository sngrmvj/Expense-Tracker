


package com.project.expenseTracker.Repository;


import com.project.expenseTracker.Entity.MonthlyExpenses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<MonthlyExpenses,Integer>{

    @Query(value = "SELECT left_over_amount FROM monthly_expenses where created_date=(SELECT max(created_date) FROM monthly_expenses)", nativeQuery = true)
    public double findtheLastMonthlyExpense();

    @Query(value="SELECT password FROM users WHERE email_id=:email", nativeQuery = true)
    public String findUserByEmail(@Param("email") String emailId);

    @Query(value = "select * from monthly_expenses me where email_id=:email",nativeQuery = true)
    public List<MonthlyExpenses> getAllExpensesOfUser(@Param("email") String emailId);

}




/*

IMPORTANT CODE
    @Query(value = "SELECT squad_name FROM nect_dev.user WHERE user_email=:email", nativeQuery = true)
    public String getIdFromEmail(@Param("email") String emailId);


This code should be used when you want to run the query which is not of your entity

@Repository
public class MyRepository {

    @PersistenceContext
    EntityManager entityManager;

    public void doSomeQuery(){
        Query query = entityManager.createNativeQuery("SELECT foo FROM bar");
        query.getResultsList()
        ...
    }

}



 */

