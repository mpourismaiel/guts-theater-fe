FROM node:alpine3.13 as build-deps
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm i
COPY . ./
ENV REACT_APP_API_URL=http://localhost:4000
RUN npm run build

FROM nginx:alpine
COPY --from=build-deps /src/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
