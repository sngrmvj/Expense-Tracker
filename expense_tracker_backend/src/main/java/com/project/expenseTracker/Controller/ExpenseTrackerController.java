

package com.project.expenseTracker.Controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.project.expenseTracker.Entity.MonthlyExpenses;
import com.project.expenseTracker.Response.FirstAndLastNameResponse;
import com.project.expenseTracker.Service.ExpenseService;
import com.project.expenseTracker.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
public class ExpenseTrackerController {

    @Autowired
    public ExpenseService expenseService;
    @Autowired
    public UserService userService;
    @Autowired
    public ObjectMapper mapper;


    @GetMapping("/")
    public String ping(){
        return "Yes you are connected!!";
    }

    @PutMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ObjectNode loginIntoApplication(@RequestBody ObjectNode JSONobject){
        Boolean flag = userService.isUser(JSONobject.get("data").get("emailId").asText(),JSONobject.get("data").get("password").asText());
        ObjectNode objectNode = mapper.createObjectNode();
        objectNode.put("emailId", JSONobject.get("data").get("emailId").asText());
        objectNode.put("flag", flag);
        return objectNode;
    }

    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:3000")
    public Boolean registerUserIntoApplication(@RequestBody ObjectNode JSONobject) throws Exception{
        return userService.addUser(JSONobject);
    }

    @GetMapping("/getUserName")
    @CrossOrigin(origins = "http://localhost:3000")
    public FirstAndLastNameResponse getUsersFirstAndLastName(@RequestParam("emailId") String emailId) throws Exception{
        return userService.getUserName(emailId);
    }

    @GetMapping("/resetBudget")
    @CrossOrigin(origins = "http://localhost:3000")
    public Boolean resetCurrentBudget(@RequestParam("emailId") String emailId, @RequestParam("monthNumber") String month) throws Exception{
        return userService.resetTheBudget(emailId, month);
    }





    @GetMapping("/getExpenses")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<MonthlyExpenses> getTheExpense(@RequestParam("emailId") String emailId, @RequestParam("monthNumber") String month) throws SQLException {
        List<MonthlyExpenses> monthlyExpenses = expenseService.getExpenses(emailId,month);
        return monthlyExpenses;
    }

    @GetMapping("/leftOver")
    @CrossOrigin(origins = "http://localhost:3000")
    public Optional<Double> getLeftOverMoney(@RequestParam("emailId") String emailId) throws Exception {
        return userService.getLeftOverMoney(emailId);
    }

    @PostMapping("/addExpense/")
    @CrossOrigin(origins = "http://localhost:3000")
    public Boolean addTheExpense(@RequestBody ObjectNode JSONobject) throws Exception {
        return expenseService.addExpenses(JSONobject);
    }

    @DeleteMapping("/deleteExpense")
    @CrossOrigin(origins = "http://localhost:3000")
    public Boolean deleteTheExpense(@RequestParam("id") Integer identifier, @RequestParam("emailId") String emailId) throws Exception{
        return expenseService.deleteExpense(identifier, emailId);
    }

    @GetMapping("/3monthsAnalytics")
    @CrossOrigin(origins = "http://localhost:3000")
    public HashMap<String, List> getAnalyticsData(@RequestParam("emailId") String emailId){
        return expenseService.get3monthDetails(emailId);
    }




}


