{
  /**
   * Bubble Sort (거품 정렬)
   *
   * 설명
   * - 인접한 두 원소를 비교해 교환하면서 큰 값(또는 작은 값)을 끝으로 "떠오르게" 하는 방식
   * - 구현이 매우 간단하지만 성능이 좋지 않음
   *
   * 장점
   * - 구현이 쉽다
   * - 소규모 데이터에서는 직관적
   *
   * 단점
   * - 시간 복잡도: O(n²)
   * - 대규모 데이터에 부적합
   *
   * @param {number[]} arr
   * @returns {number[]}
   */
  const bubbleSort = (arr) => {
    if (!arr || !Array.isArray(arr)) return []

    for (let i = 0; i < arr.length; i++) {
      for (let j = 1; j < arr.length - i; j++) {
        // left > right == 교환
        if (arr[j-1] > arr[j]) {
          [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
        }
      }
    }
    return arr;
  }
  console.log(bubbleSort([4,5,1,7,9,1,6,3,2]));
  // [1, 1, 2, 3, 4, 5, 6, 7, 9]
}