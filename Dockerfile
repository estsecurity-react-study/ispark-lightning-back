FROM node:16.13.2-alpine AS builder
WORKDIR /built
COPY . .
RUN yarn && yarn build

FROM node:16.13.2-alpine
WORKDIR /app
COPY --from=builder /built ./
EXPOSE 3055
CMD ["yarn","start:prod"]