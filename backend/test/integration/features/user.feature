@user
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
            "email": "admin@todo.com",
            "firstName": "Admin",
            "lastName": "",
            "isAdmin": true,
            "language": "EN_US",
            "createdAt": dateString,
            "updatedAt": dateString
          },
          {
            "id": uuid(4),
            "email": "john.doe@todo.com",
            "firstName": "John",
            "lastName": "Doe",
            "isAdmin": false,
            "language": "DE_DE",
            "createdAt": dateString,
            "updatedAt": dateString
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
          "email": "john.doe@todo.com",
          "firstName": "John",
          "lastName": "Doe",
          "isAdmin": false,
          "language": "DE_DE",
          "createdAt": dateString,
          "updatedAt": dateString
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
          "lastName": "Musterfrau",
          "isAdmin": false,
          "language": "EN_US",
          "createdAt": dateString,
          "updatedAt": dateString
        }
      """

  Scenario: Get user by id
    Given I am a normal user
    And I am authenticated
    When I send a GET request to "http://localhost:8000/api/v1/users/5a288c41-83a0-4046-9c63-38a117e4b61a"
    Then the response code should be 200
    And the response body should be json:
      """
        {
          "id": uuid(4),
          "email": "john.doe@todo.com",
          "firstName": "John",
          "lastName": "Doe",
          "isAdmin": false,
          "language": "DE_DE",
          "createdAt": dateString,
          "updatedAt": dateString
        }
      """

  Scenario: Update user by id
    Given the Content-Type is 'application/json'
    And I am a normal user
    And I am authenticated
    When I send a PUT request to "http://localhost:8000/api/v1/users/5a288c41-83a0-4046-9c63-38a117e4b61a" with json:
      """
        {
          "firstName": "Vivian",
          "lastName": "Rodwell",
          "isAdmin": true,
          "language": "EN_US"
        }
      """
    Then the response code should be 200
    And the response body should be json:
      """
        {
          "id": uuid(4),
          "email": "john.doe@todo.com",
          "firstName": "Vivian",
          "lastName": "Rodwell",
          "isAdmin": false,
          "language": "EN_US",
          "createdAt": dateString,
          "updatedAt": dateString
        }
      """

  Scenario: Delete user by id
    Given I am a normal user
    And I am authenticated
    When I send a DELETE request to "http://localhost:8000/api/v1/users/5a288c41-83a0-4046-9c63-38a117e4b61a"
    Then the response code should be 204
