# src/profile.py

from .toggles import FEATURE_PROFILE_PRIVACY_LOCK
def get_base_profile(user_id: int) -> dict:
    return {
        "id": user_id,
        "username": "demo_user",
        "bio": "This is a demo profile",
    }
def get_privacy_settings(user_id: int) -> dict:
    return {
        "is_locked": True,
        "show_email": False,
        "show_activity_status": False,
    }


def render_profile_page(user_id: int):
    base_profile = get_base_profile(user_id)

    if FEATURE_PROFILE_PRIVACY_LOCK:
        privacy = get_privacy_settings(user_id)
        print("Rendering profile with Privacy Lock module")
        print(f"Profile: {base_profile}")
        print(f"Privacity: {privacy}")
    else:
        print("Rendering basic profile (profile_basic)")
        print(f"Profile: {base_profile}")
