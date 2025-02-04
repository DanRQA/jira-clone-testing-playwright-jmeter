# Start from a Node.js base image
FROM node:18

# Metadata
LABEL maintainer="Daniel Ramos dramos.qa@gmail.com"
LABEL version="1.0"

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
  wget \
  curl \
  git \
  && rm -rf /var/lib/apt/lists/*

# Install dockerize (to wait for DB)
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -xzvf dockerize-linux-amd64-v0.6.1.tar.gz -C /usr/local/bin && \
    rm dockerize-linux-amd64-v0.6.1.tar.gz

# Set working directory inside container
WORKDIR /app

# Clone the project
RUN git clone https://github.com/DanielRamos84/jira-clone-testing-playwright-jmeter.git

# Move into the test folder
WORKDIR /app/jira-clone-testing-playwright-jmeter

# Install dependencies
RUN npm install

# Install Playwright browsers
RUN npx playwright install --with-deps

# Expose the app port
EXPOSE 3000

# Start the app after DB is ready, then run tests
CMD ["sh", "-c", "dockerize -wait tcp://jira_clone_db:5432 -timeout 60s && npm run setup-and-dev & sleep 10 && npx playwright test && tail -f /dev/null"]
