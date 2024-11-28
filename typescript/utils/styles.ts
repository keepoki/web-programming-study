namespace UtilStyles {
  interface NumberColorOptions {
    positiveColor: string; // 양수 색상
    negativeColor: string; // 음수 색상
    defaultColor: string; // 기본 색상
  }
  
  export function getNumberStatusColor(num: number, options?: NumberColorOptions) {
    options = Object.assign({
      positiveColor: 'dodgerblue',
      negativeColor: 'red',
      defaultColor: 'var(--text-color)'
    }, options);
    
    let color = options.defaultColor;
    if (num > 0) {
      color = options.positiveColor;
    } else if (num < 0) {
      color = options.negativeColor;
    }
    return { color };
  }

  console.log(getNumberStatusColor(100));

  // ----------------------------------------------------------------
  
  interface RandomColorOptions {
    red?: number, // 0 ~ 255
    green?: number, // 0 ~ 255
    blue?: number, // 0 ~ 255
    alpha?: number, // 0.01 ~ 1
  }
  
  export function randomColor(options?: RandomColorOptions) {
    const r = options?.red || Math.floor(Math.random() * 255);
    const g = options?.green || Math.floor(Math.random() * 255);
    const b = options?.blue || Math.floor(Math.random() * 255);
    return options?.alpha ? `rgba(${r},${g},${b},${options.alpha})` : `rgb(${r},${g},${b})`;
  }
  
  export function randomPastelColor() {
    // `hsl(${360 * Math.random()}, ${(25 + 70 * Math.random())}%, ${(80 + 15 * Math.random())}%)`;
    const hue = 360 * Math.random();
    const saturation = 25 + 70 * Math.random();
    const lightness = 70 + 20 * Math.random();
    return hslToHex(hue, saturation, lightness);
    
  }
  
  function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0'); // 필요한 경우 16진수로 변환하고 접두사 '0'을 붙인다.
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
}