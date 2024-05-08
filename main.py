import os
import logging
from continuous_translation.file_processing import translate_files
from continuous_translation.git_integration import clone_repository
from continuous_translation.config import ConfigurationError, load_config

repo_path = "local-repo"

def main():
    logging.basicConfig(level=logging.INFO)
    try:
        config = load_config()
    except ConfigurationError as e:
        logging.error(str(e))
        return
  
    clone_repository(config["GIT_REPO_URL"], repo_path)

    translate_files(repo_path, config)

    os.system(f"rm -rf {repo_path}/.git && mv {repo_path}/* . && rm -rf {repo_path}")

if __name__ == "__main__":
    main()