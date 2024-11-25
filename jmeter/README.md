# JMeter

## About
This folder showcases my learning journey with JMeter focusing on:
- API performance testing.
- Understanding and analyzing performance metrics

## Current Script

### `jira-clone-jmeter.jmx`
A performance test script designed to evaluate the response times of CRUD operations in a project management application [Jira Clone](https://github.com/daniserrano7/jira-clone).

#### **Test Scenario**
The test simulates the following operations, correlating values such as the project id and todo id:
1. **Creating a new project**
2. **Adding a task to the project**
3. **Deleting the project**

#### **Configuration**
- **Virtual Users**: 25
- **Ramp-Up Period**: 120 seconds
- **Execution**: JMeter CLI, backend implementation listener to use InfluxDB and displaying the results on Grafana dashboard. At the end of the test run a report is generated and stored in the htmlrecorder folder.


## Test Results
![Grafana Dashboard](../images/Influxdb%20Listener-GrafanaDashboard.png)

Currently fine-tuning this test by analyzing:
- The reasons behind increased API request errors when scaling to higher virtual users.
- How to optimize configurations for better performance and stability.

---

## Future Plans
- Expand to more complex scenarios, including parameterized and data-driven tests.
- Best practice to pass influxdbToken, currently I have to hardcode the parameter in the JMeter script.

## Additional notes
Prior to running the command to execute the test plan, the htmlrecorder folder and log file `.jtl` have to manually be deleted.

