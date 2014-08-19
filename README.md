TileExplorer
============

A simple tile-based JavaScript game.

Getting Started
---------------

Here are the basic steps for getting set up.  Step 11 is a bit janky, but it's that or run a local webserver so that we can load it via a text plugin.  Loading text files is not supported when working with local files (wouldn't want someone loading your password file).

1. Make a GitHub account if you don't have one.  If you want to make modifications either fork the repository (advanced) or ask for commit access by sending me your username.
1. Install Git.  See the [GitHub help page](https://help.github.com/articles/set-up-git).  Quick links: [Windows](https://windows.github.com/) [Mac](https://mac.github.com/).
1. Get the source code.  Sync though your local git.  In the GitHub GUI add "periodic/TileExplorer".  For standard git use the link in the right-hand bar on GitHub.  Then cloen the repository.
1. Open game.html in your browser by browsing to it in the files you just synced.
1. Install Tiled from http://www.mapeditor.org
1. Open test.tmx in Tiled, again in the repostory.
1. Edit something.  Try placing some items in the "Fixed" (indestructable) or "Destructable" layers.  See the Tiled help pages for more info about Tiled.
1. Save the file.
1. Export as JSON and save as tiles.js.  You will have to manually change the filename.
1. Open up tiles.js and wrap it in define(...).  Put "define(" at the start before the first "{" else, and a matching ")" at the end after the last "}".
1. Reload game.html in your browser and see your change
1. Upload your change by creating a commit in git, then sync to the remote repository.

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

``tmw_desert_spacing.png`` is from the Tiled examples, and is by The Mana World Development Team, licensed under GPL.

``spaceship_game_sprites.png`` is by 7Soul1.  See http://7soul1.deviantart.com/art/Spaceship-Game-Sprites-385923888

``bump.mp3``, ``gun.mp3``, ``destroyed.mp3`` by Mike Koenig. Licenced Attribution 3.0
