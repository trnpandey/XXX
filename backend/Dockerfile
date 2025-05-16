# Use Eclipse Temurin OpenJDK 17 (LTS) as the base image
FROM eclipse-temurin:17-jre-alpine

# Set environment variables
ENV JAVA_OPTS=""

# Set the working directory
WORKDIR /app

# Copy the built Spring Boot jar into the container
COPY build/libs/*.jar app.jar

# Expose the port your app runs on (default 8080)
EXPOSE 8080

# Run the application
ENTRYPOINT exec java $JAVA_OPTS -jar app.jar
