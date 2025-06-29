
const HtmlFontSizeSetter = (fontSize : string) => {
    const html = document.querySelector<HTMLElement>('html');
    if (!html) return;
    html.style.fontSize = fontSize;
  return null;
};

export default HtmlFontSizeSetter;
