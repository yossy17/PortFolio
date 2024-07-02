declare module 'kuroshiro' {
  class Kuroshiro {
    init(analyzer: any): Promise<void>;
    convert(text: string, options?: { to?: 'hiragana' | 'katakana' | 'romaji' }): Promise<string>;
  }
  export default Kuroshiro;
}
