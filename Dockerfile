# 1. 사용할 Node.js 기본 이미지 지정 (LTS 버전 권장)
FROM node:20-slim 

# 2. 컨테이너 내부에서 작업할 디렉토리 설정
WORKDIR /app

# 3. package.json 및 package-lock.json 파일을 컨테이너 내부로 복사
# 이 파일을 먼저 복사해야 캐싱 효율이 좋아집니다.
COPY package*.json ./

# 4. Node.js 의존성 패키지 설치 (npm install 실행)
# Node.js DB 라이브러리(mysql2) 등이 여기서 설치됩니다.
RUN npm install

# 5. 나머지 모든 소스 코드(.js, Mapdata, server.js 등)를 컨테이너 내부로 복사
COPY . .

# 6. 서버가 외부와 통신할 포트 노출 (선언적 의미)
EXPOSE 52273

# 7. 컨테이너가 시작될 때 실행할 명령어 (서버 시작)
CMD [ "node", "server.js" ]