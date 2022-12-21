

package com.project.expenseTracker.Controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.project.expenseTracker.Entity.MonthlyExpenses;
import com.project.expenseTracker.Service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
public class ExpenseTrackerController {

    @Autowired
    public ExpenseService expenseService;
    @Autowired
    public ObjectMapper mapper;


    @GetMapping("/")
    public String ping(){
        return "Yes you are connected!!";
    }

    @PutMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ObjectNode loginIntoApplication(@RequestBody ObjectNode JSONobject){
        System.out.println(JSONobject);
        Boolean flag = expenseService.isUser(JSONobject.get("data").get("emailId").asText(),JSONobject.get("data").get("password").asText());
        ObjectNode objectNode = mapper.createObjectNode();
        objectNode.put("emailId", JSONobject.get("data").get("emailId").asText());
        objectNode.put("flag", flag);
        return objectNode;
    }

    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:3000")
    public Boolean registerUserIntoApplication(@RequestBody ObjectNode JSONobject) throws Exception{
        return expenseService.addUser(JSONobject);
    }





    @GetMapping("/getExpenses")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<MonthlyExpenses> getTheExpense(@RequestParam("emailId") String emailId, @RequestParam("monthNumber") String month) throws SQLException {
        List<MonthlyExpenses> monthlyExpenses = expenseService.getExpenses(emailId,month);
        return monthlyExpenses;
    }

    @GetMapping("/leftOver/")
    @CrossOrigin(origins = "http://localhost:3000")
    public double getLeftOverMoney() throws Exception {
        return expenseService.getLeftOverMoney();
    }

    @PostMapping("/addExpense/")
    @CrossOrigin(origins = "http://localhost:3000")
    public Boolean addTheExpense(@RequestBody ObjectNode JSONobject) throws Exception {
        return expenseService.addExpenses(JSONobject);
    }

    @DeleteMapping("/deleteExpense")
    @CrossOrigin(origins = "http://localhost:3000")
    public Boolean deleteTheExpense(@RequestParam("id") Integer identifier) throws Exception{
        return expenseService.deleteExpense(identifier);
    }


}


