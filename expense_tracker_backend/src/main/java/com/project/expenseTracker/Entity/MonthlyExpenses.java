package com.project.expenseTracker.Entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;

import java.sql.Timestamp;
import java.time.Instant;

@Entity
@Table(name = "MonthlyExpenses")
public class MonthlyExpenses {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private double initialAmount;
    private String category;
    private double priceOfExpense;
    private double leftOverAmount;
    private String type;
    private Timestamp createdDate;
    private String emailId;




    public void setInitialAmount(double amount){
        this.initialAmount = amount;
    }
    public void setCategory(String category){
        this.category = category;
    }
    public void setLeftOverAmount(double amount){
        this.leftOverAmount = amount;
    }
    public void setType(String type){
        this.type = type;
    }
    public void setPriceOfExpense(double amount) { this.priceOfExpense = amount; }
    public void setCreatedDate(Timestamp time) {
        this.createdDate = time;
    }
    public void setEmailId(String emailId){
        this.emailId = emailId;
    }


    public double getLeftOverAmount(){
        return this.leftOverAmount;
    }
    public String getType(){
        return this.type;
    }
    public String getCategory(){
        return this.category;
    }
    public double getInitialAmount(){
        return this.initialAmount;
    }
    public double getPriceOfExpense(){
        return this.priceOfExpense;
    }
    public Timestamp getCreatedDate(){
        return this.createdDate;
    }
    public Integer getId(){
        return  this.id;
    }
    public String getEmailId() {
        return  this.emailId;
    }
}