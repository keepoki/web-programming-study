{
  /**
   * HTML 태그를 제거해주고 텍스트를 리턴하는 함수
   * @param {string} htmlStr 
   * @param {{ ignoreBRTag?:boolean }} options 
   * @returns {string}
   */
  function htmlToText(htmlStr, options = null) {
    let text = htmlStr;
    text = text.replace(/<style([\s\S]*?)<\/style>/gi, '');
    text = text.replace(/<script([\s\S]*?)<\/script>/gi, '');
    text = text.replace(/<\/div>/ig, '\n');
    text = text.replace(/<\/li>/ig, '\n');
    text = text.replace(/<li>/ig, '  *  ');
    text = text.replace(/<\/ul>/ig, '\n');
    text = text.replace(/<\/p>/ig, '\n');
    !options?.ignoreBRTag && (text = text.replace(/<br\s*[\/]?>/gi, "\n"));
    text = text.replace(/<[^>]+>/ig, '');
    return text;
  }

  const text = htmlToText('<div><p>당신은</p><br/><br/></div><p>할 수 있어</p>', { ignoreBRTag: true });
  console.log(text);
}
