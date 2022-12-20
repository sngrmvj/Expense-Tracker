

package com.project.expenseTracker.Controller;


import com.project.expenseTracker.Entity.MonthlyExpenses;
import com.project.expenseTracker.Service.AddExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLDataException;
import java.sql.SQLException;
import java.util.List;

@RestController
public class AddExpenseController {

    @Autowired
    public AddExpenseService addExpenseService;


    @GetMapping("/")
    public String ping(){
        return "Yes you are connected!!";
    }

    @GetMapping("/getExpenses/")
    public List<MonthlyExpenses> getTheExpense() throws SQLException {
        List<MonthlyExpenses> values = addExpenseService.getExpenses();
        return values;
    }

    @GetMapping("/leftOver/")
    public double getLeftOverMoney() throws Exception {
        return addExpenseService.getLeftOverMoney();
    }

    @PostMapping("/postExpenses/")
    public Boolean getTheExpense(@RequestBody MonthlyExpenses monthlyExpenses) throws Exception {
        MonthlyExpenses addedExpense = addExpenseService.addExpenses(monthlyExpenses);
        if(addedExpense.getId() != null){
            return true;
        }
        return false;
    }
}


