# ExpenseTracker

### Introduction
The application's concept is to track a person's monthly spending. 
  - The expense in this application is categorised into 2 types.
    - Nice to have expense
    - Must have expense
  - This application has enough intelligence to advise you to quit spending money on "nice-to-have" items.

### Components
- Backend
  - Backend is developed in Spring boot (Java).
  - It has controller which receives the API requests.
  - IT has 2 db models in entity.
    - One is for authentication purpose.
    - The other is for the monthly expense tracker
  - The Service level is where the business logic of data processing and data retrieval is available.
- Frontend
  - Frontend is developed in ReactJs.
  - It has 3 screens
    - One is where the user can see all his expenses in tabular format and the left over amount of his expenditure.
    - The other screen where the user enters the expense details. 
      - Note: At the start of the month we add the check to add a field to enter the total budget for the month.
    - One more screen displays a bar graph for the last 3 months. 3 bar graphs per month for 3 months. The bar graphs are total-nice-to-have expense for that month, total-must-have expense for the month and total-overall-expense for the month.
- Database
  - We used Postgresql to store the details. 
    - We have 2 tables
      - One is to store the user details for the authentication and to store the "currentMonthlyExpense" for that month.
      - The other is mothly expense details. 
    - We retrieve the expense data for a user based on the email and current month.
  - We used postgres docker image for database and visualized the data using dbVisualizer.

### Steps to build a java project
1. If you see a “target” folder delete it
2. Open Maven tab (right side),
  1. Clean project
  2. Install the application
3. A new target folder gets created, where the jar folder gets created.
4. Navigate to target folder and run,  java -jar <>.jar file
5. If you want to run the jar in different port java -jar <>.jar —server.port=8081

### Steps to start react application
- The URL for REST APIs is configured under /expense_tracker_frontend/src/constants.js
- Install node_modules `npm install`
- Run the application `npm start`. It opens at `http://localhost:3000`.
- Note: Please do `localStorage.clear()` to clear the localStorage for proper work of the application. We did not use cookies.


### Future work
- We can include notification assistance, in which the programme delivers the notification to the user by email or other ways.
- We can also add smartness for suggestions based on the budget and also add some checklist for both nice-to-have and must-have expenses.
- We can also add the suggestions based on the progressions of the date of the month considering the left over budget. 
