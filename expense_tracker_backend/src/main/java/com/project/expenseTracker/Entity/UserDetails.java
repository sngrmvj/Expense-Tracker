package com.project.expenseTracker.Entity;



import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;

import java.sql.Timestamp;
import java.time.Instant;

@Entity
@Table(name = "users")
public class UserDetails {

    @Id
    @SequenceGenerator(
            name= "userDetails_Sequence",
            sequenceName = "userDetails_Sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "userDetails_Sequence"
    )
    private int id;

    private String emailId;
    private String firstName;
    private String lastName;
    private String password;
    private Timestamp createdDate;
    @Column(name = "current_monthly_expense", nullable = true)
    private double currentMonthlyExpense;
    private Timestamp expenseUpdatedDate;


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
    public void setCurrentMonthlyExpense(double amount){
        this.currentMonthlyExpense = amount;
    }
    public void setExpenseUpdatedDate(Timestamp date) {
        this.expenseUpdatedDate = date;
    }


    public double getCurrentMonthlyExpense(){
        return this.currentMonthlyExpense;
    }
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
    public Timestamp getExpenseUpdatedDate() {
        return this.expenseUpdatedDate;
    }
}
