# src/toggles.py

import json
import os
from pathlib import Path

_DEFAULT_TOGGLES = {
    "FEATURE_SIMPLIFIED_LOGIN": False,
    "FEATURE_PROFILE_PRIVACY_LOCK": False,
}
def _load_toggles_from_file() -> dict:
   
    config_path = Path(__file__).resolve().parent.parent / "feature_toggles.json"
    if not config_path.exists():
        print("WARNING, TOGGLE DOESNT EXIST")
        return _DEFAULT_TOGGLES.copy()
    try:
        with config_path.open("r", encoding="utf-8") as f:
            data = json.load(f)
        
            toggles = _DEFAULT_TOGGLES.copy()
            toggles.update(data)
            return toggles
    except Exception as e:
        print(f"Warning: Could not read feature_toggles.json ({e}), using default values.")
        return _DEFAULT_TOGGLES.copy()
def _resolve_toggle(name: str, default: bool = False) -> bool:
   
    env_value = os.getenv(name)
    if env_value is not None:
        env_value_lower = env_value.lower()
        if env_value_lower in ("true", "1", "yes", "on"):
            return True
        if env_value_lower in ("false", "0", "no", "off"):
            return False
    toggles_from_file = _load_toggles_from_file()
    return bool(toggles_from_file.get(name, default))
FEATURE_SIMPLIFIED_LOGIN: bool = _resolve_toggle("FEATURE_SIMPLIFIED_LOGIN", False)
FEATURE_PROFILE_PRIVACY_LOCK: bool = _resolve_toggle("FEATURE_PROFILE_PRIVACY_LOCK", False)
