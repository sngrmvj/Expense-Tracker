


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

    @Query(value = "SELECT id, category, to_char(me.created_date,'YYYY-MM-DD') as created_date, initial_amount, left_over_amount, type, price_of_expense, email_id FROM monthly_expenses me WHERE EXTRACT(MONTH FROM me.created_date)=:month and email_id=:email",nativeQuery = true)
    public List<MonthlyExpenses> getAllExpensesOfUser(@Param("email") String emailId, @Param("month") Integer month);
    
    @Query(value = "select distinct(extract(month from created_date)) as Month from monthly_expenses me where email_id=:email limit 3",nativeQuery = true)
    public List<Integer> get3months(@Param("email") String emailId); // By default we get in descending order and the the limit is 3 because we need to have latest 3 months of data

    @Query(value = "select price_of_expense from monthly_expenses me where me.type=:type and email_id=:email and extract(month from me.created_date)=:month",nativeQuery = true)
    public List<Integer> getDetailsBasedOnType(@Param("email") String emailId, @Param("month") Integer month, @Param("type") String type); // By default we get in descending order and the the limit is 3 because we need to have latest 3 months of data

}


