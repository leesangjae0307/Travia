# routers/booking.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime

from database import get_db
from models import Booking, Content, User # 
# 
from schemas import BookingCreateRequest, BookingCreateResponse 
# 
from routers.auth import get_current_user 

# 1. APIRouter 인스턴스 생성
router = APIRouter()

# 2. POST / 엔드포인트 정의 (예약 생성)
# 
@router.post("/", response_model=BookingCreateResponse, status_code=status.HTTP_201_CREATED)
def create_booking(
    request: BookingCreateRequest, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user) # 
):
    """
    새로운 예약을 생성합니다. 로그인된 사용자만 접근 가능합니다.
    """
    
    # 1. 예약하려는 콘텐츠가 존재하는지 확인
    content = db.query(Content).filter(Content.id == request.content_id, Content.status == "Active").first()
    if not content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ID {request.content_id}에 해당하는 활성 콘텐츠를 찾을 수 없습니다."
        )
        
    # 2. 예약 정보 생성 (DB 모델 사용)
    new_booking = Booking(
        traveler_id=current_user.id, # 
        content_id=request.content_id,
        booking_date=request.booking_date,
        personnel=request.personnel, # 
        status="Pending", # 
        created_at=datetime.now()
    )
    
    # 3. DB에 저장
    try:
        db.add(new_booking)
        db.commit()
        db.refresh(new_booking) # 
    except Exception as e:
        db.rollback()
        print(f"Booking creation failed: {e}") # 
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="예약 생성 중 서버 오류가 발생했습니다."
        )

    # 4. 성공 응답 반환 (BookingCreateResponse 스키마 사용)
    return BookingCreateResponse(
        booking_id=new_booking.id,
        content_title=content.title, # 
        booking_date=new_booking.booking_date,
        personnel=new_booking.personnel,
        status=new_booking.status,
        message="예약 요청이 성공적으로 접수되었습니다." # 
    )

# (향후 여기에 예약 조회, 수정, 취소 엔드포인트 등을 추가합니다.)