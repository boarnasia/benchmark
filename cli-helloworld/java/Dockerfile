FROM eclipse-temurin:21-jdk

ENV DEBIAN_FRONTEND=noninteractive     LC_ALL=C.UTF-8     LANG=C.UTF-8

# GNU time, tini, bash, procps
RUN apt-get update && apt-get install -y --no-install-recommends     jq hyperfine   time tini bash procps maven     && rm -rf /var/lib/apt/lists/*

WORKDIR /work
COPY app/ /work/app/

# Build fat-jar
RUN mvn -q -f /work/app/pom.xml -DskipTests package

# scripts & results
RUN chmod 755 /work/app/run_bench.sh || true && mkdir -p /results
RUN chmod 755 /work/app/run_bench_hf.sh

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["sleep", "infinity"]
