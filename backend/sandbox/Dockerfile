# VerifiCode Secure Sandbox Image
# Used for executing unverified candidate code safely

FROM python:3.12-alpine

# Create a non-root user for execution
RUN addgroup -S sandboxgroup && adduser -S sandboxuser -G sandboxgroup

WORKDIR /sandbox

# Prevent networking, limit privileges
# Execution will be restricted via Docker flags at runtime:
# docker run --rm --network none --cpus 0.5 -m 128m --user sandboxuser verificode-sandbox python execute.py

COPY execute.py /sandbox/execute.py

# Switch to non-root user
USER sandboxuser

ENTRYPOINT ["python", "execute.py"]
