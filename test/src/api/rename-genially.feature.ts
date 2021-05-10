Feature: Rename a genially


    Scenario: Rename an existing genially
        Given I send a POST request to "/genially" with body:
        """
        {
            "id": "6212be03-914a-40b1-881b-7397f20bb656",
            "name": "My first Genially",
            "description": "The description of my first genially"
        }
        """
        Then the response status code should be 201
        Given I send a PATCH request to "/genially/6212be03-914a-40b1-881b-7397f20bb656" with body:
        """
        {
            "name": "New name"
        }
        """
        Then the response status code should be 200
        And the response should be empty

    Scenario: Rename an existing genially with a length of name invalid
        Given I send a POST request to "/genially" with body:
        """
        {
            "id": "6212be03-914a-40b1-881b-7397f20bb656",
            "name": "My first Genially",
            "description": "The description of my first genially"
        }
        """
        Then the response status code should be 201
        Given I send a PATCH request to "/genially/6212be03-914a-40b1-881b-7397f20bb656" with body:
        """
        {
            "name": "Ne"
        }
        """
        Then the response status code should be 400
        And the response content should be:
        """
        {
          "message": "Genially name <Ne> has an invalid length. it has to be from 3 to 20 characters"
        }
        """

    Scenario: A non existing genially
        Given I send a PATCH request to "/genially/febf9ee7-1e77-4572-9934-27030b9206ba" with body:
        """
        {
            "name": "New name"
        }
        """
        Then the response status code should be 400
        And the response content should be:
        """
        {
          "message": "Genially <febf9ee7-1e77-4572-9934-27030b9206ba> does no exist"
        }
        """