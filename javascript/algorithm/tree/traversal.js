{
  /*
  트리 순회의 종류와 사용법에 대해 알아보도록 하자.
  트리 순회: https://ko.wikipedia.org/wiki/%ED%8A%B8%EB%A6%AC_%EC%88%9C%ED%9A%8C
  깊이 우선 탐색: https://ko.wikipedia.org/wiki/%EA%B9%8A%EC%9D%B4_%EC%9A%B0%EC%84%A0_%ED%83%90%EC%83%89

  아래 종류가 있다.
  - 전위 순회(preorder)
  - 중위 순회(inorder)
  - 후위 순회(postorder)
  - 레벨 순서 순회(level-order), 다른 명칭으로는 너비 우선 탐색(Breadth-first search, BFS)

  전위, 중위, 후위는 깊이 우선 탐색(depth-first search, DFS)이다.
 */

  /** 트리 노드 클래스 정의 */
  function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }

  /**
   * @param {TreeNode} root
   */
  function preOrderTraversal(root) {
    if (!root) return;
    console.log(root.val);
    preOrderTraversal(root.left);
    preOrderTraversal(root.right);
  };

  /**
   * @param {TreeNode} root
   */
  function inOrderTraversal(root) {
    if (!root) return;
    inOrderTraversal(root.left);
    console.log(root.val);
    inOrderTraversal(root.right);
  };

  /**
   * @param {TreeNode} root
   */
  function postOrderTraversal(root) {
    if (!root) return;
    postOrderTraversal(root.left);
    postOrderTraversal(root.right);
    console.log(root.val);
  };
}


