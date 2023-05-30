Feature: Task
  Create, toggle, update, delete and get Tasks

  Scenario: Get all Tasks
    Given I am a admin user
    Given I am authenticated
    When I send a GET request to "http://localhost:8000/api/v1/tasks"
    Then the response code should be 200
    And the response body should be json:
    """
      [
        {
          "id": 1,
          "title": 'implement easter eggs',
          "description": '',
          "dueDate": "2023-05-12",
        }, 
        {
          "id": 2,
          "title": 'read "zero to production in Rust"',
          "description": 'because Rust is obviously superior. Arch btw',
          "dueDate": "2023-06-27",
        }
      ]
    """

  Scenario: Get specific Task
    Given I am a normal user
    Given I am authenticated
    When I send a GET request to "http://localhost:8000/api/v1/tasks/1"
    Then the response code should be 200
    And the response body should be json:
    """
      {
        "id": 1,
        "title": 'implement easter eggs',
        "description": '',
        "dueDate": "2023-05-12",
      }
    """

  Scenario: Create Task
    Given I am a normal user
    Given I am authenticated
    When I send a POST request to "http://localhost:8000/api/v1/tasks/" with json:
    """
      {
        "title": 'titel',
        "description": 'cucumba',
      }
    """
    Then the response code should be 200
    And the response body shoud be json:
    """
      {
        "id": 3,
        "title": 'titel',
        "description": 'cucumba',
      }
    """
