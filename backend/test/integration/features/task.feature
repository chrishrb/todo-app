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
              "description": "You need typescript in your future, so learn it now",
              "tag": "study",
              "createdAt": dateString,
              "updatedAt": dateString
          },
          {
              "id": uuid(4),
              "userId": uuid(4),
              "title": "Study project for full stack",
              "isChecked": false,
              "description": "Finish project",
              "dueDate": "2023-07-09T08:00:00.000Z",
              "tag": "work",
              "createdAt": dateString,
              "updatedAt": dateString
          },
          {
              "id": uuid(4),
              "userId": uuid(4),
              "title": "First task",
              "isChecked": false,
              "description": "This is a example task",
              "tag": null,
              "createdAt": dateString,
              "updatedAt": dateString
          }
      ]
    """

  Scenario: Get all Tasks (only with tag work)
    Given I am a admin user
    And I am authenticated
    When I send a GET request to "http://localhost:8000/api/v1/tasks?tag=work"
    Then the response code should be 200
    And the response body should be json:
    """
      [
          {
              "id": uuid(4),
              "userId": uuid(4),
              "title": "Study project for full stack",
              "isChecked": false,
              "description": "Finish project",
              "dueDate": "2023-07-09T08:00:00.000Z",
              "tag": "work",
              "createdAt": dateString,
              "updatedAt": dateString
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
        "dueDate": dateString,
        "isChecked": false,
        "tag": null,
        "createdAt": dateString,
        "updatedAt": dateString
      }
    """
