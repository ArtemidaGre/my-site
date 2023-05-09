import docker
import os
import subprocess

client = docker.from_env()

container_name = "py"
container = client.containers.get(container_name)

def start_container():
    try:
        os.system('docker run ')
        subprocess.run(["docker", "run", "-p", "1945:1945", container_name])
        print(f"Container '{container_name}' started")
    except subprocess.CalledProcessError as e:
        print(f"Error starting container: {e}")

def stop_container():
    try:
        container.stop()
        print(f"Container '{container_name}' stopped")
    except docker.errors.APIError as e:
        print(f"Error stopping container: {e}")

def restart_container():
    stop_container()
    start_container()

def copy_file_to_container(source_file_path, container_file_path):
    try:
        print(f"Copying file {source_file_path} to container...")
        with open(source_file_path, "rb") as f:
            container.put_archive(os.path.dirname(container_file_path), f.read())
        print("File copied successfully")
    except docker.errors.APIError as e:
        print(f"Error copying file: {e}")

def copy_folder_to_container(source_folder_path, container_folder_path):
    try:
        print(f"Copying folder {source_folder_path} to container...")
        tar_data = docker.utils.build_tar(os.path.dirname(source_folder_path))
        container.put_archive(os.path.dirname(container_folder_path), tar_data)
        print("Folder copied successfully")
    except docker.errors.APIError as e:
        print(f"Error copying folder: {e}")

def copy_file_from_container(container_file_path, destination_file_path):
    try:
        print(f"Copying file from container to {destination_file_path}...")
        stream, stat = container.get_archive(container_file_path)
        with open(destination_file_path, "wb") as f:
            for chunk in stream:
                f.write(chunk)
        print("File copied successfully")
    except docker.errors.APIError as e:
        print(f"Error copying file: {e}")

def save_container_state(destination_file_path):
    try:
        print(f"Saving container state to {destination_file_path}...")
        with open(destination_file_path, "wb") as f:
            for chunk in container.export():
                f.write(chunk)
        print("Container state saved successfully")
    except docker.errors.APIError as e:
        print(f"Error saving container state: {e}")

def load_container_state(source_file_path):
    try:
        print(f"Loading container state from {source_file_path}...")
        with open(source_file_path, "rb") as f:
            container.load_image(f)
        print("Container state loaded successfully")
    except docker.errors.APIError as e:
        print(f"Error loading container state: {e}")

def menu():
    while True:
        print("Select an action:")
        print("1. Start container")
        print("2. Stop container")
        print("3. Restart container")
        print("4. Copy file to container")
        print("5. Copy folder to container")
        print("6. Copy file from container")
        print("7. Save container state")
        print("8. Load container state")
        print("9. Exit")

        choice = input("Enter choice: ")

        if choice == "1":
            start_container()
        elif choice == "2":
            stop_container()
        elif choice == "3":
            restart_container()
        elif choice == "4":
            source_file_path = input("Enter source file path: ")
            container_file_path = input("Enter container file path: ")
            copy_file_to_container(source_file_path, container_file_path)
        elif choice == "5":
            source_folder_path = input("Enter source folder path: ")
            container_folder_path = input("Enter container folder path: ")
            copy_folder_to_container(source_folder_path, container_folder_path)
        elif choice == "6":
            container_file_path = input("Enter container file path: ")
            host_file_path = input("Enter host file path: ")
            copy_file_from_container(container_file_path, host_file_path)
        elif choice == "7":
            save_container_state()
        elif choice == "8":
            load_container_state()
        elif choice == "9":
            print("Exiting...")
            break
        else:
            print("Invalid choice. Try again.")

menu()