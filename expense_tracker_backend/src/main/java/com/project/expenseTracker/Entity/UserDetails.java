package com.project.expenseTracker.Entity;



import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;

import java.sql.Timestamp;
import java.time.Instant;

@Entity
@Table(name = "users")
public class UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String emailId;
    private String firstName;
    private String lastName;
    private String password;
    private Timestamp createdDate;


    public void setEmailId(String email){
        this.emailId = email;
    }
    public void setFirstName(String firstName){
        this.firstName = firstName;
    }
    public void setLastName(String lastName){
        this.lastName = lastName;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public void setCreatedDate(Timestamp time) {
        this.createdDate = time;
    }
//    public void setSalaryAmount(double amount){
//        this.salaryAmount = amount;
//    }


//    public double getSalaryAmount(){
//        return this.salaryAmount;
//    }
    public String getEmailId(){
        return this.emailId;
    }
    public String getFirstName(){
        return this.firstName;
    }
    public String getLastName(){
        return this.lastName;
    }
    public Integer getId(){
        return  this.id;
    }
    public Timestamp getCreatedDate(){
        return this.createdDate;
    }
}
