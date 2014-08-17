require.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  shim: {
    'lib/crafty': {
      exports: 'Crafty',
    },
  },
});

require(['game']);
