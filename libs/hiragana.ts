async function convertToHiragana(text: string): Promise<string> {
  const API_URL = 'https://labs.goo.ne.jp/api/hiragana';
  const API_KEY = '9adf96294e46b6c83ff5f1c663fa7cb12e6834afac34c70ea4e1d83413bca848';

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: API_KEY,
      request_id: 'hiragana', // 任意のユニークなID
      sentence: text,
      output_type: 'hiragana',
    }),
  });

  const data = await response.json();
  return data.converted;
}
