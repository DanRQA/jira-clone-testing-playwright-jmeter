import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { generateProjectDetails } from "../../../utils/projectUtils";
import * as dotenv from "dotenv";
dotenv.config();

test("Should return 200 status code - Create new project", async ({ request }) => {
  const { projectTitle, projectDescription } = generateProjectDetails();

  const body = {
    title: projectTitle,
    description: projectDescription,
    user: process.env.DS_USER_ID || "",
    _action: "upsert",
  };
  const response = await request.post("/projects/new", {
    form: body,
  });

  expect(response.status()).toBe(200);

  const getResponse = await request.get("/projects");
  const getResponseBody = await getResponse.text();

  expect(getResponse.status()).toBe(200);
  expect(getResponseBody).toContain(projectTitle);
});

test("Should return 200 status code - Create new project with no description", async ({
  request,
}) => {
  const { projectTitle, projectDescription } = generateProjectDetails();

  const body = {
    title: projectTitle,
    description: projectDescription,
    user: process.env.DS_USER_ID || "",
    _action: "upsert",
  };
  const response = await request.post("/projects/new", {
    form: body,
  });

  expect(response.status()).toBe(200);

  const getResponse = await request.get("/projects");
  const getResponseBody = await getResponse.text();

  expect(getResponse.status()).toBe(200);
  expect(getResponseBody).toContain(projectTitle);
});

test("Should return 200 status code - Create new project with title containing 30 characters", async ({
  request,
}) => {
  // Override generateProjectDetails for this specific test
  function generateLongTitleProjectDetails(): { projectTitle: string; projectDescription: string } {
    return {
      projectTitle: `${faker.lorem.words(30)}`,
      projectDescription: "",
    };
  }

  const { projectTitle } = generateLongTitleProjectDetails();

  const body = {
    title: projectTitle,
    description: "",
    user: process.env.DS_USER_ID || "",
    _action: "upsert",
  };
  const response = await request.post("/projects/new", {
    form: body,
  });

  expect(response.status()).toBe(200);

  const getResponse = await request.get("/projects");
  const getResponseBody = await getResponse.text();

  expect(getResponse.status()).toBe(200);
  expect(getResponseBody).toContain(projectTitle);
});

test("Should return 200 status code - Create new project with title containing 31 characters", async ({
  request,
}) => {
  // Override generateProjectDetails for this specific test
  function generateLongTitleProjectDetails(): { projectTitle: string; projectDescription: string } {
    return {
      projectTitle: `${faker.lorem.words(31)}`,
      projectDescription: "",
    };
  }

  const { projectTitle } = generateLongTitleProjectDetails();

  const body = {
    title: projectTitle,
    description: "",
    user: process.env.DS_USER_ID || "",
    _action: "upsert",
  };
  const response = await request.post("/projects/new", {
    form: body,
  });

  expect(response.status()).toBe(200);

  const getResponse = await request.get("/projects");
  const getResponseBody = await getResponse.text();

  expect(getResponse.status()).toBe(200);
  expect(getResponseBody).toContain(projectTitle);
});

test("Should return 400 status code - Create new project no title", async ({ request }) => {
  const { projectDescription } = generateProjectDetails();

  const expectedText = "Name is required";
  const body = {
    title: "",
    description: projectDescription,
    user: process.env.DS_USER_ID || "",
    _action: "upsert",
  };

  const response = await request.post("/projects/new", {
    form: body,
  });

  const getResponseBody = await response.text();

  expect(response.status()).toBe(400);
  expect(getResponseBody).toContain(expectedText);
});
