FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /workspace

COPY pom.xml ./
    
RUN mvn -q -e -DskipTests dependency:go-offline

COPY src ./src

RUN mvn -q -e -DskipTests package


FROM eclipse-temurin:21-jre

ENV APP_HOME=/app \
    JAVA_OPTS="" \
    SERVER_PORT=8080

WORKDIR ${APP_HOME}

RUN mkdir -p ${APP_HOME}/data

COPY --from=build /workspace/target/*.jar ${APP_HOME}/app.jar

EXPOSE ${SERVER_PORT}

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar --server.port=${SERVER_PORT}"]