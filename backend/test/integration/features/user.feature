Feature: User
  Create, update, delete and get users

  Scenario: Get all users
    Given I am a admin user
    And I am authenticated
    When I send a GET request to "http://localhost:8000/api/v1/users"
    Then the response code should be 200
    And the response body should be json:
      """
        [
          {
            "id": uuid(4),
            "email": "root@example.com",
            "firstName": "Root",
            "lastName": ""
          },
          {
            "id": uuid(4),
            "email": "john.doe@example.com",
            "firstName": "John",
            "lastName": "Doe"
          }
        ]
      """

  Scenario: Get all users (no-admin)
    Given I am a normal user
    And I am authenticated
    When I send a GET request to "http://localhost:8000/api/v1/users"
    Then the response code should be 403

  Scenario: Get infos of current user
    Given I am a normal user
    And I am authenticated
    When I send a GET request to "http://localhost:8000/api/v1/me"
    Then the response code should be 200
    And the response body should be json:
      """
        {
          "id": uuid(4),
          "email": "john.doe@example.com",
          "firstName": "John",
          "lastName": "Doe"
        }
      """

  Scenario: Get infos of current user (not logged in)
    When I send a GET request to "http://localhost:8000/api/v1/me"
    Then the response code should be 401

  Scenario: Create User
    Given the Content-Type is 'application/json'
    When I send a POST request to "http://localhost:8000/api/v1/users" with json:
      """
        {
          "email": "mymail@bla.de",
          "password": "mypasswd",
          "firstName": "Alice",
          "lastName": "Musterfrau"
        }
      """
    Then the response code should be 201
    And the response body should be json:
      """
        {
          "id": uuid(4),
          "email": "mymail@bla.de",
          "firstName": "Alice",
          "lastName": "Musterfrau"
        }
      """
