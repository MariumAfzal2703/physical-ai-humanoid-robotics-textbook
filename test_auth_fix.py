#!/usr/bin/env python3
"""Test script to debug the auth signup function directly"""

import os
import sys
import asyncio

# Add the project root to the path
sys.path.insert(0, '/home/mariumafzal2703/PIAIC-Hackathons/Hackathon-1')

from backend.auth import signup, create_tables

def test_signup_directly():
    print("Creating tables...")
    create_tables()
    print("Tables created successfully.")

    print("Testing signup...")
    try:
        user_id, token = signup(
            email="newtest@test.com",
            password="Pass1234!",
            software_background="python",
            hardware_background="none"
        )
        print(f"Signup successful! User ID: {user_id}, Token: {token}")
        return True
    except Exception as e:
        print(f"Signup failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    test_signup_directly()