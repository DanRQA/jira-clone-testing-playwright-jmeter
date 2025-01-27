# Jira Clone Demo 📋

🚀 **Welcome to the Jira Clone Demo repository!**  
This project is a fork of [daniserrano7/jira-clone](https://github.com/daniserrano7/jira-clone), with the addition of:

- **End-to-End Tests** using [Playwright](https://playwright.dev/) and **TypeScript**
- **Performance Tests** using [JMeter](https://jmeter.apache.org/).

> 🛠️ **Work in Progress**: I'm actively adding new tests and improving this project. Stay tuned for updates!

---

## 🌟 Features

### End-to-End Tests

The tests are written in **TypeScript** and follow the **Page Object Model (POM)** for better maintainability and reusability.

#### **🔑 Login Tests**

- **Login as Default User**:
    - Verifies login page elements.
    - Logs in as the default user.
    - Asserts redirection to the Projects Page.

#### **📂 Projects Tests**

- **User Can Add a Project**:
    - Logs in via API.
    - Adds a new project using randomly generated titles and descriptions (via `faker.js`).
    - Confirms the project appears in the Projects Page.
- **Default User Can Create a Project**:
    - Verifies that a user can create a project by submitting the project form.
- **Create a Project with Multiple Owners**:
    - Creates a project with multiple owners.
    - Logs in as assigned users to verify access.
    - Confirms assigned users can view the project in their project list.

#### **🚪 Logout Tests**

- **User Can Log Out**:
    - Confirms a logged-in user can log out successfully.
    - Asserts redirection to the login page.

---

## 📈 Performance Tests

[Performance tests](https://github.com/DanielRamos84/jira-clone-testing-playwright-jmeter/blob/master/jmeter/README.md) are implemented using JMeter to analyze and validate the system's performance under various load conditions.

---

## 🎯 Project Highlights

- **Testing Frameworks**:
    - End-to-End Testing: [Playwright](https://playwright.dev/) with **TypeScript**
    - Performance Testing: [JMeter](https://jmeter.apache.org/)
- **Testing Design**:
    - Organized using the **Page Object Model (POM)** for scalability.
    - Incorporates **API-driven tests** for efficiency.
    - Utilizes `faker.js` for generating dynamic test data.