'use strict';

module.exports = {
  url: 'https://andre-wibbeke.dev',
  pathPrefix: '/',
  title: 'André Wibbeke | Personal Website and Blog',
  subtitle: 'I help create brands that people love.',
  copyright: '© All rights reserved.',
  disqusShortname: 'https-andre-wibbeke-dev',
  postsPerPage: 4,
  googleAnalyticsId: '',
  gtmId: 'GTM-TJ3KPTB',
  gtmAuth: process.env.NODE_ENV === 'production' ? 'DkWFm2vXQQqF5gzFZ34aAQ'
    : 'l84rtWF1tKMdKrLRN_4e5A',
  gtmPreview: process.env.NODE_ENV === 'production' ? 'env-1' : 'env-16',
  useKatex: false,
  menu: [
    {
      label: 'Articles',
      path: '/'
    },
    {
      label: 'About me',
      path: '/pages/about'
    },
    {
      label: 'Contact me',
      path: '/pages/contacts'
    }
  ],
  author: {
    name: 'André Wibbeke',
    tagline: 'Data-Driven Marketing',
    photo: '/me_squared.jpg',
    bio: 'I\'m a Marketing developer and digital advertising specialist with over two years '
      + 'of experience in Programmatic Advertising.',
    contacts: {
      email: 'wibbeke.andre@gmail.com',
      facebook: '',
      telegram: '',
      twitter: 'AndreWibbeke',
      github: 'andreWibbeke',
      rss: '',
      vkontakte: '',
      linkedin: 'andré-wibbeke-aa76a4138/',
      instagram: '',
      line: '',
      gitlab: '',
      weibo: '',
      codepen: '',
      youtube: '',
      soundcloud: '',
    }
  }
};
