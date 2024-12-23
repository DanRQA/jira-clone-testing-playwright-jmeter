# jira-clone-testing-playwright-jmeter (WIP)
Repo for a Jira clone demo featuring end-to-end tests with Playwright and performance tests with [JMeter](./jmeter/README.md).

## End-to-End Tests

### Login Tests
- **Login as default user**: This test navigates to the login page, verifies the login page elements, performs a login, and asserts that the user is redirected to the Projects Page.

### Projects Tests
- **User is able to add a project**: User is logged in via API and in the projects page, verifies that the user can click on the Add Project button, fill out the project title and description using faker, and then verify that the new project is present in the Projects page.
- **Default user can create a project**: Verifies that a logged-in user can create a new project by filling out the project form with randomly generated title and description using faker.js.
- **Default user can create a project with multiple owners**: Tests the ability to create a project and assign multiple users as owners. The test:
  - Creates a project with random details
  - Selects multiple users as project owners
  - Verifies project access by logging in as different users
  - Confirms that assigned users can see the project in their project list

### Logout Tests
- **User is able to logout**: This test verifies that a logged-in user can successfully log out by clicking on the logout button and being redirected to the login screen.