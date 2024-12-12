# jira-clone-testing-playwright-jmeter (WIP)
Repo for a Jira clone demo featuring end-to-end tests with Playwright and performance tests with [JMeter](./jmeter/README.md).

## End-to-End Tests

### Login Tests
- **Login as default user**: This test navigates to the login page, verifies the login page elements, performs a login, and asserts that the user is redirected to the Projects Page.

### Projects Tests
- **User is able to add a project**: User is logged in via API and in the projects page, and verifies that the user can click on the Add Project button. ![In Progress](https://img.shields.io/badge/status-in%20progress-yellow)