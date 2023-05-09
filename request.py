import requests

choose = ''

email = input("Enter your email: ")
password = input("Enter your password: ")

url_start = f'http://192.168.0.101:1945/api/users/{email}/{password}/'

while True:
    choose = str(input("parameters (id/type)>"))
    url = url_start+choose
    print(url)
    if choose == 'end':
        break
    response = requests.get(url)
    if response.status_code == 200:
        print(response.text)
    else:
        print(f'Request failed with status code {response.status_code}')
