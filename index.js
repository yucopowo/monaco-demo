const options = {
    value: '',
    language: 'markdown',
    fontSize: 16,
    minimap: {
        enabled: false
    },
    wordWrap: 'on',
    smoothScrolling: true,
    overviewRulerBorder: false,
    hover:{
        enabled: false
    },
    contextmenu:false,
    selectionHighlight: false
};

require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' }});

function init(md) {

    var editor = monaco.editor.create(document.getElementById('editor'), options);
    editor.setValue(md);

    function showChange(change) {
        const range = change.range;

        const startLineNumber = range.startLineNumber;
        const endLineNumber = range.endLineNumber;

        const startColumn = range.startColumn;
        const endColumn = range.endColumn;
        const text = change.text;

        let action = '';
        if(
            startLineNumber === endLineNumber
            &&
            startColumn === endColumn
            &&  text
        ) {
            action = 'insert';
        }


        if(
            startLineNumber <= endLineNumber
            // && startColumn < endColumn
            && text === ''
        ) {
            action = 'remove';
        }

        if(
            (
                (startLineNumber === endLineNumber && startColumn !== endColumn) ||
                (startLineNumber < endLineNumber)
            )
            && text
        ) {
            action = 'replace';
        }

        console.log('['+startLineNumber+'-'+endLineNumber+']',':','['+startColumn+'-'+endColumn+']', action, text);


        return {
            start: {
                line: startLineNumber,
                column: startColumn
            },
            end: {
                line: endLineNumber,
                column: endColumn
            },
            content: text
        }

    }


    // editor.onDidScrollChange((e) => {
    //     var ranges = editor.getVisibleRanges(); //可视区间
    //     console.log(ranges[0])
    // });


    // editor.onDidChangeModelContent((e) => {
    //     var change = e.changes[0];
    //     showChange(change);
    // });




    function scrollToLine(line) {


        var r = editor.getScrolledVisiblePosition({
            column:1,
            lineNumber: line
        });


        editor.setScrollTop(r.top);


        // editor.setScrollTop(100);

        // editor.setPosition({
        //     column:0,
        //     lineNumber: line
        // });
        //
        //
        // var p = editor.getPosition();
        //
        // console.log(p);

    }


    const app = new Vue({
        el: '#settings',
        data() {
            return {
                options: options
            }
        },
        watch:{
            options:{
                handler: function (v) {
                    editor.updateOptions(v);
                },
                deep: true,
                immediate: true
            }
        },
        methods:{
            scrollToLine(){
                scrollToLine(10);
            },
            test() {

                //Get the scrollHeight of the editor's viewport.
                // 编辑器滚动区域总高度
                // var r = editor.getScrollHeight();

                //
                // var r = editor.getScrollTop();


                //哪一行的可视位置
                // var r = editor.getScrolledVisiblePosition({
                //     column:1,
                //     lineNumber: 2
                // });

                // console.log(r);

                //让哪一行的展现 方向的最小距离滚动
                // editor.revealLine(15);

                // //让哪一行的展现在最中心
                // editor.revealLineInCenter(15);


                // //让多行的展现在可视区域
                // editor.revealLines(15, 20);

                //让多行的展现在可视区域的最中心
                // editor.revealLinesInCenter(15, 20);


                // editor.revealPosition({
                //     column:0,
                //     lineNumber: 17
                // });

                editor.revealRangeInCenter({
                    endColumn:0,
                    startColumn:0,
                    startLineNumber:22,
                    endLineNumber:32,
                }, 0);



            }
        }
    });


}

require(['vs/editor/editor.main'], function() {
    fetch('./demo.md').then((res)=>{return res.text();}).then((md)=>{
        init(md);
    });
});



