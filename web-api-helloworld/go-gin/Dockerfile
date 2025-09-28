# ---- build stage ----
FROM golang:1.22 AS build
WORKDIR /app
COPY go.mod ./
COPY go.sum* ./
RUN go mod download
COPY . .
RUN go mod tidy
RUN CGO_ENABLED=0 GOOS=linux go build -o server main.go

# ---- run stage ----
FROM gcr.io/distroless/base-debian12
WORKDIR /app
COPY --from=build /app/server /app/server
ENV APP_ADDR=:8000
EXPOSE 8000
ENTRYPOINT ["/app/server"]
