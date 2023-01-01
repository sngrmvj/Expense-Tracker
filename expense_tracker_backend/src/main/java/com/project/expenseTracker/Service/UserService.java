package com.project.expenseTracker.Service;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.project.expenseTracker.Entity.UserDetails;
import com.project.expenseTracker.Repository.UserRepository;
import com.project.expenseTracker.Response.FirstAndLastNameResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    public UserRepository userRepository;

    public Boolean isUser(String emailId, String recivedPassword){
        String retrievedPassword = userRepository.findUserByEmail(emailId);
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
            return false;
        }
    }

    public FirstAndLastNameResponse getUserName(String email){
        UserDetails userDetails = userRepository.getNameByEmail(email);
        FirstAndLastNameResponse firstAndLastNameResponse = new FirstAndLastNameResponse();
        firstAndLastNameResponse.setFirstname(userDetails.getFirstName());
        firstAndLastNameResponse.setLastname(userDetails.getLastName());
        return firstAndLastNameResponse;
    }

    public Optional<Double> getLeftOverMoney(String emailId) throws Exception{
        return userRepository.leftOverCurrentMonthlyExpense(emailId);
    }

    public void updateLeftOverAmountOfUser(String emailId, Double leftOverAmount){
        userRepository.updateBalance(emailId, leftOverAmount);
    }

}
