# ----------- Build Stage -------------
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom.xml and resolve dependencies (cache optimization)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source files
COPY src ./src

# Build project, skip tests
RUN mvn clean package -DskipTests

# ----------- Runtime Stage -------------
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy the packaged jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Bind to 0.0.0.0 as required by Render
ENV SERVER_PORT=8080
ENV JAVA_OPTS="-Dserver.address=0.0.0.0 -Dserver.port=8080"

EXPOSE 8080

CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
