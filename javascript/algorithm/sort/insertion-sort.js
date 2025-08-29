{
  /**
   * Insertion Sort (삽입 정렬)
   *
   * 설명
   * - 이미 정렬된 부분에 새로운 원소를 적절한 위치에 삽입
   * - 카드 정렬 방식과 유사
   *
   * 장점
   * - 거의 정렬된 데이터에서 매우 빠름 (O(n) 근처)
   * - 구현이 쉬움
   *
   * 단점
   * - 최악의 경우 시간 복잡도: O(n²)
   * - 대규모 데이터에 비효율적
   *
   * @param {number[]} arr
   * @return {number[]}
   */
  const insertionSort = (arr) => {
    if (!arr || !Array.isArray(arr)) return []

    for (let i = 1; i < arr.length; i++) {
      let currentNum = arr[i];
      let prevIdx = i - 1;

      while (0 <= prevIdx && arr[prevIdx] > currentNum) {
        arr[prevIdx + 1] = arr[prevIdx];
        --prevIdx;
      }

      arr[prevIdx + 1] = currentNum;
    }

    return arr;
  }
  console.log(insertionSort([4,5,1,7,9,1,6,3,2]));
  // [1, 1, 2, 3, 4, 5, 6, 7, 9]
}
