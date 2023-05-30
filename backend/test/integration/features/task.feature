Feature: Task
  Create, toggle, update, delete and get Tasks

  Scenario: Get all Tasks
    Given I am a admin user
    And I am authenticated
    When I send a GET request to "http://localhost:8000/api/v1/tasks"
    Then the response code should be 200
    And the response body should be json:
    """
      [
          {
              "id": uuid(4),
              "userId": uuid(4),
              "title": "Learn typescript",
              "isChecked": false,
              "description": "You need typescript in your future, so learn it now"
          },
          {
              "id": uuid(4),
              "userId": uuid(4),
              "title": "Study project for full stack",
              "isChecked": false,
              "description": "Finish project",
              "dueDate": "2023-07-09T10:00:00.000Z"
          },
          {
              "id": uuid(4),
              "userId": uuid(4),
              "title": "Presentation for full stack",
              "isChecked": false,
              "description": null,
              "dueDate": "2023-07-09T22:00:00.000Z"
          }
      ]
    """

  Scenario: Create Task
    Given the Content-Type is 'application/json'
    And I am a normal user
    And I am authenticated
    When I send a POST request to "http://localhost:8000/api/v1/me/tasks" with json:
    """
      {
        "title": "Add cucumber tests",
        "description": "Example description"
      }
    """
    Then the response code should be 200
    And the response body should be json:
    """
      {
        "id": uuid(4),
        "userId": uuid(4),
        "title": "Add cucumber tests",
        "description": "Example description",
        "isChecked": false
      }
    """
