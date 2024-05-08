import os

class ConfigurationError(Exception):
    pass


def load_config():
    config = {
        "GIT_REPO_URL": "https://github.com/songquanpeng/one-api.git",
        "SOURCE_LANGUAGE": "Chinese",
        "TARGET_LANGUAGE": "English",
        "API_KEY": "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",
        "I18N_SURFIX": "",
        "ADDITIONAL_PROMPT": "",
        "FILE_TYPES": "md,mdx,rst,txt,py,js,json,html,cpp,c,ipynb",
        "FILE_PATHS_FILTER": ".*",
    }

    missing_keys = not config["API_KEY"] or not config["GIT_REPO_URL"]
    if missing_keys:
        raise ConfigurationError(
            f"Missing required environment variables: {', '.join(missing_keys)}")

    return config
