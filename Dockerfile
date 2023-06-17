FROM node:19.8.1 AS development

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

RUN yarn build

EXPOSE 8080

CMD [ "node", "dist/main" ]