

package com.project.expenseTracker.Service;


import com.fasterxml.jackson.databind.node.ObjectNode;
import com.project.expenseTracker.Entity.MonthlyExpenses;
import com.project.expenseTracker.Entity.UserDetails;
import com.project.expenseTracker.Repository.ExpenseRepository;
import com.project.expenseTracker.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;


@Service
public class ExpenseService {

    @Autowired
    public ExpenseRepository expenseRepository;
    @Autowired
    public UserRepository userRepository;


    public Boolean isUser(String emailId, String recivedPassword){
        String retrievedPassword = expenseRepository.findUserByEmail(emailId);
        if (retrievedPassword == recivedPassword){
            return true;
        }
        return false;
    }

    public Boolean addUser(ObjectNode JSONobject) throws Exception{
        try{
            UserDetails user = new UserDetails();
            user.setEmailId(JSONobject.get("data").get("emailId").asText());
            user.setFirstName(JSONobject.get("data").get("firstName").asText());
            user.setLastName(JSONobject.get("data").get("lastName").asText());
            user.setPassword(JSONobject.get("data").get("password").asText());
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            user.setCreatedDate(timestamp);
            userRepository.save(user);
            return true;
        } catch (Exception error){
            System.out.println(error);
            return false;
        }
    }



    public List<MonthlyExpenses> getExpenses(String emailId, String month) throws SQLException {
        List<MonthlyExpenses> listMonthlyExpenses = expenseRepository.getAllExpensesOfUser(emailId);
        return listMonthlyExpenses;
    }

    public double getLeftOverMoney() throws Exception{
        try {
            return expenseRepository.findtheLastMonthlyExpense();
        } catch (Exception error){
            System.out.println(error);
            return 0.0;
        }
    }

    public Boolean addExpenses(ObjectNode JSONobject) throws Exception {
        System.out.println(JSONobject);
        try{
            MonthlyExpenses monthlyExpenses = new MonthlyExpenses();
            monthlyExpenses.setEmailId(JSONobject.get("data").get("emailId").asText());
            monthlyExpenses.setPriceOfExpense(JSONobject.get("data").get("priceOfProduct").asDouble());
            monthlyExpenses.setCategory(JSONobject.get("data").get("description").asText());
            monthlyExpenses.setType(JSONobject.get("data").get("type").asText());
            monthlyExpenses.setInitialAmount(JSONobject.get("data").get("initialAmount").asDouble());
            monthlyExpenses.setLeftOverAmount(JSONobject.get("data").get("leftOverAmount").asDouble());
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            monthlyExpenses.setCreatedDate(timestamp);
            expenseRepository.save(monthlyExpenses);
            return true;
        } catch (Exception error){
            System.out.println(error);
            return false;
        }
    }

    public Boolean deleteExpense(Integer id){
        expenseRepository.deleteById(id);
        try{
            MonthlyExpenses monthlyExpenses = expenseRepository.getReferenceById(id);
            return false; // The idea is it should throw exception. If it doesn't that represents the id is not deleted.
        } catch (EntityNotFoundException error){
            return true;
        }
    }

}

