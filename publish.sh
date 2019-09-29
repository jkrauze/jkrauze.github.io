#!/bin/sh

if [ "$#" -ne 1 ]; then
    echo "Illegal number of parameters"
    exit 1
fi

if [ ! -s $1 ]; then
	echo "$1 file doesn't exist."
	exit 1
fi

CATEGORY_REGEX='.+/(.+)/memory/.+\.md'

DATE=$(date --rfc-3339=seconds)
POST_SRC_FULLPATH=$(realpath "$1")
POST_SRC_FILENAME=$(basename "$POST_SRC_FULLPATH")
POST_FILENAME="$(date -I)-$POST_SRC_FILENAME"
POST_FULLPATH="_posts/$POST_FILENAME"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR

echo "Publishing $POST_SRC_FULLPATH on $DATE"

TITLE=$(head -1 "$POST_SRC_FULLPATH" | sed -E "s%# (.+) <!--.+%\1%g")
CATEGORY=$(echo "$POST_SRC_FULLPATH" | sed -E "s%$CATEGORY_REGEX%\1%g")

sed "s/%DATE%/$DATE/g" publish_prefix.txt | sed "s/%TITLE%/$TITLE/g" | sed "s/%CATEGORY%/$CATEGORY/g" > $POST_FULLPATH
cat $POST_FULLPATH
tail -n+2 $POST_SRC_FULLPATH | sed -E 's/^(#.+) <!--.+/\n#\1\n/g' >> $POST_FULLPATH
