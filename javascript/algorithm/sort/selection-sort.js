{
  /**
   * Selection Sort (선택 정렬)
   *
   * 설명
   * - 매번 가장 작은(또는 큰) 원소를 선택해 앞으로 보내는 방식
   *
   * 장점
   * - 구현이 간단
   * - 교환 횟수가 최대 n-1 번으로 버블 정렬보다 교환이 적음
   *
   * 단점
   * - 시간 복잡도: O(n²)
   * - 비교 횟수가 많음
   *
   * @param {number[]} arr
   * @return {number[]}
   */
  const selectionSort = (arr) => {
    if (!arr || !Array.isArray(arr)) return []

    let minIdx = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      minIdx = i;

      for (let j = i + 1; j < arr.length; j++) {
        // 현재 값보다 제일 작은 값의 위치 찾기
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      // 제일 작은 값과 교환
      [arr[minIdx], arr[i]] = [arr[i], arr[minIdx]];
    }

    return arr;
  }
  console.log(selectionSort([4,5,1,7,9,1,6,3,2]));
  // [1, 1, 2, 3, 4, 5, 6, 7, 9]
}
