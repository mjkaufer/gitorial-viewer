# Gitorial Viewer

## Usage
To use this, enter your GitHub repo address in the first field, and the file you're trying to load in the second. For instance, viewing this repo as a Gitorial would require you to enter `mjkaufer/gitorial-viewer` in the first input and `README.md` or some other file in the second

If you want to send a link to a certain repo/file combo, you send something like `http://www.kaufer.org/gitorial-viewer/?address=githubUsername/githubRepo&fileName=index.html` to your friend


## Things To Look Out For
This is a very simple system, and does not bother checking if the file you listed is in all of the commits. This means that it might try and load a file from a commit that doesn't have that file, when you click that commit.

## TODO

* Add checking if you click on a commit but the file you're looking for is not a part of that commit
* Better error handling
* Loading screens & progress bars