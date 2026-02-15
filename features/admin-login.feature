Feature: Admin Login

As a Admin
I want to login the system
So that I can access the Dashboard

Scenario: Successful admin login
    Given User launch the application
    When User login with valid admin credentials
    Then User should see the admin dashboard
