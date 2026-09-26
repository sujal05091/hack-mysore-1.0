import asyncio
from app.database import AsyncSessionLocal
from app.models import User, UserRole, CandidateProfile, RecruiterProfile
import uuid

async def seed_database():
    print("Connecting to the database to insert mock data...")
    async with AsyncSessionLocal() as db:
        # 1. Create a mock Candidate
        candidate = User(
            email="candidate_demo@verificode.com",
            full_name="Sujal (Candidate)",
            role=UserRole.CANDIDATE
        )
        db.add(candidate)
        await db.flush() # Get the ID before committing

        candidate_profile = CandidateProfile(
            user_id=candidate.id,
            headline="Full-Stack Developer | Next.js & FastAPI",
            bio="I love building scalable platforms and engaging user experiences.",
            experience_years=2.0,
            location="Remote",
            github_url="https://github.com/sujal",
        )
        db.add(candidate_profile)

        # 2. Create a mock Recruiter
        recruiter = User(
            email="recruiter_demo@verificode.com",
            full_name="Tech Recruiter",
            role=UserRole.RECRUITER
        )
        db.add(recruiter)
        await db.flush()

        recruiter_profile = RecruiterProfile(
            user_id=recruiter.id,
            company_id=uuid.uuid4(),
            job_title="Senior Talent Acquisition"
        )
        db.add(recruiter_profile)

        # Commit everything
        await db.commit()
        print("✅ Data successfully inserted! Check your Supabase dashboard.")

if __name__ == "__main__":
    asyncio.run(seed_database())
