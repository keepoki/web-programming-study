namespace UtilCurrency {
  // 한국 통화 기준으로 다른 나라의 화폐로 전환하는 기능
  const EXCHANGE_BASE = {
    // 2023-11-01 18:40 기준
    KRW: 1, // 한국 원
    CNY: 0.005385, // 중국 위안
    USD: 0.0007359, // 미국 달러
    JPY: 0.1113, // 일본 엔
    BAHT: 0.02665, // 태국 밧
    DONG: 17.9824, // 베트남 동
  } as const;
  type EXCHANGE_BASE_KRW = typeof EXCHANGE_BASE[keyof typeof EXCHANGE_BASE] | null;

  interface ExchangeRateParams {
    fromCode: EXCHANGE_BASE_KRW;
    fromCost: number;
    toCode: EXCHANGE_BASE_KRW;
  }

  /** 환전 함수 */
  function exchangeRate(data: ExchangeRateParams): number {
    // 기준 화폐를 KRW으로 변환
    const krw = data.fromCost / data.fromCode;
    // 대상 화폐로 변환
    return krw * data.toCode;
  }

  // 10 CNY -> JPY 206.6852367688022
  console.log(exchangeRate({ fromCode: EXCHANGE_BASE.CNY, fromCost: 10, toCode: EXCHANGE_BASE.JPY }));
  // 206.6852367688022 JPY -> CNY 10
  console.log(exchangeRate({ fromCode: EXCHANGE_BASE.JPY, fromCost: 206.6852367688022, toCode: EXCHANGE_BASE.CNY }));
  // 5000 KRW -> BAHT 133.25
  console.log(exchangeRate({ fromCode: EXCHANGE_BASE.KRW, fromCost: 5000, toCode: EXCHANGE_BASE.BAHT }));
  // 133.25 BAHT -> 5000 KRW
  console.log(exchangeRate({ fromCode: EXCHANGE_BASE.BAHT, fromCost: 133.25, toCode: EXCHANGE_BASE.KRW }));

  // ----------------------------------------------------------------
  
  interface CurrencyStringOptions {
    minimumFractionDigits?: number; // 최소 소수점 자릿수
    maximumFractionDigits?: number; // 최대 소수점 자릿수
    locales?: string; // 숫자 콤마 구분 지역
    fixed?: number; // 소수점 자릿수 지정
  }
  
  /** 숫자에 화폐(통화) 기호를 추가하여 반환하는 함수 */
  export function getCurrencyString(num: number, currencyCode: string, options?: CurrencyStringOptions) {
    if (num == null) {
      return null;
    }
  
    let number = num;
    options = Object.assign({
      minimumFractionDigits: 0,
      maximumFractionDigits: 12,
      locales: 'en-US',
    }, options);
    
    if (options.fixed) {
      number = parseFloat(num.toFixed(options.fixed));
    }
      
    return new Intl.NumberFormat(options.locales, { style: 'currency', currency: currencyCode, ...options }).format(number);
  }
}