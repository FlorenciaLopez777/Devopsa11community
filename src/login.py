# src/login.py

from flask import render_template, Request, Response  
from .toggles import FEATURE_SIMPLIFIED_LOGIN


def render_login_page(request: "Request") -> "Response":

    if FEATURE_SIMPLIFIED_LOGIN:
        return render_template(
            "login_simplified.html",
            title="Quick signup/login",
            description="Simplified authentication flow enabled.",
        )
    else:
        return render_template(
            "login_standard.html",
            title="Login",
            description="Standard authentication flow.",
        )
