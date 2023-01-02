

package com.project.expenseTracker.Service;


import com.fasterxml.jackson.databind.node.ObjectNode;
import com.project.expenseTracker.Entity.MonthlyExpenses;
import com.project.expenseTracker.Repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.*;


@Service
public class ExpenseService {

    @Autowired
    public ExpenseRepository expenseRepository;

    @Autowired
    public UserService userService;


    public List<MonthlyExpenses> getExpenses(String emailId, String month) throws SQLException {
        List<MonthlyExpenses> listMonthlyExpenses = expenseRepository.getAllExpensesOfUser(emailId, Integer.parseInt(month));
        return listMonthlyExpenses;
    }

    public Boolean addExpenses(ObjectNode JSONobject) throws Exception {
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

            // Idea is to update the balance of the User current Monthly Expense once a new expense is added
            userService.updateLeftOverAmountOfUser(JSONobject.get("data").get("emailId").asText(),JSONobject.get("data").get("leftOverAmount").asDouble());
            return true;
        } catch (Exception error){
            System.out.println(error);
            return false;
        }
    }

    public Boolean deleteExpense(Integer id, String emailId) throws Exception{
        // If there is no data in the viewExpense it is taking the previous month ... But it should show the current month as 0
        try{
            Boolean isAvailable = expenseRepository.existsById(id);
            if(!isAvailable){
                throw  new IllegalStateException("Expense with id - "+id+" does not exist");
            }
            Double priceOfProduct = expenseRepository.getPriceOfProductToBeDeleted(id);
            Optional<Double> leftOverCurrentMonthlyExpense = userService.getLeftOverMoney(emailId);
            priceOfProduct += leftOverCurrentMonthlyExpense.orElse(0.0);
            expenseRepository.deleteById(id);
            userService.updateLeftOverAmountOfUser(emailId,priceOfProduct);
            return true;
        } catch (Exception error){
            System.out.println(error);
            return false;
        }
    }

    public HashMap<String, List> get3monthDetails(String email){
        List<Integer> all3months= expenseRepository.get3months(email);
        HashMap<String, List> result = new HashMap<>();
        List<List<Integer>> nice_to_have_list = new ArrayList<>();
        List<List<Integer>> must_have_list = new ArrayList<>();
        List<List<Integer>> total_expense_list = new ArrayList<>();

        int i = 0;
        while (i < all3months.size()){
            List<Integer> nice_to_have_price= expenseRepository.getDetailsBasedOnType(email,all3months.get(i),"Nice to have");
            int nice_to_have_price_sum = 0;
            for (int j: nice_to_have_price) {
                nice_to_have_price_sum += j;
            }
            List<Integer> must_price= expenseRepository.getDetailsBasedOnType(email,all3months.get(i),"Must have");
            int must_have_price_sum = 0;
            for (int j: must_price) {
                must_have_price_sum += j;
            }
            Integer total_expense = nice_to_have_price_sum + must_have_price_sum;
            must_have_list.add(List.of(all3months.get(i),must_have_price_sum));
            nice_to_have_list.add(List.of(all3months.get(i),nice_to_have_price_sum));
            total_expense_list.add(List.of(all3months.get(i),total_expense));
            i += 1;
        }
        result.put("Total Expense",total_expense_list);
        result.put("Must Have",must_have_list);
        result.put("Nice to have",nice_to_have_list);

        return result;
    }


}

