import * as wanakana from 'wanakana';

export function generateSlug(title: string): string {
  // 日本語をローマ字に変換
  const romaji = wanakana.toRomaji(title);

  return romaji
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 英数字、スペース、ハイフン以外を削除
    .trim()
    .replace(/\s+/g, '-') // スペースをハイフンに変換
    .replace(/-+/g, '-') // 連続するハイフンを単一のハイフンに変換
    .replace(/^-+/, '') // 先頭のハイフンを削除
    .replace(/-+$/, '') // 末尾のハイフンを削除
    .slice(0, 100); // 最大100文字に制限
}
