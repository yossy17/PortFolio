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

// タイトルからスラッグを生成する関数
export async function generateSlug(title: string): Promise<string> {
  // タイトルを単語（空白で区切られた部分）に分割
  const words = title.split(/\s+/);

  // 各単語を処理
  const processedWords = await Promise.all(
    words.map(async (word) => {
      // 単語を漢字と英数字に分割
      const segments = word.split(/([a-zA-Z0-9]+)/);

      // 各セグメントを処理
      const processedSegments = await Promise.all(
        segments.map(async (segment) => {
          if (/[一-龯々ぁ-んァ-ヶ]/.test(segment)) {
            // 漢字をひらがなに変換
            return await convertKanjiToHiragana(segment);
          }
          // 英数字はそのまま返す
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
