# ---- build stage ----
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY pom.xml ./
COPY mvnw ./
COPY .mvn .mvn
COPY src ./src
RUN chmod +x ./mvnw && ./mvnw clean package -DskipTests

# ---- run stage ----
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/benchmark-api-0.0.1-SNAPSHOT.jar app.jar
ENV APP_PORT=8000
EXPOSE 8000
ENTRYPOINT ["java", "-Xmx512m", "-Xms512m", "-jar", "app.jar"]
