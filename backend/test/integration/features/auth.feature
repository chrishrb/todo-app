Feature: Authentication
  Login user, verify user, refresh token

  Scenario: Login user (correct email/password)
    Given the Content-Type is 'application/json'
    When I send a POST request to "http://localhost:8000/api/v1/auth/login" with json:
      """
        {
          "email": "root@example.com",
          "password": "root"
        }
      """
    Then the response code should be 200
    And the response body should be json:
      """
        {
          "tokenType": "Bearer",
          "accessToken": String
        }
      """

  Scenario: Login user (incorrect email)
    Given the Content-Type is 'application/json'
    When I send a POST request to "http://localhost:8000/api/v1/auth/login" with json:
      """
        {
          "email": "not.existant@example.com",
          "password": "root"
        }
      """
    Then the response code should be 403
    And the response body should be json:
      """
        {
          "errorCode": 403,
          "errorMessage": "Forbidden",
          "details": "Email not found."
        }
      """

  Scenario: Login user (incorrect password)
    Given the Content-Type is 'application/json'
    When I send a POST request to "http://localhost:8000/api/v1/auth/login" with json:
      """
        {
          "email": "root@example.com",
          "password": "wrong_password"
        }
      """
    Then the response code should be 403
    And the response body should be json:
      """
        {
          "errorCode": 403,
          "errorMessage": "Forbidden",
          "details": "Incorrect password."
        }
      """

  Scenario: Verify user
    Given I am a normal user
    And I am authenticated
    Given the Content-Type is 'application/json'
    When I send a GET request to "http://localhost:8000/api/v1/auth/verify"
    Then the response code should be 200
    And the response body should be json:
      """
        {
          "userId": uuid(4),
          "email": "john.doe@example.com",
          "isAdmin": false
        }
      """
