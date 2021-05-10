Feature: Delete a genially


    Scenario: An existing genially
        Given I send a POST request to "/genially" with body:
        """
        {
            "id": "6212be03-914a-40b1-881b-7397f20bb656",
            "name": "My first Genially",
            "description": "The description of my first genially"
        }
        """
        Then the response status code should be 201
        Given I send a DELETE request to "/genially/6212be03-914a-40b1-881b-7397f20bb656"
        Then the response status code should be 204
        And the response should be empty

    Scenario: A non existing genially
        Given I send a DELETE request to "/genially/12d5eb66-f4ce-46e9-b2dc-1ed6077273b0"
        Then the response status code should be 400
        And the response content should be:
        """
        {
          "message": "Genially <12d5eb66-f4ce-46e9-b2dc-1ed6077273b0> does no exist"
        }
        """