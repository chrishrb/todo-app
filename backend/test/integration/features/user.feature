Feature: User
  Create, update, delete and get users

  Scenario: Create User
    Given the Content-Type is 'application/json'
    When I send a POST request to "http://localhost:8000/api/v1/users" with json:
      """
        {
          "email": "mymail@bla.de",
          "password": "mypasswd"
        }
      """
    Then the response code should be 201
    And the response body should be json:
      """
        {
          "id": 1,
          "email": "mymail@bla.de"
        }
      """

  Scenario: Get all users
    When I send a GET request to "http://localhost:8000/api/v1/users"
    Then the response code should be 200
    And the response body should be json:
      """
        [
          {
            "id": 1,
            "email": "mymail@bla.de"
          }
        ]
      """
