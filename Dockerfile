FROM node:14.15 as builder
RUN mkdir /usr/src
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
RUN yarn install --silent
#RUN yarn global add react-scripts@3.4.1 --silent

ARG reactAppEnv
ENV REACT_APP_ENV=$reactAppEnv

COPY . /usr/src/app
RUN yarn run build

# production environment
FROM nginx:1.19.1-alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
