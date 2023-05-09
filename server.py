from os import system
from time import sleep

while True:
    command = 'node index'
    try:
        system(command)
    except:
        sleep(15)
    sleep(5)