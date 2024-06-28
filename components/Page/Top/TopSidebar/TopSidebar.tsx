import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

const TopSidebar = () => {
  return (
    <>
      <div className='top__sidebar'>
        <div className='top__sidebar__profile'>
          {/* カード */}
          <div className='top__sidebar__profile__card'>
            <a href='/about'>
              <span className='top__sidebar__profile__card__triangle'></span>

              <div className='top__sidebar__profile__card__icon'>
                <Image
                  src='/Imgs/Yossy.webp'
                  alt='icon'
                  width={250}
                  height={250}
                  unoptimized
                ></Image>
              </div>
              {/* ステータス */}
              <div className='top__sidebar__profile__card__status'>
                {/* 表 */}
                <div className='top__sidebar__profile__card__status__front'>
                  <h2 className='top__sidebar__profile__card__status__front__name'>Yos_sy</h2>
                  <p className='top__sidebar__profile__card__status__front__state'>
                    <span className='top__sidebar__profile__card__status__front__state__age'>
                      14y/o
                    </span>
                    <span className='top__sidebar__profile__card__status__front__state__school'>
                      JHS
                    </span>
                  </p>
                </div>
                {/* 裏 */}
                <div className='top__sidebar__profile__card__status__behind'>
                  <div className='top__sidebar__profile__card__status__behind__description'>
                    {' '}
                    中学生エンジニア <br />
                    WebフロントエンドとC#,C++勉強中
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* リンク */}
          <div className='top__sidebar__profile__link'>
            {/* ツイッター */}
            <a
              href='https://twitter.com/yos_sy17'
              about='_blank'
              className='top__sidebar__profile__link__media'
            >
              <FontAwesomeIcon icon={faSquareXTwitter} />
            </a>
            {/* GreasyFork */}
            <a
              href='https://greasyfork.org/ja/users/1319247-yos-sy'
              about='_blank'
              className='top__sidebar__profile__link__media'
            >
              <svg
                aria-hidden='true'
                focusable='false'
                data-prefix='fab'
                data-icon='greasyfork'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <path d='M5.89 2.227a.28.28 0 0 1 .266.076l5.063 5.062c.54.54.509 1.652-.031 2.192l8.771 8.77c1.356 1.355-.36 3.097-1.73 1.728l-8.772-8.77c-.54.54-1.651.571-2.191.031l-5.063-5.06c-.304-.304.304-.911.608-.608l3.714 3.713L7.59 8.297 3.875 4.582c-.304-.304.304-.911.607-.607l3.715 3.714 1.067-1.066L5.549 2.91c-.228-.228.057-.626.342-.683ZM12 0C5.374 0 0 5.375 0 12s5.374 12 12 12c6.625 0 12-5.375 12-12S18.625 0 12 0Z' />
              </svg>
            </a>
            {/* GitHub */}
            <a
              href='https://github.com/yossy17'
              about='_blank'
              className='top__sidebar__profile__link__media'
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopSidebar;
