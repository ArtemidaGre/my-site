FROM node:12

# создание директории приложения
WORKDIR /home/node/

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./

RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --omit=dev

# копируем исходный код
COPY . .

EXPOSE 1945
CMD [ "node", "index.js" ]