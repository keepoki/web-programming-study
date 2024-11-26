namespace UtilString {
  
  interface HTMLToTextOptions {
    ignoreBRTag?: boolean;
  }

  export function htmlToText(htmlStr: string, options?: HTMLToTextOptions) {
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

  const tag = 
`<div style="display:flex;">
    <label>HELLO WORLD</label>
    <br>
    <label>HAVE A HAPPY DAY</label>   
</div>`;
  console.log(htmlToText(tag));
  console.log(htmlToText(tag, { ignoreBRTag: true }));

}