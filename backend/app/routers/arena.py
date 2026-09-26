from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/v1/arena", tags=["Arena Execution"])

class CodeExecutionRequest(BaseModel):
    challenge_id: str
    language: str
    source_code: str

class CodeExecutionResponse(BaseModel):
    status: str
    test_passed: int
    test_failed: int
    execution_time: float
    output: str

@router.post("/execute", response_model=CodeExecutionResponse)
async def execute_code(request: CodeExecutionRequest):
    """
    Executes user submitted code inside the secure Docker Sandbox environment.
    (This is a stub that represents the Docker container orchestration)
    """
    if request.language not in ["python", "javascript"]:
        raise HTTPException(status_code=400, detail="Language not supported")

    # In reality, this would send the code to a Celery queue or directly orchestrate 
    # a Docker container (e.g. `docker run --rm -m 128m --cpus 0.5 verificode-sandbox python code.py`)
    
    # Mocking the Sandbox response for now
    return CodeExecutionResponse(
        status="completed",
        test_passed=2,
        test_failed=1,
        execution_time=0.45,
        output="Test 1: OK\nTest 2: OK\nTest 3: AssertionError: Expected -1 but got 2"
    )
