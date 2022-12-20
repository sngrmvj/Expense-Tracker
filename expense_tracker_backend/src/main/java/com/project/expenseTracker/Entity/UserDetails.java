package com.project.expenseTracker.Entity;



import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
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
    private double salaryAmount;

    @CreatedDate
    private Instant userCreatedDate;


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
    public void setSalaryAmount(double amount){
        this.salaryAmount = amount;
    }


    public double getSalaryAmount(){
        return this.salaryAmount;
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
    public Instant getCreatedDate(){
        return this.userCreatedDate;
    }
    public Integer getId(){
        return  this.id;
    }
}
