import request from "supertest";
import { Given, Then } from "cucumber";
import app from "../../../../src/api/app";
import assert from "assert";

let _request: request.Test;
let _response: request.Response;

const newLinesToSpaces = (text: string) => {
  return text.replace(/(\r\n|\n|\r)/gm," ");
};

Given("I send a POST request to {string} with body:", (route: string, body: string) => {
  _request = request(app).post(route).send(JSON.parse(newLinesToSpaces(body)));
});

Given("I send a PATCH request to {string} with body:", (route: string, body: string) => {
  _request = request(app).patch(route).send(JSON.parse(newLinesToSpaces(body)));
});

Given("I send a DELETE request to {string}", (route: string) => {
_request = request(app).delete(route).send();
});

Then("the response status code should be {int}", async (status: number) => {
  _response = await _request.expect(status);
});

Then("the response should be empty", () => {
  assert.deepStrictEqual(_response.body, {});
});

Then("the response content should be:", response => {
  assert.deepStrictEqual(_response.body, JSON.parse(newLinesToSpaces(response)));
});
