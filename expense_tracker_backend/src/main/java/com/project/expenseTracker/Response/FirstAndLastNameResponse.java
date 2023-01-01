package com.project.expenseTracker.Response;

public class FirstAndLastNameResponse {
    private String firstname;
    private String lastname;


    public void setFirstname(String firstname){
        this.firstname = firstname;
    }

    public void setLastname(String lastname){
        this.lastname = lastname;
    }


    public String getFirstname(){
        return this.firstname;
    }

    public String getLastname(){
        return this.lastname;
    }
}
