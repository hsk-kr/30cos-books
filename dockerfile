FROM node:18-alpine3.14
ENV NODE_ENV development

WORKDIR /app

COPY . .
RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start" ]