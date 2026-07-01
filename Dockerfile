FROM node:20-alpine AS builder

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

WORKDIR /build

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.27-alpine

COPY --from=builder /build/dist /usr/share/nginx/site
COPY nginx-https.conf /nginx-base.conf

ARG DOMAIN_NAME
ENV DOMAIN_NAME=${DOMAIN_NAME}

COPY build.sh /build.sh
RUN sh /build.sh

EXPOSE 80 443
CMD ["nginx", "-g" "daemon off;"]