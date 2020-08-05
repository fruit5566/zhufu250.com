// 书签导出模板
const BookMarkTEMP = `
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DT><H3 ADD_DATE="$ADD_DATE" LAST_MODIFIED="$LAST_MODIFIED" PERSONAL_TOOLBAR_FOLDER="true">书签栏</H3>
    <DL><p>
$TEMPCONTENT
    </DL><p>
</DL><p>
        `;

module.exports = BookMarkTEMP;
