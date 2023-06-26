@task
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
              "isChecked": true,
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

  Scenario: Get task by id
    Given I am a normal user
    And I am authenticated
    When I send a GET request to "http://localhost:8000/api/v1/tasks/3f86e4b1-1243-4e5d-b2f9-1da23b7576a4"
    Then the response code should be 200
    And the response body should be json:
    """
      {
        "id": uuid(4),
        "userId": uuid(4),
        "title": "First task",
        "description": "This is a example task",
        "dueDate": dateString,
        "isChecked": false,
        "tag": null,
        "createdAt": dateString,
        "updatedAt": dateString
      }
    """

  Scenario: Check task
    Given I am a normal user
    And I am authenticated
    When I send a PATCH request to "http://localhost:8000/api/v1/tasks/3f86e4b1-1243-4e5d-b2f9-1da23b7576a4/toggle"
    Then the response code should be 200
    And print response

  Scenario: Update task by id
    Given the Content-Type is 'application/json'
    And I am a normal user
    And I am authenticated
    When I send a PUT request to "http://localhost:8000/api/v1/tasks/3f86e4b1-1243-4e5d-b2f9-1da23b7576a4" with json:
    """
      {
        "title": "Update the task title",
        "description": "Updated task description",
        "isChecked": false,
        "tag": "updatedTag",
        "dueDate": "2023-06-26T20:00:00.000Z"
      }
    """
    Then the response code should be 200
    And the response body should be json:
    """
      {
        "id": uuid(4),
        "userId": uuid(4),
        "title": "Update the task title",
        "description": "Updated task description",
        "dueDate": "2023-06-26T20:00:00.000Z",
        "isChecked": false,
        "tag": "updatedTag",
        "createdAt": dateString,
        "updatedAt": dateString
      }
    """

  Scenario: Delete task by id
    Given I am a normal user
    And I am authenticated
    When I send a DELETE request to "http://localhost:8000/api/v1/tasks/3f86e4b1-1243-4e5d-b2f9-1da23b7576a4"
    Then the response code should be 204
