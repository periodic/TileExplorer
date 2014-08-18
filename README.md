TileExplorer
============

A simple tile-based JavaScript game.

Getting Started
---------------

Here are the basic steps for getting set up.  Step 11 is a bit janky, but it's that or run a local webserver so that we can load it via a text plugin.  Loading text files is not supported when working with local files (wouldn't want someone loading your password file).

1. Make a GitHub account if you don't have one.
1. Install Git.
1. Fork the repository: https://github.com/periodic/TileExplorer
1. Get the source code from your repository.
1. Open game.html in your browser.
1. Install Tiled from http://www.mapeditor.org
1. Open data/test.tmx in Tiled.
1. Edit something.
1. Save the file.
1. Export as JSON and save as tiles.js.
1. Open up tiles.js and wrap it in define(...)
1. Reload game.html and see your change
1. Upload your change to GitHub.
1. Go to GitHub and create a pull request to merge your changes into my repository.

TODO
----

1. Add object-layer support to the Tile importing library.
2. Add animations to the player object.
3. Add sounds for player collision, firing and destroying objects.
4. Create a larger map and allow scrolling within a viewport.
5. Add mouse-targetting, causing firing in the direction of the mouse when clicked.

License Notes
-------------

All files under ``lib/Tiled`` are by Tomas Jurman with some local modifications, licensed under GPL.  See: https://github.com/Kibo/TiledMapBuilder

The ``tmw_desert_spacing.png`` file is from the Tiled examples, and is by The Mana World Development Team, licensed under GPL.

``spaceship_game_sprites.png`` is by 7Soul1.  See http://7soul1.deviantart.com/art/Spaceship-Game-Sprites-385923888
