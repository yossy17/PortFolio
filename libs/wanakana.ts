import axios from 'axios';
import * as wanakana from 'wanakana';

// 漢字をひらがなに変換する関数
async function convertKanjiToHiragana(text: string): Promise<string> {
  const url = 'https://labs.goo.ne.jp/api/hiragana';
  const params = {
    app_id: '9adf96294e46b6c83ff5f1c663fa7cb12e6834afac34c70ea4e1d83413bca848',
    sentence: text,
    output_type: 'hiragana',
  };

  try {
    const response = await axios.post(url, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.converted;
  } catch (error) {
    console.error('Error converting kanji to hiragana:', error);
    return text;
  }
}

// 括弧を-に置き換える関数
function replaceBracketsWithHyphen(text: string): string {
  const bracketsRegex =
    /[\u0028\u0029\uFF08\uFF09\u239B\u239C\u239D\u239E\u239F\u23A0\uFE35\uFE36\uFD3E\uFD3F\uFE59\uFE5A\u2768\u2769\u276A\u276B\u207D\u207E\u208D\u208E\u2985\u2986\uFF5F\uFF60\u2E28\u2E29\u300C\u300D\uFF62\uFF63\uFE41\uFE42\u300E\u300F\uFE43\uFE44\u005B\u005D\uFF3B\uFF3D\u23A1\u23A2\u23A3\u23A4\u23A5\u23A6\uFE47\uFE48\u301A\u301B\u27E6\u27E7\u007B\u007D\uFF5B\uFF5D\u23A7\u23A8\u23A9\u23AA\u23AB\u23AC\u23AD\u23B0\u23B1\uFE37\uFE38\uFE5B\uFE5C\u2774\u2775\u3014\u3015\u2772\u2773\u27EE\u27EF\uFE39\uFE3A\u3018\u3019\u27EC\u27ED\u3008\u3009\u2329\u232A\u276C\u276D\u2770\u2771\u29FC\u29FD\u27E8\u27E9\uFE3F\uFE40\u300A\u300B\u27EA\u27EB\uFE3D\uFE3E\u00AB\u00BB\u2039\u203A\u003C\u003E\u3010\u3011\uFE3B\uFE3C\u3016\u3017\uFE17\uFE18]/g;
  return text.replace(bracketsRegex, '-');
}

// タイトルからスラッグを生成する関数
export async function generateSlug(title: string): Promise<string> {
  // 括弧を-に置き換え
  title = replaceBracketsWithHyphen(title);

  // タイトルを単語（空白で区切られた部分）に分割
  const words = title.split(/\s+/);

  // 各単語を処理
  const processedWords = await Promise.all(
    words.map(async (word) => {
      // 単語を漢字と英数字に分割
      const segments = word.split(/([a-zA-Z0-9-]+)/);

      // 各セグメントを処理
      const processedSegments = await Promise.all(
        segments.map(async (segment) => {
          if (/[一-龯々ぁ-んァ-ヶ]/.test(segment)) {
            // 漢字をひらがなに変換
            return await convertKanjiToHiragana(segment);
          }
          // 英数字とハイフンはそのまま返す
          return segment;
        })
      );

      // 処理されたセグメントを結合して単語に戻す
      return processedSegments.join('');
    })
  );

  // 処理された単語を結合してタイトルに変換
  const convertedTitle = processedWords.join(' ');

  // ひらがなとアルファベットをローマ字に変換
  const romaji = wanakana.toRomaji(convertedTitle);

  // 不要な文字を削除し、スラッグ形式に整形
  const slug = romaji
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 英数字、スペース、ハイフン以外を削除
    .trim()
    .replace(/\s+/g, '-') // スペースをハイフンに変換
    .replace(/-+/g, '-') // 連続するハイフンを単一のハイフンに変換
    .replace(/^-+/, '') // 先頭のハイフンを削除
    .replace(/-+$/, '') // 末尾のハイフンを削除
    .slice(0, 24); // 最大24文字に制限

  return slug;
}
