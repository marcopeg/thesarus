FROM node:9.2

ADD ./server /usr/src/server
ADD ./client /usr/src/client

# Install server libs
WORKDIR /usr/src/server/
RUN yarn install

# Test server quality checks
RUN yarn lint
RUN yarn flow
RUN yarn test

# Install client libs
WORKDIR /usr/src/client/
RUN yarn install

# Test client quality checks
RUN yarn lint
RUN yarn flow

# Compile and copy client-side assets
RUN yarn build
RUN mv /usr/src/client/dist /usr/src/server/react-www
RUN rm /usr/src/server/react-www/index.html

# Cleanup client-side material
RUN rm -rf /usr/src/client

# Prepare the server for startup
WORKDIR /usr/src/server/
ENTRYPOINT ["npm", "start"]
