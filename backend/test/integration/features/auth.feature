Feature: Authentication
  Login user, verify user, refresh token

  Scenario: Login user (correct email/password)
    Given the Content-Type is 'application/json'
    When I send a POST request to "http://localhost:8000/api/v1/auth/login" with json:
      """
        {
          "email": "admin@todo.com",
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
    Then the response code should be 401
    And the response body should be json:
      """
        {
          "errorCode": 401,
          "errorMessage": "Unauthorized",
          "details": [
            {
              "field": "email",
              "replyCode": 4200,
              "replyMessage": "Wrong email",
              "value": "not.existant@example.com"
            }
          ]
        }
      """

  Scenario: Login user (incorrect password)
    Given the Content-Type is 'application/json'
    When I send a POST request to "http://localhost:8000/api/v1/auth/login" with json:
      """
        {
          "email": "admin@todo.com",
          "password": "wrong_password"
        }
      """
    Then the response code should be 401
    And the response body should be json:
      """
        {
          "errorCode": 401,
          "errorMessage": "Unauthorized",
          "details": [
            {
              "field": "password",
              "replyCode": 4201,
              "replyMessage": "Wrong password"
            }
          ]
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
          "type": "accessToken",
          "userId": uuid(4),
          "isAdmin": false
        }
      """

  Scenario: Refresh access token
    Given I am a normal user
    And I am authenticated
    Given the Content-Type is 'application/json'
    When I send a GET request to "http://localhost:8000/api/v1/auth/refresh"
    Then the response code should be 200
    And the response body should be json:
      """
        {
          "tokenType": "Bearer",
          "accessToken": String
        }
      """

  Scenario: Logout user
    Given I am a normal user
    And I am authenticated
    Given the Content-Type is 'application/json'
    When I send a GET request to "http://localhost:8000/api/v1/auth/logout"
    Then the response code should be 204
    And the user is logged out
