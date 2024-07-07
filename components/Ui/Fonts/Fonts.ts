import { Noto_Sans_JP, Poppins, Inconsolata } from 'next/font/google';
import localFont from 'next/font/local';

export const notoSansJP = Noto_Sans_JP({
  weight: ['400'],
  subsets: ['latin'],
  style: ['normal'],
});

export const poppins = Poppins({
  weight: ['600'],
  subsets: ['latin'],
  style: ['normal'],
});

export const inconsolata = Inconsolata({
  weight: ['400'],
  subsets: ['latin'],
  style: ['normal'],
});

// カスタムローカルフォントを定義する
export const rockwellNovaBold = localFont({
  src: '../../../public/Fonts/RockwellNova-Bold.ttf',
});

export const consola = localFont({
  src: '../../../public/Fonts/consola.ttf',
});

// export const meiryo = localFont({
//   src: '../../../public/Fonts/Meiryo.ttf',
// });
