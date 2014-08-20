require.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    'text': 'lib/text',
  },
  shim: {
    'lib/crafty': {
      exports: 'Crafty',
    },
    'lib/Tiled/tiledmapbuilder': [
      'lib/Tiled/modules/create_mocks_module',
      'lib/crafty',
    ],
  },
});

require(['game'], function (game) {
  window.game = game;
});
