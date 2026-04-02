from __future__ import annotations

from dataclasses import dataclass
from uuid import uuid4


@dataclass
class UserRecord:
    user_id: str
    email: str
    password: str
    software_background: str
    hardware_background: str


_users_by_email: dict[str, UserRecord] = {}
_oauth_users_by_provider: dict[str, UserRecord] = {}


def signup(email: str, password: str, software_background: str, hardware_background: str) -> tuple[str, str]:
    key = email.strip().lower()
    if key in _users_by_email:
        raise ValueError("email already registered")

    user = UserRecord(
        user_id=str(uuid4()),
        email=key,
        password=password,
        software_background=software_background,
        hardware_background=hardware_background,
    )
    _users_by_email[key] = user
    return user.user_id, f"token-{user.user_id}"


def signin(email: str, password: str) -> tuple[str, str]:
    key = email.strip().lower()
    user = _users_by_email.get(key)
    if not user or user.password != password:
        raise ValueError("invalid credentials")
    return user.user_id, f"token-{user.user_id}"


def oauth_signin(provider: str) -> tuple[str, str]:
    if provider not in {"google", "github"}:
        raise ValueError("unsupported oauth provider")

    existing = _oauth_users_by_provider.get(provider)
    if existing:
        return existing.user_id, f"token-{existing.user_id}"

    user = UserRecord(
        user_id=str(uuid4()),
        email=f"{provider}-oauth@local.dev",
        password="oauth",
        software_background=f"{provider} oauth learner",
        hardware_background="robotics hardware enthusiast",
    )
    _oauth_users_by_provider[provider] = user
    return user.user_id, f"token-{user.user_id}"


def get_user_by_token(token: str) -> UserRecord | None:
    if not token.startswith("token-"):
        return None
    user_id = token.replace("token-", "", 1)
    for user in _users_by_email.values():
        if user.user_id == user_id:
            return user
    for user in _oauth_users_by_provider.values():
        if user.user_id == user_id:
            return user
    return None
