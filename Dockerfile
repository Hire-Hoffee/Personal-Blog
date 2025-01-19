FROM node:22-alpine as frontend

WORKDIR /frontend
COPY ./client/package*.json ./
RUN npm ci
COPY ./client .
RUN npm run build


FROM node:22-alpine as backend

WORKDIR /backend
COPY --from=frontend /frontend/dist ../client/dist
COPY ./server/package*.json ./
RUN npm ci
COPY ./server .
RUN npx prisma generate
EXPOSE 4000

CMD if [ ! -d "prima/migrations" ]; then \
  npx prisma migrate dev --name init && npx prisma migrate deploy; fi\
  && npm start
