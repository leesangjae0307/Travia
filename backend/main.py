import mysql.connector
from fastapi import FastAPI
from contextlib import contextmanager
import os
from dotenv import load_dotenv
import sys

# --------------------------------------------------
# 1. 환경 설정 및 환경 변수 로드
# --------------------------------------------------

# .env 파일에서 환경 변수를 로드합니다.
load_dotenv()

# 환경 변수에서 DB 접속 정보를 읽어옵니다.
DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
}

DB_DDL_FILE = "db_init.sql"

# 필수 환경 변수가 누락되었는지 확인
if not all([DB_CONFIG["user"], DB_CONFIG["password"]]):
    print("🚨 [FATAL ERROR] DB_USER 또는 DB_PASSWORD 환경 변수가 .env 파일에 설정되지 않았습니다.")
    sys.exit(1)

# --------------------------------------------------
# 2. 데이터베이스 연결 및 초기화 로직 (수정된 부분)
# --------------------------------------------------

@contextmanager
def get_db_connection():
    """MySQL 연결 컨텍스트 매니저."""
    conn = None
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        yield conn
    except mysql.connector.Error as e:
        print(f"❌ MySQL 연결 오류: {e}")
        # 연결 오류 발생 시 FastAPI 서버 시작 중단
        raise
    finally:
        if conn and conn.is_connected():
            conn.close()

def initialize_database():
    """서버 시작 시 SQL 파일을 읽어 TraviaDB와 모든 테이블을 생성합니다."""
    print(f"🚀 [DB INIT] {DB_DDL_FILE} 파일을 읽어 데이터베이스 초기화를 시작합니다...")
    
    # 1. SQL 파일 내용 읽기
    try:
        with open(DB_DDL_FILE, 'r', encoding='utf-8') as f:
            ddl_script = f.read()
    except FileNotFoundError:
        print(f"❌ [DB INIT] 오류: {DB_DDL_FILE} 파일을 찾을 수 없습니다. 경로를 확인해주세요.")
        return
        
    # 2. DB 연결 및 쿼리 실행
    with get_db_connection() as conn:
        cursor = conn.cursor()
        
        try:
            # 🚨 수정된 부분: multi=True 대신 쿼리를 분리하여 개별 실행
            # DDL 스크립트를 세미콜론(;) 기준으로 분리하고 빈 문자열 제거
            queries = [q.strip() for q in ddl_script.split(';') if q.strip()]

            for query in queries:
                # 쿼리문이 비어있지 않다면 실행
                if query:
                    cursor.execute(query)
            
            # 모든 쿼리 실행 후 최종 커밋
            conn.commit()
            print("✅ [DB INIT] TraviaDB 데이터베이스와 모든 테이블이 성공적으로 생성되었습니다.")
            
        except mysql.connector.Error as e:
            print(f"❌ [DB INIT] 테이블 생성 중 오류 발생: {e}")
            print("🚨 데이터베이스 초기화에 실패했습니다. MySQL 서버가 실행 중인지 확인해주세요.")
            # 오류 발생 시에도 서버를 정상 종료할 수 있도록 추가 처리는 하지 않습니다.


# --------------------------------------------------
# 3. FastAPI 애플리케이션 정의
# --------------------------------------------------

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    """uvicorn 실행 시 DB 초기화 함수를 호출합니다."""
    # DB 초기화는 동기 함수이므로 await를 사용하지 않습니다.
    initialize_database()

@app.get("/")
def read_root():
    return {"message": "Travia AI Platform Backend Running"}

