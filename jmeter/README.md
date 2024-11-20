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
- **Virtual Users**: 10  
- **Ramp-Up Period**: 180 seconds  
- **Execution**: JMeter CLI  

Currently fine-tuning this test by analyzing:  
- The reasons behind increased API request errors when scaling to higher virtual users.  
- How to optimize configurations for better performance and stability.  

---

## Future Plans
- Expand to more complex scenarios, including parameterized and data-driven tests.  
- Dashboard analytics to present performance results more effectively.  