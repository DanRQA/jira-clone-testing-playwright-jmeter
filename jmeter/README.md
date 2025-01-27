# JMeter Performance Testing 🚀

📚 **Welcome to my JMeter learning journey!**  
This repository showcases my progress with **API performance testing** and understanding key performance metrics through practical examples.

> 🛠️ **Work in Progress**: I'm continuously refining tests, exploring advanced scenarios, and optimizing configurations.

---

## 🌟 Overview

This folder focuses on:

- **API Performance Testing**: Evaluating CRUD operations on a project management application (Jira Clone).
- **Performance Metrics Analysis**: Identifying bottlenecks and fine-tuning configurations for scalability and stability.

---

## 📂 Current Script

### **`jira-clone-jmeter.jmx`**

A performance test script designed to evaluate response times for key operations in the Jira Clone application.

#### **Test Scenario**

Simulates the following operations while correlating dynamic values (e.g., `projectId` and `todoId`):

1. Creating a new project.
2. Adding a task to the project.
3. Deleting the project.

---

## ⚙️ Configuration

- **Virtual Users**: 25
- **Ramp-Up Period**: 120 seconds
- **Execution**:
    - Run via **JMeter CLI**.
    - Uses a backend listener to integrate with **InfluxDB** for live monitoring in **Grafana**.
    - Generates a detailed HTML report after execution (stored in the `htmlrecorder` folder).

---

## 📊 Test Results

- **Live Monitoring**: Performance metrics visualized on a **Grafana Dashboard**.

![Grafana Dashboard](../images/Influxdb%20Listener-GrafanaDashboard.png)

- **Fine-Tuning in Progress**:
    - Investigating API request errors under higher virtual user loads.
    - Optimizing configurations to improve performance and stability.

---

## 🚀 Future Plans

- Expand test scenarios to include more **complex, parameterized, and data-driven tests**.
- Implement best practices for securely passing sensitive parameters like `influxdbToken` (avoiding hardcoding).
- Automate cleanup of the `htmlrecorder` folder and `.jtl` log file before running test plans.