import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

test("200 Status code visits login page", async ({ request }) => {
  const expectedText = "Select login user";
  const response = await request.get("/login");
  const responseBody = await response.text();
  const contentType = response.headers()["content-type"];

  expect(response.status()).toBe(200);
  expect(contentType).toContain("text/html");
  expect(responseBody).toContain(expectedText);
});

test("200 Status code login as valid user", async ({ request }) => {
  const response = await request.post("/login", {
    form: {
      _data: "routes/login",
      user: process.env.DS_USER_ID || "",
      _action: "setUser",
    },
  });

  expect(response.status()).toBe(200);
});

test("404 Status code login as invalid user", async ({ request }) => {
  const expectedPageTitle = "Oops! Not found";
  const response = await request.post("/login", {
    form: {
      _data: "routes/login",
      user: "ACB123",
      _action: "setUser",
    },
  });
  const responseBody = await response.text();
  
  expect(response.status()).toBe(404);
  expect(responseBody).toContain(expectedPageTitle);
});

test("404 error code visiting non-existing page", async ({ request }) => {
  const expectedText = "It seems that you have lost! Go to the main page";
  const response = await request.get("login/payment");
  const responseBody = await response.text();

  expect(response.status()).toBe(404);
  expect(responseBody).toContain(expectedText);
});
