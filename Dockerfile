FROM node:20-alpine AS builder

WORKDIR /build

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.27-alpine

COPY --from=builder /build/dist /usr/share/nginx/site
COPY nginx-https.conf /nginx-base.conf

COPY build.sh /build.sh
RUN bash /build.sh

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]