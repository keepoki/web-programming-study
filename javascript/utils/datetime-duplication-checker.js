{
  /** 엄격한 중복 날짜 및 시간 확인 (일부분 포함될 때 겹칠 수 없음) */
  function dateTimeDuplicateVerificationByStrict(usedStartDate, usedEndDate, startDate, endDate) {
    /**
     * 1. 신청 날짜 전체가 등록된 날짜에 포함되는 경우
     *      | ----------------------- |       등록된 날짜 ---
     *              | ======= |               신청 날짜 ===
     * 등록된 날짜 시작일 <= 신청 날짜 시작일 && 신청 날짜 종료일 <= 등록된 날짜 종료일
     * 
     * 2. 등록된 날짜 일부분이 신청 날짜 전체에 포함되는 경우
     *              | ------- |              
     *      | ======================= |    
     * 신청 날짜 시작일 <= 등록된 날짜 시작일 && 등록된 날짜 종료일 <= 신청한 날짜 종료일
     * 
     * 3. 신청 날짜 일부분이 포함되는 경우 (날짜 및 시간이 겹치는 것을 허용하지 않음)
     *           | ----------------------- |
     *      | ======= |               | ======= |
     * 
     *                | ------------- |
     *      | ======= |               | ======= |
     * 
     *           | ----------------------- |
     *           | ======= |     | ======= | 
     * 신청 날짜 시작일 <= 등록된 날짜 시작일 && (등록된 날짜 시작일 <= 신청 날짜 종료일 && 신청 날짜 종료일 <= 등록된 날짜 종료일)
     * (등록된 날짜 시작일 <= 신청 날짜 시작일 && 신청 날짜 시작일 <= 등록된 날짜 종료일) && 등록된 날짜 종료일 <= 신청 날짜 종료일
     */
    
    return ((usedStartDate.getTime() <= startDate.getTime() && endDate.getTime() <= usedEndDate.getTime())
      || (startDate.getTime() <= usedStartDate.getTime() && usedEndDate.getTime() <= endDate.getTime())
      || (startDate.getTime() <= usedStartDate.getTime() && (usedStartDate.getTime() <= endDate.getTime() && endDate.getTime() <= usedEndDate.getTime()))
      || ((usedStartDate.getTime() <= startDate.getTime() && startDate.getTime() <= usedEndDate.getTime()) && usedEndDate.getTime() <= endDate.getTime()));
  }

  /** 중복 날짜 및 시간 확인 (일부분 포함될 때 겹칠 수 있음) */
  function dateTimeDuplicateVerification(usedStartDate, usedEndDate, startDate, endDate) {
    /**
     * 1. 신청 날짜 전체가 등록된 날짜에 포함되는 경우
     *      | ----------------------- |       등록된 날짜 ---
     *              | ======= |               신청 날짜 ===
     * 등록된 날짜 시작일 <= 신청 날짜 시작일 && 신청 날짜 종료일 <= 등록된 날짜 종료일
     * 
     * 2. 등록된 날짜 일부분이 신청 날짜 전체에 포함되는 경우
     *              | ------- |              
     *      | ======================= |    
     * 신청 날짜 시작일 <= 등록된 날짜 시작일 && 등록된 날짜 종료일 <= 신청한 날짜 종료일
     * 
     * 3. 신청 날짜 일부분이 포함되는 경우 (시작 또는 종료 날짜 및 시간이 겹치는 것을 허용)
     *           | ----------------------- |
     *      | ======= |               | ======= |
     * 
     *                | ------------- |
     *      | ======= |               | ======= |
     * 
     *           | ----------------------- |
     *           | ======= |     | ======= | 
     * 신청 날짜 시작일 < 등록된 날짜 시작일 && (등록된 날짜 시작일 < 신청 날짜 종료일 && 신청 날짜 종료일 < 등록된 날짜 종료일)
     * (등록된 날짜 시작일 < 신청 날짜 시작일 && 신청 날짜 시작일 < 등록된 날짜 종료일) && 등록된 날짜 종료일 < 신청 날짜 종료일
     */
    return ((usedStartDate.getTime() <= startDate.getTime() && endDate.getTime() <= usedEndDate.getTime())
      || (startDate.getTime() <= usedStartDate.getTime() && usedEndDate.getTime() <= endDate.getTime())
      || (startDate.getTime() < usedStartDate.getTime() && (usedStartDate.getTime() < endDate.getTime() && endDate.getTime() < usedEndDate.getTime()))
      || ((usedStartDate.getTime() < startDate.getTime() && startDate.getTime() < usedEndDate.getTime()) && usedEndDate.getTime() < endDate.getTime()));
  }
}
