

package com.project.expenseTracker.Service;


import com.project.expenseTracker.Entity.MonthlyExpenses;
import com.project.expenseTracker.Repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;


@Service
public class AddExpenseService {

    @Autowired
    public ExpenseRepository expenseRepository;


//    public Boolean isUser(String emailId, String password){
//        return false;
//    }

    public List<MonthlyExpenses> getExpenses() throws SQLException {
        List<MonthlyExpenses> values = expenseRepository.findAll();
        System.out.println(values);
        return values;
    }

    public double getLeftOverMoney(){
        return expenseRepository.findtheLastMonthlyExpense();
    }


    public MonthlyExpenses addExpenses(MonthlyExpenses monthlyExpenses) throws Exception {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        monthlyExpenses.setCreatedDate(timestamp);
        return expenseRepository.save(monthlyExpenses);
    }

}

