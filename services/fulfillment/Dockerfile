# 訂單履約 API（Node 24 原生跑 TS，零 npm 依賴）
FROM node:24-alpine
WORKDIR /app
COPY package.json ./
COPY server.ts ./
# members.json 為機密，不 COPY 進 image；以 volume/secret 於執行期掛入 /app/members.json
EXPOSE 8080
CMD ["node", "server.ts"]
