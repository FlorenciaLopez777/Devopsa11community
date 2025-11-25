# src/toggles.py

import json
import os
from pathlib import Path

_DEFAULT_TOGGLES = {
    "FEATURE_SIMPLIFIED_LOGIN": False,
    "FEATURE_PROFILE_PRIVACY_LOCK": False,
}


def _load_toggles_from_file() -> dict:
    """
    Carga los toggles desde feature_toggles.json.
    Si el archivo no existe o hay error, vuelve a los valores por defecto.
    """
    config_path = Path(__file__).resolve().parent.parent / "feature_toggles.json"
    if not config_path.exists():
        print("Advertencia: feature_toggles.json no encontrado, usando valores por defecto.")
        return _DEFAULT_TOGGLES.copy()

    try:
        with config_path.open("r", encoding="utf-8") as f:
            data = json.load(f)
            # Mezclamos con defaults para asegurar que todas las claves existan
            toggles = _DEFAULT_TOGGLES.copy()
            toggles.update(data)
            return toggles
    except Exception as e:
        print(f"Advertencia: no se pudo leer feature_toggles.json ({e}), usando valores por defecto.")
        return _DEFAULT_TOGGLES.copy()


def _resolve_toggle(name: str, default: bool = False) -> bool:
    """
    Prioridad:
    1) Variable de entorno (FEATURE_X=true/false)
    2) Archivo feature_toggles.json
    3) Valor por defecto
    """
    env_value = os.getenv(name)
    if env_value is not None:
        env_value_lower = env_value.lower()
        if env_value_lower in ("true", "1", "yes", "on"):
            return True
        if env_value_lower in ("false", "0", "no", "off"):
            return False

    # Si no hay env var, leemos del archivo
    toggles_from_file = _load_toggles_from_file()
    return bool(toggles_from_file.get(name, default))


FEATURE_SIMPLIFIED_LOGIN: bool = _resolve_toggle("FEATURE_SIMPLIFIED_LOGIN", False)
FEATURE_PROFILE_PRIVACY_LOCK: bool = _resolve_toggle("FEATURE_PROFILE_PRIVACY_LOCK", False)
