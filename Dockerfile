FROM node:16.14.2 as builder

# 앱이라는 디렉토리에 리액트 파일 생성
WORKDIR /app/frontend


# 패키지 다운로드
COPY package.json .
RUN npm install

# 파일 모두 복사
COPY . .

# 리액트 빌드
RUN npm run build

FROM nginx:latest
# nginx의 기본 설정을 삭제하고 앱 소스에서 설정한 파일을 복사
# 소스 코드에 /conf/conf.d 파일이 있어야함
RUN rm /etc/nginx/conf.d/default.conf
COPY ./conf /etc/nginx/conf.d/default.conf

# 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
COPY --from=builder /app/frontend/build /usr/share/nginx/html 

# 80포트 오픈하고 nginx를 백그라운드로 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
