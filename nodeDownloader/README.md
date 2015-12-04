# :octocat: Node Downloader
In the name of God, the Beneficent the Merciful.

Node Downloader is a plugin for Construct 2 game engine that allows you to download a file from a URL and save it in the player's PC.

:exclamation: Node Downloader only works with [NW.js](http://nwjs.io) (and [Electron](http://electron.atom.io)).

## Download
You can download .c2addon file of "Node Downloader" plugin from [here]().
Also you can download sample .capx files from [here]().

## Actions
#### Start download a file
Starts download a file.

| Parameter | Explanation                                       |
| --------- | ------------------------------------------------- |
| Tag       | An optional name to distinguish between downloads |
| URL       | URL of file that is to be downloaded              |
| Path      | Location that downloaded file will be saved to it |

## Conditions
#### On completed
This event occurs once while the file downloaded and saved on the disk.
___
#### On error
If the file couldn't be downloaded for any reason this event will trigger and the reason of error logs in to the console.
___
#### On progress
Each file should be fragmented for downloading. After each slice of the file received, this event triggers and `Percent` expression will be accessible.

## Expressions
#### Percent
Get the progress of downloading, from 0 to 100. This expression will be updated when a slice of the file received. So use it **_only_** in `On progress` event.
___
#### TotalSize(tag)
Get the total size of the file, in bytes. This expression is only accessible when downloading is in progress. So you can use it in `On progress` or `On completed` events. After that, it returns `-1`.

## To do
- [ ] Compatibility with google closure compiler.
- [ ] Adding more ACEs.

##### Credits
<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a>             is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div>