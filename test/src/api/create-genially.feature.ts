Feature: Create a new genially

    Scenario: A valid unexisting genially
        Given I send a POST request to "/genially" with body:
        """
        {
            "id": "6212be03-914a-40b1-881b-7397f20bb656",
            "name": "My first Genially",
            "description": "The description of my first genially"
        }
        """
        Then the response status code should be 201
        And the response should be empty

    Scenario: A genially with invalid name
        Given I send a POST request to "/genially" with body:
        """
        {
            "id": "6212be03-914a-40b1-881b-7397f20bb656",
            "name": "My",
            "description": "The description of my first genially"
        }
        """
        Then the response status code should be 400
        And the response content should be:
        """
        {
          "message": "Genially name <My> has an invalid length. it has to be from 3 to 20 characters"
        }
        """

    Scenario: A genially with an empty name
        Given I send a POST request to "/genially" with body:
        """
        {
            "id": "6212be03-914a-40b1-881b-7397f20bb656",
            "name": "",
            "description": "The description of my first genially"
        }
        """
        Then the response status code should be 400
        And the response content should be:
        """
        {
          "message": "Genially cannot have an empty name"
        }
        """

    Scenario: A genially with invalid description
        Given I send a POST request to "/genially" with body:
        """
        {
            "id": "6212be03-914a-40b1-881b-7397f20bb656",
            "name": "My first Genially",
            "description": "The description of my first genially Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
        """
        Then the response status code should be 400
        And the response content should be:
        """
        {
          "message": "Genially description too long (503 characters) it is limited to 125 characters"
        }
        """