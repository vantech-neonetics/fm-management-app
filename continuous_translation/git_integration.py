import os
import logging


def clone_repository(repo_url, local_path):
    if not os.path.exists(local_path):
        logging.info("Cloning repository...")
        os.system(f'git clone "{repo_url}" "{local_path}"')
        os.system(f"rm -rf {local_path}/.git")
        logging.info(f"Repository cloned to {local_path}.")
    else:
        logging.warning(
            "local_repo already exists, skipping the clone process.")


def delete_local_repository(local_path):
    if os.path.exists(local_path):
        if os.name == 'nt':
            os.system(f'rmdir /s /q "{local_path}"')
        else:
            os.system(f'rm -rf "{local_path}"')
