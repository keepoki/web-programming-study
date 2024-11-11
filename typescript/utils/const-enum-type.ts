/* 
  타입스크립트에서 enum을 지원하지만 Tree-shaking 문제가 있어서 해결하기 위한 방법이다.
  https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking
 */
namespace ConstEnumType {
  export const hero_type = {
    WARRIOR: "Warrior", 
    WIZARD: "Wizard",
    ARCHER: "Archer",
  } as const;
  type HERO_TYPE = typeof hero_type[keyof typeof hero_type] | null;
  
  function createHero(type: HERO_TYPE) {
    console.log(`Created hero type: ${type}`);
  }

  createHero(hero_type.WARRIOR); // Created hero type: Warrior
}
