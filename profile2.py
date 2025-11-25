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
        print("Renderizando perfil con módulo de Privacy Lock (profile_with_privacy_lock)")
        print(f"Perfil: {base_profile}")
        print(f"Privacidad: {privacy}")
    else:
        print("Renderizando perfil básico (profile_basic)")
        print(f"Perfil: {base_profile}")
