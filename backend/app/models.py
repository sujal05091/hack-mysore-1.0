from sqlalchemy import Column, String, DateTime, Enum, Boolean, Numeric, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime
import uuid
import enum

Base = declarative_base()

class UserRole(enum.Enum):
    CANDIDATE = "candidate"
    REVIEWER = "reviewer"
    RECRUITER = "recruiter"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False, index=True)
    full_name = Column(String, nullable=True)
    role = Column(Enum(UserRole), nullable=False)
    avatar_url = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    candidate_profile = relationship("CandidateProfile", back_populates="user", uselist=False)
    recruiter_profile = relationship("RecruiterProfile", back_populates="user", uselist=False)


class CandidateProfile(Base):
    __tablename__ = "candidate_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    headline = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    location = Column(String, nullable=True)
    experience_years = Column(Numeric(4, 2), nullable=True)
    availability = Column(String, nullable=True)
    github_url = Column(Text, nullable=True)
    linkedin_url = Column(Text, nullable=True)
    visibility = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="candidate_profile")


class RecruiterProfile(Base):
    __tablename__ = "recruiter_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    company_id = Column(UUID(as_uuid=True), nullable=True)  # Can be FK to a Companies table later
    job_title = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="recruiter_profile")


class Project(Base):
    __tablename__ = "projects"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    candidate_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    project_type = Column(String, nullable=True)
    role = Column(String, nullable=True)
    status = Column(String, nullable=True)
    verification_status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Challenge(Base):
    __tablename__ = "challenges"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=True)
    difficulty = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class ChallengeAttempt(Base):
    __tablename__ = "challenge_attempts"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    challenge_id = Column(UUID(as_uuid=True), ForeignKey("challenges.id", ondelete="CASCADE"))
    candidate_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    started_at = Column(DateTime, default=datetime.utcnow)
    submitted_at = Column(DateTime, nullable=True)
    status = Column(String, default="in_progress")
    score = Column(Numeric(5, 2), nullable=True)


class DefenseSession(Base):
    __tablename__ = "defense_sessions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"))
    candidate_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    overall_score = Column(Numeric(5, 2), nullable=True)
    status = Column(String, default="in_progress")


class DecisionFusionResult(Base):
    __tablename__ = "decision_fusion_results"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    candidate_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    trust_score = Column(Numeric(5, 2), nullable=True)
    code_integrity_score = Column(Numeric(5, 2), nullable=True)
    defense_score = Column(Numeric(5, 2), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
