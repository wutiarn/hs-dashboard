FROM node:12.16
WORKDIR /code
RUN npm install -g @angular/cli
COPY package.json /code
COPY package-lock.json /code
RUN npm install --verbose
COPY . /code
RUN ng build --prod

FROM wutiarn/main:hs_caddy
WORKDIR /app
COPY Caddyfile /etc/Caddyfile
COPY --from=0 /code/dist/hs-dashboard /app
