/*!
 * monaco-vim
 * Version - 0.1.7
 * Author - Brijesh Bittu <brijesh@bitwiser.in> (http://bitwiser.in/)
 * License - MIT
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("monaco-editor"),require("monaco-editor/esm/vs/editor/common/controller/cursorTypeOperations")):"function"==typeof define&&define.amd?define(["vs/editor/editor.main","vs/editor/common/controller/cursorTypeOperations"],t):"object"==typeof exports?exports.MonacoVim=t(require("monaco-editor"),require("monaco-editor/esm/vs/editor/common/controller/cursorTypeOperations")):e.MonacoVim=t(e.monaco,e[void 0])}(self,(function(e,t){return function(e){var t={}
function n(r){if(t[r])return t[r].exports
var o=t[r]={i:r,l:!1,exports:{}}
return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e
if(4&t&&"object"==typeof e&&e&&e.__esModule)return e
var r=Object.create(null)
if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o))
return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e}
return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict"
n.r(t)
var r=n(0),o=n(1)
function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t,n){return t&&s(e.prototype,t),n&&s(e,n),e}var c={readOnly:65,cursorWidth:20,fontInfo:32},u=window.navigator,h=u.userAgent,f=u.platform,p=(!/Edge\/(\d+)/.exec(h)&&/AppleWebKit/.test(h)&&/Mobile\/\w+/.test(h)||/Mac/.test(f),/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/)
function d(e,t){if(!(this instanceof d))return new d(e,t)
this.line=e,this.ch=t}String.prototype.normalize
var g=function(e,t){this.pos=this.start=0,this.string=e,this.tabSize=t||8,this.lastColumnPos=this.lastColumnValue=0,this.lineStart=0}
function m(e){return new d(e.lineNumber-1,e.column-1)}function v(e){return new r.Position(e.line+1,e.ch+1)}g.prototype={eol:function(){return this.pos>=this.string.length},sol:function(){return this.pos==this.lineStart},peek:function(){return this.string.charAt(this.pos)||void 0},next:function(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)},eat:function(e){var t=this.string.charAt(this.pos)
if("string"==typeof e)var n=t==e
else n=t&&(e.test?e.test(t):e(t))
if(n)return++this.pos,t},eatWhile:function(e){for(var t=this.pos;this.eat(e););return this.pos>t},eatSpace:function(){for(var e=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos
return this.pos>e},skipToEnd:function(){this.pos=this.string.length},skipTo:function(e){var t=this.string.indexOf(e,this.pos)
if(t>-1)return this.pos=t,!0},backUp:function(e){this.pos-=e},column:function(){throw"not implemented"},indentation:function(){throw"not implemented"},match:function(e,t,n){if("string"!=typeof e){var r=this.string.slice(this.pos).match(e)
return r&&r.index>0?null:(r&&!1!==t&&(this.pos+=r[0].length),r)}var o=function(e){return n?e.toLowerCase():e}
if(o(this.string.substr(this.pos,e.length))==o(e))return!1!==t&&(this.pos+=e.length),!0},current:function(){return this.string.slice(this.start,this.pos)},hideFirstChars:function(e,t){this.lineStart+=e
try{return t()}finally{this.lineStart-=e}}}
var y=function(){function e(t,n,r,o){a(this,e),this.cm=t,this.id=n,this.lineNumber=r+1,this.column=o+1,t.marks[this.id]=this}return l(e,[{key:"clear",value:function(){delete this.cm.marks[this.id]}},{key:"find",value:function(){return m(this)}}]),e}()
function k(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!0,o=monaco.KeyCode[e.keyCode]
e.key&&(o=e.key,n=!1)
var i=o,a=t
switch(e.keyCode){case r.KeyCode.Shift:case r.KeyCode.Meta:case r.KeyCode.Alt:case r.KeyCode.Ctrl:return i
case r.KeyCode.Escape:a=!0,i="Esc"}return o.startsWith("KEY_")?i=o[o.length-1].toLowerCase():o.endsWith("Arrow")?(a=!0,i=o.substr(0,o.length-5)):o.startsWith("US_")&&(i=e.browserEvent.key),a||e.altKey||e.ctrlKey||e.metaKey?(e.altKey&&(i="Alt-".concat(i)),e.ctrlKey&&(i="Ctrl-".concat(i)),e.metaKey&&(i="Meta-".concat(i)),e.shiftKey&&(i="Shift-".concat(i))):i=e.key||e.browserEvent.key,1===i.length&&n&&(i="'".concat(i,"'")),i}var C=function(){function e(t){a(this,e),w.call(this),this.editor=t,this.state={},this.marks={},this.$uid=0,this.disposables=[],this.listeners={},this.curOp={},this.attached=!1,this.statusBar=null,this.addLocalListeners(),this.ctxInsert=this.editor.createContextKey("insertMode",!0)}return l(e,[{key:"attach",value:function(){e.keyMap.vim.attach(this)}},{key:"addLocalListeners",value:function(){this.disposables.push(this.editor.onDidChangeCursorPosition(this.handleCursorChange),this.editor.onDidChangeModelContent(this.handleChange),this.editor.onKeyDown(this.handleKeyDown))}},{key:"handleReplaceMode",value:function(e,t){var n=!1,o=e,i=this.editor.getPosition(),a=new r.Range(i.lineNumber,i.column,i.lineNumber,i.column+1)
if(e.startsWith("'"))o=e[1]
else if("Enter"===o)o="\n"
else{if("Backspace"!==o)return
var s=this.replaceStack.pop()
if(!s)return
n=!0,o=s,a=new r.Range(i.lineNumber,i.column,i.lineNumber,i.column-1)}t.preventDefault(),t.stopPropagation(),this.replaceStack||(this.replaceStack=[]),n||this.replaceStack.push(this.editor.getModel().getValueInRange(a)),this.editor.executeEdits("vim",[{text:o,range:a,forceMoveMarkers:!0}]),n&&this.editor.setPosition(a.getStartPosition())}},{key:"setOption",value:function(e,t){this.state[e]=t,"theme"===e&&r.editor.setTheme(t)}},{key:"getConfiguration",value:function(){var e=this.editor,t=c
return"function"==typeof e.getConfiguration?e.getConfiguration():("EditorOption"in r.editor&&(t=r.editor.EditorOption),{readOnly:e.getOption(t.readOnly),viewInfo:{cursorWidth:e.getOption(t.cursorWidth)},fontInfo:e.getOption(t.fontInfo)})}},{key:"getOption",value:function(e){return"readOnly"===e?this.getConfiguration().readOnly:"firstLineNumber"===e?this.firstLine()+1:"indentWithTabs"===e?!this.editor.getModel().getOptions().insertSpaces:"function"==typeof this.editor.getConfiguration?this.editor.getRawConfiguration()[e]:this.editor.getRawOptions()[e]}},{key:"dispatch",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r]
var o=this.listeners[e]
o&&o.forEach((function(e){return e.apply(void 0,n)}))}},{key:"on",value:function(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)}},{key:"off",value:function(e,t){var n=this.listeners[e]
n&&(this.listeners[e]=n.filter((function(e){return e!==t})))}},{key:"firstLine",value:function(){return 0}},{key:"lastLine",value:function(){return this.lineCount()-1}},{key:"lineCount",value:function(){return this.editor.getModel().getLineCount()}},{key:"defaultTextHeight",value:function(){return 1}},{key:"getLine",value:function(e){if(e<0)return""
var t=this.editor.getModel().getLineCount()
return e+1>t&&(e=t-1),this.editor.getModel().getLineContent(e+1)}},{key:"getAnchorForSelection",value:function(e){return e.isEmpty()?e.getPosition():e.getDirection()===r.SelectionDirection.LTR?e.getStartPosition():e.getEndPosition()}},{key:"getHeadForSelection",value:function(e){return e.isEmpty()?e.getPosition():e.getDirection()===r.SelectionDirection.LTR?e.getEndPosition():e.getStartPosition()}},{key:"getCursor",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null
if(!e)return m(this.editor.getPosition())
var t=this.editor.getSelection()
return m(t.isEmpty()?t.getPosition():"anchor"===e?this.getAnchorForSelection(t):this.getHeadForSelection(t))}},{key:"getRange",value:function(e,t){var n=v(e),o=v(t)
return this.editor.getModel().getValueInRange(r.Range.fromPositions(n,o))}},{key:"getSelection",value:function(){return this.editor.getModel().getValueInRange(this.editor.getSelection())}},{key:"replaceRange",value:function(e,t,n){var o=v(t),i=n?v(n):o
this.editor.executeEdits("vim",[{text:e,range:r.Range.fromPositions(o,i)}]),this.pushUndoStop()}},{key:"pushUndoStop",value:function(){this.editor.pushUndoStop()}},{key:"setCursor",value:function(e,t){var n=e
"object"!==i(e)&&((n={}).line=e,n.ch=t)
var r=this.editor.getModel().validatePosition(v(n))
this.editor.setPosition(v(n)),this.editor.revealPosition(r)}},{key:"somethingSelected",value:function(){return!this.editor.getSelection().isEmpty()}},{key:"operation",value:function(e,t){return e()}},{key:"listSelections",value:function(){var e=this,t=this.editor.getSelections()
return!t.length||this.inVirtualSelectionMode?[{anchor:this.getCursor("anchor"),head:this.getCursor("head")}]:t.map((function(t){return t.getPosition(),t.getStartPosition(),t.getEndPosition(),{anchor:e.clipPos(m(e.getAnchorForSelection(t))),head:e.clipPos(m(e.getHeadForSelection(t)))}}))}},{key:"focus",value:function(){this.editor.focus()}},{key:"setSelections",value:function(e,t){var n=!!this.editor.getSelections().length,o=e.map((function(e,t){var o=e.anchor,i=e.head
return n?r.Selection.fromPositions(v(o),v(i)):r.Selection.fromPositions(v(i),v(o))}))
if(t?o[t]&&o.push(o.splice(t,1)[0]):o.reverse(),o.length){var i,a=o[0]
i=a.getDirection()===r.SelectionDirection.LTR?a.getEndPosition():a.getStartPosition(),this.editor.setSelections(o),this.editor.revealPosition(i)}}},{key:"setSelection",value:function(e,t){var n=r.Range.fromPositions(v(e),v(t))
this.editor.setSelection(n)}},{key:"getSelections",value:function(){var e=this.editor
return e.getSelections().map((function(t){return e.getModel().getValueInRange(t)}))}},{key:"replaceSelections",value:function(e){var t=this.editor
t.getSelections().forEach((function(n,r){t.executeEdits("vim",[{range:n,text:e[r],forceMoveMarkers:!1}])}))}},{key:"toggleOverwrite",value:function(e){e?(this.enterVimMode(),this.replaceMode=!0):(this.leaveVimMode(),this.replaceMode=!1,this.replaceStack=[])}},{key:"charCoords",value:function(e,t){return{top:e.line,left:e.ch}}},{key:"coordsChar",value:function(e,t){}},{key:"clipPos",value:function(e){return m(this.editor.getModel().validatePosition(v(e)))}},{key:"setBookmark",value:function(e,t){var n=new y(this,this.$uid++,e.line,e.ch)
return t&&t.insertLeft||(n.$insertRight=!0),this.marks[n.id]=n,n}},{key:"getScrollInfo",value:function(){var e=this.editor,t=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var n=[],r=!0,o=!1,i=void 0
try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==s.return||s.return()}finally{if(o)throw i}}return n}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}(e.getVisibleRanges(),1)[0]
return{left:0,top:t.startLineNumber-1,height:e.getModel().getLineCount(),clientHeight:t.endLineNumber-t.startLineNumber+1}}},{key:"triggerEditorAction",value:function(e){this.editor.trigger("vim",e)}},{key:"dispose",value:function(){this.dispatch("dispose"),this.removeOverlay(),e.keyMap.vim&&e.keyMap.vim.detach(this),this.disposables.forEach((function(e){return e.dispose()}))}},{key:"getInputField",value:function(){}},{key:"getWrapperElement",value:function(){}},{key:"enterVimMode",value:function(){!(arguments.length>0&&void 0!==arguments[0])||arguments[0],this.ctxInsert.set(!1)
var e=this.getConfiguration()
this.initialCursorWidth=e.viewInfo.cursorWidth||0,this.editor.updateOptions({cursorWidth:e.fontInfo.typicalFullwidthCharacterWidth,cursorBlinking:"solid"})}},{key:"leaveVimMode",value:function(){this.ctxInsert.set(!0),this.editor.updateOptions({cursorWidth:this.initialCursorWidth||0,cursorBlinking:"blink"})}},{key:"virtualSelectionMode",value:function(){return this.inVirtualSelectionMode}},{key:"markText",value:function(){return{clear:function(){},find:function(){}}}},{key:"getUserVisibleLines",value:function(){var e=this.editor.getVisibleRanges()
if(!e.length)return{top:0,bottom:0}
var t={top:1/0,bottom:0}
return e.reduce((function(e,t){return t.startLineNumber<e.top&&(e.top=t.startLineNumber),t.endLineNumber>e.bottom&&(e.bottom=t.endLineNumber),e}),t),t.top-=1,t.bottom-=1,t}},{key:"findPosV",value:function(e,t,n){var r=this.editor,o=t,i=v(e)
if("page"===n){var a=r.getLayoutInfo().height,s=this.getConfiguration().fontInfo.lineHeight
o*=Math.floor(a/s)}return"line"===n&&(i.lineNumber+=o),m(i)}},{key:"findMatchingBracket",value:function(e){var t=v(e),n=this.editor.getModel().matchBracket(t)
return n&&2===n.length?{to:m(n[1].getStartPosition())}:{to:null}}},{key:"findFirstNonWhiteSpaceCharacter",value:function(e){return this.editor.getModel().getLineFirstNonWhitespaceColumn(e+1)-1}},{key:"scrollTo",value:function(e,t){(e||t)&&(e||(t<0&&(t=this.editor.getPosition().lineNumber-t),this.editor.setScrollTop(this.editor.getTopForLineNumber(t+1))))}},{key:"moveCurrentLineTo",value:function(e){var t=this.editor,n=t.getPosition(),o=r.Range.fromPositions(n,n)
switch(e){case"top":return void t.revealRangeAtTop(o)
case"center":return void t.revealRangeInCenter(o)
case"bottom":return void t._revealRange(o,4)}}},{key:"getSearchCursor",value:function(e,t,n){var r=!1,o=!1
e instanceof RegExp&&!e.global&&(r=!e.ignoreCase,e=e.source,o=!0),null==t.ch&&(t.ch=Number.MAX_VALUE)
var i=v(t),a=this,s=this.editor,l=null,c=s.getModel(),u=c.findMatches(e,!1,o,r)||[]
return{getMatches:function(){return u},findNext:function(){return this.find(!1)},findPrevious:function(){return this.find(!0)},jumpTo:function(e){if(!u||!u.length)return!1
var t=u[e]
return l=t.range,a.highlightRanges([l],"currentFindMatch"),a.highlightRanges(u.map((function(e){return e.range})).filter((function(e){return!e.equalsRange(l)}))),l},find:function(t){if(!u||!u.length)return!1
var n
if(t){var s=l?l.getStartPosition():i
if(!(n=c.findPreviousMatch(e,s,o,r))||!n.range.getStartPosition().isBeforeOrEqual(s))return!1}else{var h=l?l.getEndPosition():i
if(!(n=c.findNextMatch(e,h,o,r))||!h.isBeforeOrEqual(n.range.getStartPosition()))return!1}return l=n.range,a.highlightRanges([l],"currentFindMatch"),a.highlightRanges(u.map((function(e){return e.range})).filter((function(e){return!e.equalsRange(l)}))),l},from:function(){return l&&m(l.getStartPosition())},to:function(){return l&&m(l.getEndPosition())},replace:function(e){l&&(s.executeEdits("vim",[{range:l,text:e,forceMoveMarkers:!0}]),l.setEndPosition(s.getPosition()),s.setPosition(l.getStartPosition()))}}}},{key:"highlightRanges",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"findMatch",n="decoration".concat(t)
return this[n]=this.editor.deltaDecorations(this[n]||[],e.map((function(e){return{range:e,options:{stickiness:r.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,zIndex:13,className:t,showIfCollapsed:!0}}}))),this[n]}},{key:"addOverlay",value:function(e,t,n){var r=e.query,o=!1,i=!1
r&&r instanceof RegExp&&!r.global&&(i=!0,o=!r.ignoreCase,r=r.source)
var a=this.editor.getModel().findNextMatch(r,this.editor.getPosition(),i,o)
a&&a.range&&this.highlightRanges([a.range])}},{key:"removeOverlay",value:function(){var e=this;["currentFindMatch","findMatch"].forEach((function(t){e.editor.deltaDecorations(e["decoration".concat(t)]||[],[])}))}},{key:"scrollIntoView",value:function(e){e&&this.editor.revealPosition(v(e))}},{key:"moveH",value:function(e,t){if("char"===t){var n=this.editor.getPosition()
this.editor.setPosition(new r.Position(n.lineNumber,n.column+e))}}},{key:"scanForBracket",value:function(e,t,n,r){var o=v(e),i=this.editor.getModel(),a=i.matchBracket(o)
if(!a||2!==a.length)for(var s=0;s<"{([".length;s++){var l=i.findMatchingBracketUp("{(["[s],o)
if(l){a=i.matchBracket(l.getEndPosition())
break}}return a&&2===a.length?{pos:m(-1===t?a[1].getStartPosition():a[0].getStartPosition()),ch:i.getValueInRange(-1===t?a[0]:a[1])}:null}},{key:"indexFromPos",value:function(e){return this.editor.getModel().getOffsetAt(v(e))}},{key:"posFromIndex",value:function(e){return m(this.editor.getModel().getPositionAt(e))}},{key:"indentLine",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.editor,i=n._getCursors(),a=new r.Position(e+1,1),s=r.Selection.fromPositions(a,a)
n.executeCommands("editor.action.".concat(t?"indent":"outdent","Lines"),o.TypeOperations[t?"indent":"outdent"](i.context.config,this.editor.getModel(),[s]))}},{key:"setStatusBar",value:function(e){this.statusBar=e}},{key:"openDialog",value:function(e,t,n){if(this.statusBar)return this.statusBar.setSec(e,t,n)}},{key:"openNotification",value:function(e){this.statusBar&&this.statusBar.showNotification(e)}}]),e}()
C.Pos=d,C.signal=function(e,t,n){e.dispatch(t,n)},C.on=function(){},C.off=function(){},C.addClass=function(){},C.rmClass=function(){},C.defineOption=function(){},C.keyMap={default:function(e){return function(e){return!0}}},C.isWordChar=function(e){return/\w/.test(e)||e>""&&(e.toUpperCase()!=e.toLowerCase()||p.test(e))},C.keyName=k,C.StringStream=g,C.e_stop=function(e){return e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,C.e_preventDefault(e),!1},C.e_preventDefault=function(e){return e.preventDefault?(e.preventDefault(),e.browserEvent&&e.browserEvent.preventDefault()):e.returnValue=!1,!1},C.commands={redo:function(e){e.triggerEditorAction("redo")},undo:function(e){e.triggerEditorAction("undo")},newlineAndIndent:function(e){e.triggerEditorAction("editor.action.insertLineAfter")}},C.lookupKey=function e(t,n,r){"string"==typeof n&&(n=C.keyMap[n])
var o="function"==typeof n?n(t):n[t]
if(!1===o)return"nothing"
if("..."===o)return"multi"
if(null!=o&&r(o))return"handled"
if(n.fallthrough){if(!Array.isArray(n.fallthrough))return e(t,n.fallthrough,r)
for(var i=0;i<n.fallthrough.length;i++){var a=e(t,n.fallthrough[i],r)
if(a)return a}}},C.defineExtension=function(e,t){C.prototype[e]=t}
var w=function(){var e=this
this.handleKeyDown=function(t){if(!(t.browserEvent.defaultPrevented&t.keyCode!==r.KeyCode.Escape)&&e.attached){var n=k(t)
if(e.replaceMode&&e.handleReplaceMode(n,t),n&&C.keyMap.vim&&C.keyMap.vim.call){var o=C.keyMap.vim.call(n,e)
if(o){t.preventDefault(),t.stopPropagation()
try{o()}catch(e){console.error(e)}}}}},this.handleCursorChange=function(t){var n=t.position,o=(t.source,e.editor),i=o.getSelection()
if(!e.ctxInsert.get()&&"mouse"===t.source&&i.isEmpty()){var a=o.getModel().getLineMaxColumn(n.lineNumber)
if(t.position.column===a)return void o.setPosition(new r.Position(t.position.lineNumber,a-1))}e.dispatch("cursorActivity",e,t)},this.handleChange=function(t){var n={text:t.changes.reduce((function(e,t){return e.push(t.text),e}),[]),origin:"+input"},r=e.curOp=e.curOp||{}
r.changeHandlers||(r.changeHandlers=e.listeners.change&&e.listeners.change.slice()),e.virtualSelectionMode()||(r.lastChange?r.lastChange.next=r.lastChange=n:r.lastChange=r.change=n,e.dispatch("change",e,n))}},S=C
function M(e){return(M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var x=[{keys:"<Left>",type:"keyToKey",toKeys:"h"},{keys:"<Right>",type:"keyToKey",toKeys:"l"},{keys:"<Up>",type:"keyToKey",toKeys:"k"},{keys:"<Down>",type:"keyToKey",toKeys:"j"},{keys:"<Space>",type:"keyToKey",toKeys:"l"},{keys:"<BS>",type:"keyToKey",toKeys:"h",context:"normal"},{keys:"<C-Space>",type:"keyToKey",toKeys:"W"},{keys:"<C-BS>",type:"keyToKey",toKeys:"B",context:"normal"},{keys:"<S-Space>",type:"keyToKey",toKeys:"w"},{keys:"<S-BS>",type:"keyToKey",toKeys:"b",context:"normal"},{keys:"<C-n>",type:"keyToKey",toKeys:"j"},{keys:"<C-p>",type:"keyToKey",toKeys:"k"},{keys:"<C-[>",type:"keyToKey",toKeys:"<Esc>"},{keys:"<C-c>",type:"keyToKey",toKeys:"<Esc>"},{keys:"<C-[>",type:"keyToKey",toKeys:"<Esc>",context:"insert"},{keys:"<C-c>",type:"keyToKey",toKeys:"<Esc>",context:"insert"},{keys:"s",type:"keyToKey",toKeys:"cl",context:"normal"},{keys:"s",type:"keyToKey",toKeys:"c",context:"visual"},{keys:"S",type:"keyToKey",toKeys:"cc",context:"normal"},{keys:"S",type:"keyToKey",toKeys:"VdO",context:"visual"},{keys:"<Home>",type:"keyToKey",toKeys:"0"},{keys:"<End>",type:"keyToKey",toKeys:"$"},{keys:"<PageUp>",type:"keyToKey",toKeys:"<C-b>"},{keys:"<PageDown>",type:"keyToKey",toKeys:"<C-f>"},{keys:"<CR>",type:"keyToKey",toKeys:"j^",context:"normal"},{keys:"<CR>",type:"keyToKey",toKeys:"j^",context:"visual"},{keys:"<Ins>",type:"action",action:"toggleOverwrite",context:"insert"},{keys:"H",type:"motion",motion:"moveToTopLine",motionArgs:{linewise:!0,toJumplist:!0}},{keys:"M",type:"motion",motion:"moveToMiddleLine",motionArgs:{linewise:!0,toJumplist:!0}},{keys:"L",type:"motion",motion:"moveToBottomLine",motionArgs:{linewise:!0,toJumplist:!0}},{keys:"h",type:"motion",motion:"moveByCharacters",motionArgs:{forward:!1}},{keys:"l",type:"motion",motion:"moveByCharacters",motionArgs:{forward:!0}},{keys:"j",type:"motion",motion:"moveByLines",motionArgs:{forward:!0,linewise:!0}},{keys:"k",type:"motion",motion:"moveByLines",motionArgs:{forward:!1,linewise:!0}},{keys:"gj",type:"motion",motion:"moveByDisplayLines",motionArgs:{forward:!0}},{keys:"gk",type:"motion",motion:"moveByDisplayLines",motionArgs:{forward:!1}},{keys:"w",type:"motion",motion:"moveByWords",motionArgs:{forward:!0,wordEnd:!1}},{keys:"W",type:"motion",motion:"moveByWords",motionArgs:{forward:!0,wordEnd:!1,bigWord:!0}},{keys:"e",type:"motion",motion:"moveByWords",motionArgs:{forward:!0,wordEnd:!0,inclusive:!0}},{keys:"E",type:"motion",motion:"moveByWords",motionArgs:{forward:!0,wordEnd:!0,bigWord:!0,inclusive:!0}},{keys:"b",type:"motion",motion:"moveByWords",motionArgs:{forward:!1,wordEnd:!1}},{keys:"B",type:"motion",motion:"moveByWords",motionArgs:{forward:!1,wordEnd:!1,bigWord:!0}},{keys:"ge",type:"motion",motion:"moveByWords",motionArgs:{forward:!1,wordEnd:!0,inclusive:!0}},{keys:"gE",type:"motion",motion:"moveByWords",motionArgs:{forward:!1,wordEnd:!0,bigWord:!0,inclusive:!0}},{keys:"{",type:"motion",motion:"moveByParagraph",motionArgs:{forward:!1,toJumplist:!0}},{keys:"}",type:"motion",motion:"moveByParagraph",motionArgs:{forward:!0,toJumplist:!0}},{keys:"(",type:"motion",motion:"moveBySentence",motionArgs:{forward:!1}},{keys:")",type:"motion",motion:"moveBySentence",motionArgs:{forward:!0}},{keys:"<C-f>",type:"motion",motion:"moveByPage",motionArgs:{forward:!0}},{keys:"<C-b>",type:"motion",motion:"moveByPage",motionArgs:{forward:!1}},{keys:"<C-d>",type:"motion",motion:"moveByScroll",motionArgs:{forward:!0,explicitRepeat:!0}},{keys:"<C-u>",type:"motion",motion:"moveByScroll",motionArgs:{forward:!1,explicitRepeat:!0}},{keys:"gg",type:"motion",motion:"moveToLineOrEdgeOfDocument",motionArgs:{forward:!1,explicitRepeat:!0,linewise:!0,toJumplist:!0}},{keys:"G",type:"motion",motion:"moveToLineOrEdgeOfDocument",motionArgs:{forward:!0,explicitRepeat:!0,linewise:!0,toJumplist:!0}},{keys:"0",type:"motion",motion:"moveToStartOfLine"},{keys:"^",type:"motion",motion:"moveToFirstNonWhiteSpaceCharacter"},{keys:"+",type:"motion",motion:"moveByLines",motionArgs:{forward:!0,toFirstChar:!0}},{keys:"-",type:"motion",motion:"moveByLines",motionArgs:{forward:!1,toFirstChar:!0}},{keys:"_",type:"motion",motion:"moveByLines",motionArgs:{forward:!0,toFirstChar:!0,repeatOffset:-1}},{keys:"$",type:"motion",motion:"moveToEol",motionArgs:{inclusive:!0}},{keys:"%",type:"motion",motion:"moveToMatchedSymbol",motionArgs:{inclusive:!0,toJumplist:!0}},{keys:"f<character>",type:"motion",motion:"moveToCharacter",motionArgs:{forward:!0,inclusive:!0}},{keys:"F<character>",type:"motion",motion:"moveToCharacter",motionArgs:{forward:!1}},{keys:"t<character>",type:"motion",motion:"moveTillCharacter",motionArgs:{forward:!0,inclusive:!0}},{keys:"T<character>",type:"motion",motion:"moveTillCharacter",motionArgs:{forward:!1}},{keys:";",type:"motion",motion:"repeatLastCharacterSearch",motionArgs:{forward:!0}},{keys:",",type:"motion",motion:"repeatLastCharacterSearch",motionArgs:{forward:!1}},{keys:"'<character>",type:"motion",motion:"goToMark",motionArgs:{toJumplist:!0,linewise:!0}},{keys:"`<character>",type:"motion",motion:"goToMark",motionArgs:{toJumplist:!0}},{keys:"]`",type:"motion",motion:"jumpToMark",motionArgs:{forward:!0}},{keys:"[`",type:"motion",motion:"jumpToMark",motionArgs:{forward:!1}},{keys:"]'",type:"motion",motion:"jumpToMark",motionArgs:{forward:!0,linewise:!0}},{keys:"['",type:"motion",motion:"jumpToMark",motionArgs:{forward:!1,linewise:!0}},{keys:"]p",type:"action",action:"paste",isEdit:!0,actionArgs:{after:!0,isEdit:!0,matchIndent:!0}},{keys:"[p",type:"action",action:"paste",isEdit:!0,actionArgs:{after:!1,isEdit:!0,matchIndent:!0}},{keys:"]<character>",type:"motion",motion:"moveToSymbol",motionArgs:{forward:!0,toJumplist:!0}},{keys:"[<character>",type:"motion",motion:"moveToSymbol",motionArgs:{forward:!1,toJumplist:!0}},{keys:"|",type:"motion",motion:"moveToColumn"},{keys:"o",type:"motion",motion:"moveToOtherHighlightedEnd",context:"visual"},{keys:"O",type:"motion",motion:"moveToOtherHighlightedEnd",motionArgs:{sameLine:!0},context:"visual"},{keys:"d",type:"operator",operator:"delete"},{keys:"y",type:"operator",operator:"yank"},{keys:"c",type:"operator",operator:"change"},{keys:">",type:"operator",operator:"indent",operatorArgs:{indentRight:!0}},{keys:"<",type:"operator",operator:"indent",operatorArgs:{indentRight:!1}},{keys:"g~",type:"operator",operator:"changeCase"},{keys:"gu",type:"operator",operator:"changeCase",operatorArgs:{toLower:!0},isEdit:!0},{keys:"gU",type:"operator",operator:"changeCase",operatorArgs:{toLower:!1},isEdit:!0},{keys:"n",type:"motion",motion:"findNext",motionArgs:{forward:!0,toJumplist:!0}},{keys:"N",type:"motion",motion:"findNext",motionArgs:{forward:!1,toJumplist:!0}},{keys:"x",type:"operatorMotion",operator:"delete",motion:"moveByCharacters",motionArgs:{forward:!0},operatorMotionArgs:{visualLine:!1}},{keys:"X",type:"operatorMotion",operator:"delete",motion:"moveByCharacters",motionArgs:{forward:!1},operatorMotionArgs:{visualLine:!0}},{keys:"D",type:"operatorMotion",operator:"delete",motion:"moveToEol",motionArgs:{inclusive:!0},context:"normal"},{keys:"D",type:"operator",operator:"delete",operatorArgs:{linewise:!0},context:"visual"},{keys:"Y",type:"operatorMotion",operator:"yank",motion:"expandToLine",motionArgs:{linewise:!0},context:"normal"},{keys:"Y",type:"operator",operator:"yank",operatorArgs:{linewise:!0},context:"visual"},{keys:"C",type:"operatorMotion",operator:"change",motion:"moveToEol",motionArgs:{inclusive:!0},context:"normal"},{keys:"C",type:"operator",operator:"change",operatorArgs:{linewise:!0},context:"visual"},{keys:"~",type:"operatorMotion",operator:"changeCase",motion:"moveByCharacters",motionArgs:{forward:!0},operatorArgs:{shouldMoveCursor:!0},context:"normal"},{keys:"~",type:"operator",operator:"changeCase",context:"visual"},{keys:"<C-w>",type:"operatorMotion",operator:"delete",motion:"moveByWords",motionArgs:{forward:!1,wordEnd:!1},context:"insert"},{keys:"<C-i>",type:"action",action:"jumpListWalk",actionArgs:{forward:!0}},{keys:"<C-o>",type:"action",action:"jumpListWalk",actionArgs:{forward:!1}},{keys:"<C-e>",type:"action",action:"scroll",actionArgs:{forward:!0,linewise:!0}},{keys:"<C-y>",type:"action",action:"scroll",actionArgs:{forward:!1,linewise:!0}},{keys:"a",type:"action",action:"enterInsertMode",isEdit:!0,actionArgs:{insertAt:"charAfter"},context:"normal"},{keys:"A",type:"action",action:"enterInsertMode",isEdit:!0,actionArgs:{insertAt:"eol"},context:"normal"},{keys:"A",type:"action",action:"enterInsertMode",isEdit:!0,actionArgs:{insertAt:"endOfSelectedArea"},context:"visual"},{keys:"i",type:"action",action:"enterInsertMode",isEdit:!0,actionArgs:{insertAt:"inplace"},context:"normal"},{keys:"I",type:"action",action:"enterInsertMode",isEdit:!0,actionArgs:{insertAt:"firstNonBlank"},context:"normal"},{keys:"I",type:"action",action:"enterInsertMode",isEdit:!0,actionArgs:{insertAt:"startOfSelectedArea"},context:"visual"},{keys:"o",type:"action",action:"newLineAndEnterInsertMode",isEdit:!0,interlaceInsertRepeat:!0,actionArgs:{after:!0},context:"normal"},{keys:"O",type:"action",action:"newLineAndEnterInsertMode",isEdit:!0,interlaceInsertRepeat:!0,actionArgs:{after:!1},context:"normal"},{keys:"v",type:"action",action:"toggleVisualMode"},{keys:"V",type:"action",action:"toggleVisualMode",actionArgs:{linewise:!0}},{keys:"<C-v>",type:"action",action:"toggleVisualMode",actionArgs:{blockwise:!0}},{keys:"<C-q>",type:"action",action:"toggleVisualMode",actionArgs:{blockwise:!0}},{keys:"gv",type:"action",action:"reselectLastSelection"},{keys:"J",type:"action",action:"joinLines",isEdit:!0},{keys:"p",type:"action",action:"paste",isEdit:!0,actionArgs:{after:!0,isEdit:!0}},{keys:"P",type:"action",action:"paste",isEdit:!0,actionArgs:{after:!1,isEdit:!0}},{keys:"r<character>",type:"action",action:"replace",isEdit:!0},{keys:"@<character>",type:"action",action:"replayMacro"},{keys:"q<character>",type:"action",action:"enterMacroRecordMode"},{keys:"R",type:"action",action:"enterInsertMode",isEdit:!0,actionArgs:{replace:!0}},{keys:"u",type:"action",action:"undo",context:"normal"},{keys:"u",type:"operator",operator:"changeCase",operatorArgs:{toLower:!0},context:"visual",isEdit:!0},{keys:"U",type:"operator",operator:"changeCase",operatorArgs:{toLower:!1},context:"visual",isEdit:!0},{keys:"<C-r>",type:"action",action:"redo"},{keys:"m<character>",type:"action",action:"setMark"},{keys:'"<character>',type:"action",action:"setRegister"},{keys:"zz",type:"action",action:"scrollToCursor",actionArgs:{position:"center"}},{keys:"z.",type:"action",action:"scrollToCursor",actionArgs:{position:"center"},motion:"moveToFirstNonWhiteSpaceCharacter"},{keys:"zt",type:"action",action:"scrollToCursor",actionArgs:{position:"top"}},{keys:"z<CR>",type:"action",action:"scrollToCursor",actionArgs:{position:"top"},motion:"moveToFirstNonWhiteSpaceCharacter"},{keys:"z-",type:"action",action:"scrollToCursor",actionArgs:{position:"bottom"}},{keys:"zb",type:"action",action:"scrollToCursor",actionArgs:{position:"bottom"},motion:"moveToFirstNonWhiteSpaceCharacter"},{keys:".",type:"action",action:"repeatLastEdit"},{keys:"<C-a>",type:"action",action:"incrementNumberToken",isEdit:!0,actionArgs:{increase:!0,backtrack:!1}},{keys:"<C-x>",type:"action",action:"incrementNumberToken",isEdit:!0,actionArgs:{increase:!1,backtrack:!1}},{keys:"<C-t>",type:"action",action:"indent",actionArgs:{indentRight:!0},context:"insert"},{keys:"<C-d>",type:"action",action:"indent",actionArgs:{indentRight:!1},context:"insert"},{keys:"a<character>",type:"motion",motion:"textObjectManipulation"},{keys:"i<character>",type:"motion",motion:"textObjectManipulation",motionArgs:{textObjectInner:!0}},{keys:"/",type:"search",searchArgs:{forward:!0,querySrc:"prompt",toJumplist:!0}},{keys:"?",type:"search",searchArgs:{forward:!1,querySrc:"prompt",toJumplist:!0}},{keys:"*",type:"search",searchArgs:{forward:!0,querySrc:"wordUnderCursor",wholeWordOnly:!0,toJumplist:!0}},{keys:"#",type:"search",searchArgs:{forward:!1,querySrc:"wordUnderCursor",wholeWordOnly:!0,toJumplist:!0}},{keys:"g*",type:"search",searchArgs:{forward:!0,querySrc:"wordUnderCursor",toJumplist:!0}},{keys:"g#",type:"search",searchArgs:{forward:!1,querySrc:"wordUnderCursor",toJumplist:!0}},{keys:":",type:"ex"}],b=[{name:"colorscheme",shortName:"colo"},{name:"map"},{name:"imap",shortName:"im"},{name:"nmap",shortName:"nm"},{name:"vmap",shortName:"vm"},{name:"unmap"},{name:"write",shortName:"w"},{name:"undo",shortName:"u"},{name:"redo",shortName:"red"},{name:"set",shortName:"se"},{name:"set",shortName:"se"},{name:"setlocal",shortName:"setl"},{name:"setglobal",shortName:"setg"},{name:"sort",shortName:"sor"},{name:"substitute",shortName:"s",possiblyAsync:!0},{name:"nohlsearch",shortName:"noh"},{name:"yank",shortName:"y"},{name:"delmarks",shortName:"delm"},{name:"registers",shortName:"reg",excludeFromCommandHistory:!0},{name:"global",shortName:"g"}],A=S.Pos
S.Vim=function(){function e(e,n){e.attached=!1,this==S.keyMap.vim&&S.rmClass(e.getWrapperElement(),"cm-fat-cursor"),n&&n.attach==t||function(e){e.setOption("disableInput",!1),e.off("cursorActivity",qe),e.state.vim=null,e.leaveVimMode()}(e)}function t(e,n){this==S.keyMap.vim&&(e.attached=!0),n&&n.attach==t||function(e){e.setOption("disableInput",!0),e.setOption("showCursorWhenSelecting",!1),S.signal(e,"vim-mode-change",{mode:"normal"}),e.on("cursorActivity",qe),B(e),e.enterVimMode()}(e)}function n(e,t){if(t){if(this[e])return this[e]
var n=function(e){if("'"==e.charAt(0))return e.charAt(1)
var t=e.split(/-(?!$)/),n=t[t.length-1]
if(1==t.length&&1==t[0].length)return!1
if(2==t.length&&"Shift"==t[0]&&1==n.length)return!1
for(var i=!1,a=0;a<t.length;a++){var s=t[a]
s in r?t[a]=r[s]:i=!0,s in o&&(t[a]=o[s])}return!!i&&(m(n)&&(t[t.length-1]=n.toLowerCase()),"<"+t.join("-")+">")}(e)
if(!n)return!1
var i=S.Vim.findKey(t,n)
return"function"==typeof i&&S.signal(t,"vim-keypress",n),i}}S.defineOption("vimMode",!1,(function(e,t,n){t&&"vim"!=e.getOption("keyMap")?e.setOption("keyMap","vim"):!t&&n!=S.Init&&/^vim/.test(e.getOption("keyMap"))&&e.setOption("keyMap","default")}))
var r={Shift:"S",Ctrl:"C",Alt:"A",Cmd:"D",Mod:"A"},o={Enter:"CR",Backspace:"BS",Delete:"Del",Insert:"Ins"},i=/[\d]/,a=[S.isWordChar,function(e){return e&&!S.isWordChar(e)&&!/\s/.test(e)}],s=[function(e){return/\S/.test(e)}]
function l(e,t){for(var n=[],r=e;r<e+t;r++)n.push(String.fromCharCode(r))
return n}var c=l(65,26),u=l(97,26),h=l(48,10),f=[].concat(c,u,h,["<",">"]),p=[].concat(c,u,h,["-",'"',".",":","/"])
function d(e,t){return t>=e.firstLine()&&t<=e.lastLine()}function g(e){return/^[a-z]$/.test(e)}function m(e){return/^[A-Z]$/.test(e)}function v(e){return/^\s*$/.test(e)}function y(e){return-1!=".?!".indexOf(e)}function k(e,t){for(var n=0;n<t.length;n++)if(t[n]==e)return!0
return!1}var C={}
function w(e,t,n,r,o){if(void 0===t&&!o)throw Error("defaultValue is required unless callback is provided")
if(n||(n="string"),C[e]={type:n,defaultValue:t,callback:o},r)for(var i=0;i<r.length;i++)C[r[i]]=C[e]
t&&L(e,t)}function L(e,t,n,r){var o=C[e],i=(r=r||{}).scope
if(!o)return new Error("Unknown option: "+e)
if("boolean"==o.type){if(t&&!0!==t)return new Error("Invalid argument: "+e+"="+t)
!1!==t&&(t=!0)}o.callback?("local"!==i&&o.callback(t,void 0),"global"!==i&&n&&o.callback(t,n)):("local"!==i&&(o.value="boolean"==o.type?!!t:t),"global"!==i&&n&&(n.state.vim.options[e]={value:t}))}function E(e,t,n){var r=C[e],o=(n=n||{}).scope
if(!r)return new Error("Unknown option: "+e)
if(r.callback){var i=t&&r.callback(void 0,t)
return"global"!==o&&void 0!==i?i:"local"!==o?r.callback():void 0}return((i="global"!==o&&t&&t.state.vim.options[e])||"local"!==o&&r||{}).value}w("filetype",void 0,"string",["ft"],(function(e,t){if(void 0!==t){if(void 0===e)return"null"==(n=t.getOption("mode"))?"":n
var n=""==e?"null":e
t.setOption("mode",n)}}))
var T,R,I=function(e){return e?{changes:e.changes,expectCursorActivityForChange:e.expectCursorActivityForChange}:{changes:[],expectCursorActivityForChange:!1}}
function O(){this.latestRegister=void 0,this.isPlaying=!1,this.isRecording=!1,this.replaySearchQueries=[],this.onRecordingDone=void 0,this.lastInsertModeChanges=I()}function B(e){return e.state.vim||(e.state.vim={inputState:new K,lastEditInputState:void 0,lastEditActionCommand:void 0,lastHPos:-1,lastHSPos:-1,lastMotion:null,marks:{},fakeCursor:null,insertMode:!1,insertModeRepeat:void 0,visualMode:!1,visualLine:!1,visualBlock:!1,lastSelection:null,lastPastedText:null,sel:{},options:{}}),e.state.vim}function P(){var e,t,n,r
for(var o in T={searchQuery:null,searchIsReversed:!1,lastSubstituteReplacePart:void 0,jumpList:(e=-1,t=0,n=0,r=new Array(100),{cachedCursor:void 0,add:function(o,i,a){var s=r[e%100]
function l(t){var n=++e%100,i=r[n]
i&&i.clear(),r[n]=o.setBookmark(t)}if(s){var c=s.find()
c&&!Y(c,i)&&l(i)}else l(i)
l(a),t=e,(n=e-100+1)<0&&(n=0)},move:function(o,i){(e+=i)>t?e=t:e<n&&(e=n)
var a=r[(100+e)%100]
if(a&&!a.find()){var s,l=i>0?1:-1,c=o.getCursor()
do{if((a=r[(100+(e+=l))%100])&&(s=a.find())&&!Y(c,s))break}while(e<t&&e>n)}return a}}),macroModeState:new O,lastCharacterSearch:{increment:0,forward:!0,selectedCharacter:""},registerController:new D({}),searchHistoryController:new j,exCommandHistoryController:new j},C){var i=C[o]
i.value=i.defaultValue}}O.prototype={exitMacroRecordMode:function(){var e=T.macroModeState
e.onRecordingDone&&e.onRecordingDone(),e.onRecordingDone=void 0,e.isRecording=!1},enterMacroRecordMode:function(e,t){var n=T.registerController.getRegister(t)
n&&(n.clear(),this.latestRegister=t,e.openDialog&&(this.onRecordingDone=e.openDialog("(recording)["+t+"]",null,{bottom:!0})),this.isRecording=!0)}}
var N={buildKeyMap:function(){},getRegisterController:function(){return T.registerController},resetVimGlobalState_:P,getVimGlobalState_:function(){return T},maybeInitVimState_:B,suppressErrorLogging:!1,InsertModeKey:Je,map:function(e,t,n){je.map(e,t,n)},unmap:function(e,t){je.unmap(e,t)},setOption:L,getOption:E,defineOption:w,defineEx:function(e,t,n){if(t){if(0!==e.indexOf(t))throw new Error('(Vim.defineEx) "'+t+'" is not a prefix of "'+e+'", command not registered')}else t=e
De[e]=n,je.commandMap_[t]={name:e,shortName:t,type:"api"}},handleKey:function(e,t,n){var r=this.findKey(e,t,n)
if("function"==typeof r)return r()},findKey:function(e,t,n){var r,o=B(e)
function i(){var r=T.macroModeState
if(r.isRecording){if("q"==t)return r.exitMacroRecordMode(),V(e),!0
"mapping"!=n&&function(e,t){if(!e.isPlaying){var n=e.latestRegister,r=T.registerController.getRegister(n)
r&&r.pushText(t)}}(r,t)}}function a(){if("<Esc>"==t)return V(e),o.visualMode?he(e):o.insertMode&&_e(e),!0}return!1===(r=o.insertMode?function(){if(a())return!0
for(var n=o.inputState.keyBuffer=o.inputState.keyBuffer+t,r=1==t.length,i=_.matchCommand(n,x,o.inputState,"insert");n.length>1&&"full"!=i.type;){n=o.inputState.keyBuffer=n.slice(1)
var s=_.matchCommand(n,x,o.inputState,"insert")
"none"!=s.type&&(i=s)}if("none"==i.type)return V(e),!1
if("partial"==i.type)return R&&window.clearTimeout(R),R=window.setTimeout((function(){o.insertMode&&o.inputState.keyBuffer&&V(e)}),E("insertModeEscKeysTimeout")),!r
if(R&&window.clearTimeout(R),r){for(var l=e.listSelections(),c=0;c<l.length;c++){var u=l[c].head
e.replaceRange("",Q(u,0,-(n.length-1)),u,"+input")}T.macroModeState.lastInsertModeChanges.changes.pop()}return V(e),i.command}():function(){if(i()||a())return!0
var n=o.inputState.keyBuffer=o.inputState.keyBuffer+t
if(/^[1-9]\d*$/.test(n))return!0
if(!(r=/^(\d*)(.*)$/.exec(n)))return V(e),!1
var r,s=o.visualMode?"visual":"normal",l=_.matchCommand(r[2]||r[1],x,o.inputState,s)
return"none"==l.type?(V(e),!1):"partial"==l.type||(o.inputState.keyBuffer="",(r=/^(\d*)(.*)$/.exec(n))[1]&&"0"!=r[1]&&o.inputState.pushRepeatDigit(r[1]),l.command)}())?o.insertMode||1!==t.length?void 0:function(){return!0}:!0===r?function(){return!0}:function(){return e.operation((function(){e.curOp.isVimOp=!0
try{"keyToKey"==r.type?function(n){for(var r;n;)r=/<\w+-.+?>|<\w+>|./.exec(n),t=r[0],n=n.substring(r.index+t.length),S.Vim.handleKey(e,t,"mapping")}(r.toKeys):_.processCommand(e,o,r)}catch(t){throw e.state.vim=void 0,B(e),S.Vim.suppressErrorLogging||console.log(t),t}return!0}))}},handleEx:function(e,t){je.processCommand(e,t)},defineMotion:function(e,t){F[e]=t},defineAction:function(e,t){q[e]=t},defineOperator:function(e,t){U[e]=t},mapCommand:function(e,t,n,r,o){var i={keys:e,type:t}
for(var a in i[t]=n,i[t+"Args"]=r,o)i[a]=o[a]
Fe(i)},_mapCommand:Fe,defineRegister:function(e,t){var n=T.registerController.registers
if(!e||1!=e.length)throw Error("Register name must be 1 character")
if(n[e])throw Error("Register already defined "+e)
n[e]=t,p.push(e)},exitVisualMode:he,exitInsertMode:_e}
function K(){this.prefixRepeat=[],this.motionRepeat=[],this.operator=null,this.operatorArgs=null,this.motion=null,this.motionArgs=null,this.keyBuffer=[],this.registerName=null}function V(e,t){e.state.vim.inputState=new K,S.signal(e,"vim-command-done",t)}function W(e,t,n){this.clear(),this.keyBuffer=[e||""],this.insertModeChanges=[],this.searchQueries=[],this.linewise=!!t,this.blockwise=!!n}function D(e){this.registers=e,this.unnamedRegister=e['"']=new W,e["."]=new W,e[":"]=new W,e["/"]=new W}function j(){this.historyBuffer=[],this.iterator=0,this.initialPrefix=null}K.prototype.pushRepeatDigit=function(e){this.operator?this.motionRepeat=this.motionRepeat.concat(e):this.prefixRepeat=this.prefixRepeat.concat(e)},K.prototype.getRepeat=function(){var e=0
return(this.prefixRepeat.length>0||this.motionRepeat.length>0)&&(e=1,this.prefixRepeat.length>0&&(e*=parseInt(this.prefixRepeat.join(""),10)),this.motionRepeat.length>0&&(e*=parseInt(this.motionRepeat.join(""),10))),e},W.prototype={setText:function(e,t,n){this.keyBuffer=[e||""],this.linewise=!!t,this.blockwise=!!n},pushText:function(e,t){t&&(this.linewise||this.keyBuffer.push("\n"),this.linewise=!0),this.keyBuffer.push(e)},pushInsertModeChanges:function(e){this.insertModeChanges.push(I(e))},pushSearchQuery:function(e){this.searchQueries.push(e)},clear:function(){this.keyBuffer=[],this.insertModeChanges=[],this.searchQueries=[],this.linewise=!1},toString:function(){return this.keyBuffer.join("")}},D.prototype={pushText:function(e,t,n,r,o){r&&"\n"!==n.charAt(n.length-1)&&(n+="\n")
var i=this.isValidRegister(e)?this.getRegister(e):null
if(i)m(e)?i.pushText(n,r):i.setText(n,r,o),this.unnamedRegister.setText(i.toString(),r)
else{switch(t){case"yank":this.registers[0]=new W(n,r,o)
break
case"delete":case"change":-1==n.indexOf("\n")?this.registers["-"]=new W(n,r):(this.shiftNumericRegisters_(),this.registers[1]=new W(n,r))}this.unnamedRegister.setText(n,r,o)}},getRegister:function(e){return this.isValidRegister(e)?(e=e.toLowerCase(),this.registers[e]||(this.registers[e]=new W),this.registers[e]):this.unnamedRegister},isValidRegister:function(e){return e&&k(e,p)},shiftNumericRegisters_:function(){for(var e=9;e>=2;e--)this.registers[e]=this.getRegister(""+(e-1))}},j.prototype={nextMatch:function(e,t){var n=this.historyBuffer,r=t?-1:1
null===this.initialPrefix&&(this.initialPrefix=e)
for(var o=this.iterator+r;t?o>=0:o<n.length;o+=r)for(var i=n[o],a=0;a<=i.length;a++)if(this.initialPrefix==i.substring(0,a))return this.iterator=o,i
return o>=n.length?(this.iterator=n.length,this.initialPrefix):o<0?e:void 0},pushInput:function(e){var t=this.historyBuffer.indexOf(e)
t>-1&&this.historyBuffer.splice(t,1),e.length&&this.historyBuffer.push(e)},reset:function(){this.initialPrefix=null,this.iterator=this.historyBuffer.length}}
var _={matchCommand:function(e,t,n,r){var o,i=function(e,t,n,r){for(var o,i=[],a=[],s=0;s<t.length;s++){var l=t[s]
"insert"==n&&"insert"!=l.context||l.context&&l.context!=n||r.operator&&"action"==l.type||!(o=z(e,l.keys))||("partial"==o&&i.push(l),"full"==o&&a.push(l))}return{partial:i.length&&i,full:a.length&&a}}(e,t,r,n)
if(!i.full&&!i.partial)return{type:"none"}
if(!i.full&&i.partial)return{type:"partial"}
for(var a=0;a<i.full.length;a++){var s=i.full[a]
o||(o=s)}if("<character>"==o.keys.slice(-11)){var l=function(e){var t=/^.*(<[^>]+>)$/.exec(e),n=t?t[1]:e.slice(-1)
if(n.length>1)switch(n){case"<CR>":n="\n"
break
case"<Space>":n=" "
break
default:n=""}return n}(e)
if(!l)return{type:"none"}
n.selectedCharacter=l}return{type:"full",command:o}},processCommand:function(e,t,n){switch(t.inputState.repeatOverride=n.repeatOverride,n.type){case"motion":this.processMotion(e,t,n)
break
case"operator":this.processOperator(e,t,n)
break
case"operatorMotion":this.processOperatorMotion(e,t,n)
break
case"action":this.processAction(e,t,n)
break
case"search":this.processSearch(e,t,n)
break
case"ex":case"keyToEx":this.processEx(e,t,n)}},processMotion:function(e,t,n){t.inputState.motion=n.motion,t.inputState.motionArgs=J(n.motionArgs),this.evalInput(e,t)},processOperator:function(e,t,n){var r=t.inputState
if(r.operator){if(r.operator==n.operator)return r.motion="expandToLine",r.motionArgs={linewise:!0},void this.evalInput(e,t)
V(e)}r.operator=n.operator,r.operatorArgs=J(n.operatorArgs),t.visualMode&&this.evalInput(e,t)},processOperatorMotion:function(e,t,n){var r=t.visualMode,o=J(n.operatorMotionArgs)
o&&r&&o.visualLine&&(t.visualLine=!0),this.processOperator(e,t,n),r||this.processMotion(e,t,n)},processAction:function(e,t,n){var r=t.inputState,o=r.getRepeat(),i=!!o,a=J(n.actionArgs)||{}
r.selectedCharacter&&(a.selectedCharacter=r.selectedCharacter),n.operator&&this.processOperator(e,t,n),n.motion&&this.processMotion(e,t,n),(n.motion||n.operator)&&this.evalInput(e,t),a.repeat=o||1,a.repeatIsExplicit=i,a.registerName=r.registerName,V(e),t.lastMotion=null,n.isEdit&&this.recordLastEdit(t,r,n),q[n.action](e,a,t)},processSearch:function(e,t,n){if(e.getSearchCursor){var r=n.searchArgs.forward,o=n.searchArgs.wholeWordOnly
Me(e).setReversed(!r)
var i=r?"/":"?",a=Me(e).getQuery(),s=e.getScrollInfo()
switch(n.searchArgs.querySrc){case"prompt":var l=T.macroModeState
l.isPlaying?f(h=l.replaySearchQueries.shift(),!0,!1):Re(e,{onClose:function(t){e.scrollTo(s.left,s.top),f(t,!0,!0)
var n=T.macroModeState
n.isRecording&&function(e,t){if(!e.isPlaying){var n=e.latestRegister,r=T.registerController.getRegister(n)
r&&r.pushSearchQuery&&r.pushSearchQuery(t)}}(n,t)},prefix:i,desc:Te,onKeyUp:function(t,n,o){var i,a,l,c=S.keyName(t)
"Up"==c||"Down"==c?(i="Up"==c,a=t.target?t.target.selectionEnd:0,o(n=T.searchHistoryController.nextMatch(n,i)||""),a&&t.target&&(t.target.selectionEnd=t.target.selectionStart=Math.min(a,t.target.value.length))):"Left"!=c&&"Right"!=c&&"Ctrl"!=c&&"Alt"!=c&&"Shift"!=c&&T.searchHistoryController.reset()
try{l=Ie(e,n,!0,!0)}catch(t){}l?e.scrollIntoView(Be(e,!r,l),30):(Pe(e),e.scrollTo(s.left,s.top))},onKeyDown:function(t,n,r){var o=S.keyName(t)
"Esc"==o||"Ctrl-C"==o||"Ctrl-["==o||"Backspace"==o&&""==n?(T.searchHistoryController.pushInput(n),T.searchHistoryController.reset(),Ie(e,a),Pe(e),e.scrollTo(s.left,s.top),S.e_stop(t),V(e),r(),e.focus()):"Up"==o||"Down"==o?S.e_stop(t):"Ctrl-U"==o&&(S.e_stop(t),r(""))}})
break
case"wordUnderCursor":var c=fe(e,!1,!0,!1,!0),u=!0
if(c||(c=fe(e,!1,!0,!1,!1),u=!1),!c)return
var h=e.getLine(c.start.line).substring(c.start.ch,c.end.ch)
h=u&&o?"\\b"+h+"\\b":h.replace(/([.?*+$\[\]\/\\(){}|\-])/g,"\\$1"),T.jumpList.cachedCursor=e.getCursor(),e.setCursor(c.start),f(h,!0,!1)}}function f(r,o,i){T.searchHistoryController.pushInput(r),T.searchHistoryController.reset()
try{Ie(e,r,o,i)}catch(t){return Ee(e,"Invalid regex: "+r),void V(e)}_.processMotion(e,t,{type:"motion",motion:"findNext",motionArgs:{forward:!0,toJumplist:n.searchArgs.toJumplist}})}},processEx:function(e,t,n){function r(t){T.exCommandHistoryController.pushInput(t),T.exCommandHistoryController.reset(),je.processCommand(e,t)}function o(t,n,r){var o,i,a=S.keyName(t);("Esc"==a||"Ctrl-C"==a||"Ctrl-["==a||"Backspace"==a&&""==n)&&(T.exCommandHistoryController.pushInput(n),T.exCommandHistoryController.reset(),S.e_stop(t),V(e),r(),e.focus()),"Up"==a||"Down"==a?(S.e_stop(t),o="Up"==a,i=t.target?t.target.selectionEnd:0,r(n=T.exCommandHistoryController.nextMatch(n,o)||""),i&&t.target&&(t.target.selectionEnd=t.target.selectionStart=Math.min(i,t.target.value.length))):"Ctrl-U"==a?(S.e_stop(t),r("")):"Left"!=a&&"Right"!=a&&"Ctrl"!=a&&"Alt"!=a&&"Shift"!=a&&T.exCommandHistoryController.reset()}"keyToEx"==n.type?je.processCommand(e,n.exArgs.input):t.visualMode?Re(e,{onClose:r,prefix:":",value:"'<,'>",onKeyDown:o,selectValueOnOpen:!1}):Re(e,{onClose:r,prefix:":",onKeyDown:o})},evalInput:function(e,t){var n,r,o,i=t.inputState,a=i.motion,s=i.motionArgs||{},l=i.operator,c=i.operatorArgs||{},u=i.registerName,h=t.sel,f=X(t.visualMode?$(e,h.head):e.getCursor("head")),p=X(t.visualMode?$(e,h.anchor):e.getCursor("anchor")),d=X(f),g=X(p)
if(l&&this.recordLastEdit(t,i),(o=void 0!==i.repeatOverride?i.repeatOverride:i.getRepeat())>0&&s.explicitRepeat?s.repeatIsExplicit=!0:(s.noRepeat||!s.explicitRepeat&&0===o)&&(o=1,s.repeatIsExplicit=!1),i.selectedCharacter&&(s.selectedCharacter=c.selectedCharacter=i.selectedCharacter),s.repeat=o,V(e),a){var m=F[a](e,f,s,t)
if(t.lastMotion=F[a],!m)return
if(s.toJumplist){var y=T.jumpList,k=y.cachedCursor
k?(pe(e,k,m),delete y.cachedCursor):pe(e,f,m)}m instanceof Array?(r=m[0],n=m[1]):n=m,n||(n=X(f)),t.visualMode?(t.visualBlock&&n.ch===1/0||(n=$(e,n,t.visualBlock)),r&&(r=$(e,r,!0)),r=r||g,h.anchor=r,h.head=n,ce(e),ke(e,t,"<",Z(r,n)?r:n),ke(e,t,">",Z(r,n)?n:r)):l||(n=$(e,n),e.setCursor(n.line,n.ch))}if(l){if(c.lastSel){r=g
var C=c.lastSel,w=Math.abs(C.head.line-C.anchor.line),S=Math.abs(C.head.ch-C.anchor.ch)
n=C.visualLine?A(g.line+w,g.ch):C.visualBlock?A(g.line+w,g.ch+S):C.head.line==C.anchor.line?A(g.line,g.ch+S):A(g.line+w,g.ch),t.visualMode=!0,t.visualLine=C.visualLine,t.visualBlock=C.visualBlock,h=t.sel={anchor:r,head:n},ce(e)}else t.visualMode&&(c.lastSel={anchor:X(h.anchor),head:X(h.head),visualBlock:t.visualBlock,visualLine:t.visualLine})
var M,x,b,L,E
if(t.visualMode){if(M=ee(h.head,h.anchor),x=te(h.head,h.anchor),b=t.visualLine||c.linewise,E=ue(e,{anchor:M,head:x},L=t.visualBlock?"block":b?"line":"char"),b){var R=E.ranges
if("block"==L)for(var I=0;I<R.length;I++)R[I].head.ch=re(e,R[I].head.line)
else"line"==L&&(R[0].head=A(R[0].head.line+1,0))}}else{if(M=X(r||g),Z(x=X(n||d),M)){var O=M
M=x,x=O}(b=s.linewise||c.linewise)?function(e,t,n){t.ch=0,n.ch=0,n.line++}(0,M,x):s.forward&&function(e,t,n){var r=e.getRange(t,n)
if(/\n\s*$/.test(r)){var o=r.split("\n")
o.pop()
for(var i=o.pop();o.length>0&&i&&v(i);i=o.pop())n.line--,n.ch=0
i?(n.line--,n.ch=re(e,n.line)):n.ch=0}}(e,M,x),E=ue(e,{anchor:M,head:x},L="char",!s.inclusive||b)}e.setSelections(E.ranges,E.primary),t.lastMotion=null,c.repeat=o,c.registerName=u,c.linewise=b
var B=U[l](e,c,E.ranges,g,n)
t.visualMode&&he(e,null!=B),B&&e.setCursor(B)}},recordLastEdit:function(e,t,n){var r=T.macroModeState
r.isPlaying||(e.lastEditInputState=t,e.lastEditActionCommand=n,r.lastInsertModeChanges.changes=[],r.lastInsertModeChanges.expectCursorActivityForChange=!1)}},F={moveToTopLine:function(e,t,n){var r=Ke(e).top+n.repeat-1
return A(r,e.findFirstNonWhiteSpaceCharacter(r))},moveToMiddleLine:function(e){var t=Ke(e),n=Math.floor(.5*(t.top+t.bottom))
return A(n,e.findFirstNonWhiteSpaceCharacter(n))},moveToBottomLine:function(e,t,n){var r=Ke(e).bottom-n.repeat+1
return A(r,e.findFirstNonWhiteSpaceCharacter(r))},expandToLine:function(e,t,n){return A(t.line+n.repeat-1,1/0)},findNext:function(e,t,n){var r=Me(e),o=r.getQuery()
if(o){var i=!n.forward
return i=r.isReversed()?!i:i,Oe(e,o),Be(e,i,o,n.repeat)}},goToMark:function(e,t,n,r){var o=Ve(e,r,n.selectedCharacter)
return o?n.linewise?{line:o.line,ch:e.findFirstNonWhiteSpaceCharacter(o.line)}:o:null},moveToOtherHighlightedEnd:function(e,t,n,r){if(r.visualBlock&&n.sameLine){var o=r.sel
return[$(e,A(o.anchor.line,o.head.ch)),$(e,A(o.head.line,o.anchor.ch))]}return[r.sel.head,r.sel.anchor]},jumpToMark:function(e,t,n,r){for(var o=t,i=0;i<n.repeat;i++){var a=o
for(var s in r.marks)if(g(s)){var l=r.marks[s].find()
if(!((n.forward?Z(l,a):Z(a,l))||n.linewise&&l.line==a.line)){var c=Y(a,o),u=n.forward?ne(a,l,o):ne(o,l,a);(c||u)&&(o=l)}}}return n.linewise&&(o=A(o.line,e.findFirstNonWhiteSpaceCharacter(o.line))),o},moveByCharacters:function(e,t,n){var r=t,o=n.repeat,i=n.forward?r.ch+o:r.ch-o
return A(r.line,i)},moveByLines:function(e,t,n,r){var o=t,i=o.ch
switch(r.lastMotion){case this.moveByLines:case this.moveByDisplayLines:case this.moveByScroll:case this.moveToColumn:case this.moveToEol:i=r.lastHPos
break
default:r.lastHPos=i}var a=n.repeat+(n.repeatOffset||0),s=n.forward?o.line+a:o.line-a,l=e.firstLine(),c=e.lastLine()
return s<l&&o.line==l?this.moveToStartOfLine(e,t,n,r):s>c&&o.line==c?this.moveToEol(e,t,n,r):(n.toFirstChar&&(i=e.findFirstNonWhiteSpaceCharacter(s),r.lastHPos=i),r.lastHSPos=e.charCoords(A(s,i),"div").left,A(s,i))},moveByDisplayLines:function(e,t,n,r){var o=t
switch(r.lastMotion){case this.moveByDisplayLines:case this.moveByScroll:case this.moveByLines:case this.moveToColumn:case this.moveToEol:break
default:r.lastHSPos=e.charCoords(o,"div").left}var i=n.repeat
if((s=e.findPosV(o,n.forward?i:-i,"line",r.lastHSPos)).hitSide)if(n.forward)var a={top:e.charCoords(s,"div").top+8,left:r.lastHSPos},s=e.coordsChar(a,"div")
else{var l=e.charCoords(A(e.firstLine(),0),"div")
l.left=r.lastHSPos,s=e.coordsChar(l,"div")}return r.lastHPos=s.ch,s},moveByPage:function(e,t,n){var r=t,o=n.repeat
return e.findPosV(r,n.forward?o:-o,"page")},moveByParagraph:function(e,t,n){var r=n.forward?1:-1
return we(e,t,n.repeat,r)},moveBySentence:function(e,t,n){var r=n.forward?1:-1
return function(e,t,n,r){function o(e,t){if(t.pos+t.dir<0||t.pos+t.dir>=t.line.length){if(t.ln+=t.dir,!d(e,t.ln))return t.line=null,t.ln=null,void(t.pos=null)
t.line=e.getLine(t.ln),t.pos=t.dir>0?0:t.line.length-1}else t.pos+=t.dir}function i(e,t,n,r){var i=""===(c=e.getLine(t)),a={line:c,ln:t,pos:n,dir:r},s={ln:a.ln,pos:a.pos},l=""===a.line
for(o(e,a);null!==a.line;){if(s.ln=a.ln,s.pos=a.pos,""===a.line&&!l)return{ln:a.ln,pos:a.pos}
if(i&&""!==a.line&&!v(a.line[a.pos]))return{ln:a.ln,pos:a.pos}
!y(a.line[a.pos])||i||a.pos!==a.line.length-1&&!v(a.line[a.pos+1])||(i=!0),o(e,a)}var c=e.getLine(s.ln)
s.pos=0
for(var u=c.length-1;u>=0;--u)if(!v(c[u])){s.pos=u
break}return s}function a(e,t,n,r){var i={line:e.getLine(t),ln:t,pos:n,dir:r},a={ln:i.ln,pos:null},s=""===i.line
for(o(e,i);null!==i.line;){if(""===i.line&&!s)return null!==a.pos?a:{ln:i.ln,pos:i.pos}
if(y(i.line[i.pos])&&null!==a.pos&&(i.ln!==a.ln||i.pos+1!==a.pos))return a
""===i.line||v(i.line[i.pos])||(s=!1,a={ln:i.ln,pos:i.pos}),o(e,i)}var l=e.getLine(a.ln)
a.pos=0
for(var c=0;c<l.length;++c)if(!v(l[c])){a.pos=c
break}return a}for(var s={ln:t.line,pos:t.ch};n>0;)s=r<0?a(e,s.ln,s.pos,r):i(e,s.ln,s.pos,r),n--
return A(s.ln,s.pos)}(e,t,n.repeat,r)},moveByScroll:function(e,t,n,r){var o,i=e.getScrollInfo(),a=n.repeat
a||(a=Math.floor(i.clientHeight/(2*e.defaultTextHeight())))
var s=e.charCoords(t,"local")
if(n.repeat=a,!(o=F.moveByDisplayLines(e,t,n,r)))return null
var l=e.charCoords(o,"local")
return e.scrollTo(null,i.top+l.top-s.top),o},moveByWords:function(e,t,n){return function(e,t,n,r,o,i){var a=X(t),s=[];(r&&!o||!r&&o)&&n++
for(var l=!(r&&o),c=0;c<n;c++){var u=ve(e,t,r,i,l)
if(!u){var h=re(e,e.lastLine())
s.push(r?{line:e.lastLine(),from:h,to:h}:{line:0,from:0,to:0})
break}s.push(u),t=A(u.line,r?u.to-1:u.from)}var f=s.length!=n,p=s[0],d=s.pop()
return r&&!o?(f||p.from==a.ch&&p.line==a.line||(d=s.pop()),A(d.line,d.from)):r&&o?A(d.line,d.to-1):!r&&o?(f||p.to==a.ch&&p.line==a.line||(d=s.pop()),A(d.line,d.to)):A(d.line,d.from)}(e,t,n.repeat,!!n.forward,!!n.wordEnd,!!n.bigWord)},moveTillCharacter:function(e,t,n){var r=ye(e,n.repeat,n.forward,n.selectedCharacter),o=n.forward?-1:1
return de(o,n),r?(r.ch+=o,r):null},moveToCharacter:function(e,t,n){var r=n.repeat
return de(0,n),ye(e,r,n.forward,n.selectedCharacter)||t},moveToSymbol:function(e,t,n){return function(e,t,n,r){var o=X(e.getCursor()),i=n?1:-1,a=n?e.lineCount():-1,s=o.ch,l=o.line,c=e.getLine(l),u={lineText:c,nextCh:c.charAt(s),lastCh:null,index:s,symb:r,reverseSymb:(n?{")":"(","}":"{"}:{"(":")","{":"}"})[r],forward:n,depth:0,curMoveThrough:!1},h=ge[r]
if(!h)return o
var f=me[h].init,p=me[h].isComplete
for(f&&f(u);l!==a&&t;){if(u.index+=i,u.nextCh=u.lineText.charAt(u.index),!u.nextCh){if(l+=i,u.lineText=e.getLine(l)||"",i>0)u.index=0
else{var d=u.lineText.length
u.index=d>0?d-1:0}u.nextCh=u.lineText.charAt(u.index)}p(u)&&(o.line=l,o.ch=u.index,t--)}return u.nextCh||u.curMoveThrough?A(l,u.index):o}(e,n.repeat,n.forward,n.selectedCharacter)||t},moveToColumn:function(e,t,n,r){var o=n.repeat
return r.lastHPos=o-1,r.lastHSPos=e.charCoords(t,"div").left,function(e,t){var n=e.getCursor().line
return $(e,A(n,t-1))}(e,o)},moveToEol:function(e,t,n,r){var o=t
r.lastHPos=1/0
var i=A(o.line+n.repeat-1,1/0),a=e.clipPos(i)
return a.ch--,r.lastHSPos=e.charCoords(a,"div").left,i},moveToFirstNonWhiteSpaceCharacter:function(e,t){var n=t
return A(n.line,e.findFirstNonWhiteSpaceCharacter(n.line))},moveToMatchedSymbol:function(e,t){var n=t,r=n.line,o=n.ch
return o<e.getLine(r).length?e.findMatchingBracket(A(r,o)).to:n},moveToStartOfLine:function(e,t){return A(t.line,0)},moveToLineOrEdgeOfDocument:function(e,t,n){var r=n.forward?e.lastLine():e.firstLine()
return n.repeatIsExplicit&&(r=n.repeat-e.getOption("firstLineNumber")),A(r,e.findFirstNonWhiteSpaceCharacter(r))},textObjectManipulation:function(e,t,n,r){var o=n.selectedCharacter
"b"==o?o="(":"B"==o&&(o="{")
var i,a=!n.textObjectInner
if({"(":")",")":"(","{":"}","}":"{","[":"]","]":"["}[o])i=function(e,t,n,r){var o,i,a=t,s={"(":/[()]/,")":/[()]/,"[":/[[\]]/,"]":/[[\]]/,"{":/[{}]/,"}":/[{}]/}[n],l={"(":"(",")":"(","[":"[","]":"[","{":"{","}":"{"}[n],c=e.getLine(a.line).charAt(a.ch)===l?1:0
if(o=e.scanForBracket(A(a.line,a.ch+c),-1,void 0,{bracketRegex:s}),i=e.scanForBracket(A(a.line,a.ch+c),1,void 0,{bracketRegex:s}),!o||!i)return{start:a,end:a}
if(o=o.pos,i=i.pos,o.line==i.line&&o.ch>i.ch||o.line>i.line){var u=o
o=i,i=u}return r?i.ch+=1:o.ch+=1,{start:o,end:i}}(e,t,o,a)
else if({"'":!0,'"':!0}[o])i=function(e,t,n,r){var o,i,a,s,l=X(t),c=e.getLine(l.line).split(""),u=c.indexOf(n)
if(l.ch<u?l.ch=u:u<l.ch&&c[l.ch]==n&&(i=l.ch,--l.ch),c[l.ch]!=n||i)for(a=l.ch;a>-1&&!o;a--)c[a]==n&&(o=a+1)
else o=l.ch+1
if(o&&!i)for(a=o,s=c.length;a<s&&!i;a++)c[a]==n&&(i=a)
return o&&i?(r&&(--o,++i),{start:A(l.line,o),end:A(l.line,i)}):{start:l,end:l}}(e,t,o,a)
else if("W"===o)i=fe(e,a,!0,!0)
else if("w"===o)i=fe(e,a,!0,!1)
else{if("p"!==o)return null
if(i=we(e,t,n.repeat,0,a),n.linewise=!0,r.visualMode)r.visualLine||(r.visualLine=!0)
else{var s=r.inputState.operatorArgs
s&&(s.linewise=!0),i.end.line--}}return e.state.vim.visualMode?function(e,t,n){var r,o=e.state.vim.sel,i=o.head,a=o.anchor
return Z(n,t)&&(r=n,n=t,t=r),Z(i,a)?(i=ee(t,i),a=te(a,n)):(a=ee(t,a),-1==(i=Q(i=te(i,n),0,-1)).ch&&i.line!=e.firstLine()&&(i=A(i.line-1,re(e,i.line-1)))),[a,i]}(e,i.start,i.end):[i.start,i.end]},repeatLastCharacterSearch:function(e,t,n){var r=T.lastCharacterSearch,o=n.repeat,i=n.forward===r.forward,a=(r.increment?1:0)*(i?-1:1)
e.moveH(-1*a,"char"),n.inclusive=!!i
var s=ye(e,o,i,r.selectedCharacter)
return s?(s.ch+=a,s):(e.moveH(a,"char"),t)}}
function H(e,t){for(var n=[],r=0;r<t;r++)n.push(e)
return n}var U={change:function(e,t,n){var r,o,i=e.state.vim
if(T.macroModeState.lastInsertModeChanges.inVisualBlock=i.visualBlock,i.visualMode){o=e.getSelection()
var a=H("",n.length)
e.replaceSelections(a),r=ee(n[0].head,n[0].anchor)}else{var s=n[0].anchor,l=n[0].head
o=e.getRange(s,l)
var c=i.lastEditInputState||{}
if("moveByWords"==c.motion&&!v(o)){var u=/\s+$/.exec(o)
u&&c.motionArgs&&c.motionArgs.forward&&(l=Q(l,0,-u[0].length),o=o.slice(0,-u[0].length))}var h=new A(s.line-1,Number.MAX_VALUE),f=e.firstLine()==e.lastLine()
l.line>e.lastLine()&&t.linewise&&!f?e.replaceRange("",h,l):e.replaceRange("",s,l),t.linewise&&(f||(e.setCursor(h),S.commands.newlineAndIndent(e)),s.ch=Number.MAX_VALUE),r=s}T.registerController.pushText(t.registerName,"change",o,t.linewise,n.length>1),q.enterInsertMode(e,{head:r},e.state.vim)},delete:function(e,t,n){var r,o
e.pushUndoStop()
var i=e.state.vim
if(i.visualBlock){o=e.getSelection()
var a=H("",n.length)
e.replaceSelections(a),r=n[0].anchor}else{var s=n[0].anchor,l=n[0].head
t.linewise&&l.line!=e.firstLine()&&s.line==e.lastLine()&&s.line==l.line-1&&(s.line==e.firstLine()?s.ch=0:s=A(s.line-1,re(e,s.line-1))),o=e.getRange(s,l),e.replaceRange("",s,l),r=s,t.linewise&&(r=F.moveToFirstNonWhiteSpaceCharacter(e,s))}return T.registerController.pushText(t.registerName,"delete",o,t.linewise,i.visualBlock),$(e,r,i.insertMode)},indent:function(e,t,n){var r=e.state.vim,o=n[0].anchor.line,i=r.visualBlock?n[n.length-1].anchor.line:n[0].head.line,a=r.visualMode?t.repeat:1
t.linewise&&i--,e.pushUndoStop()
for(var s=o;s<=i;s++)for(var l=0;l<a;l++)e.indentLine(s,t.indentRight)
return e.pushUndoStop(),F.moveToFirstNonWhiteSpaceCharacter(e,n[0].anchor)},changeCase:function(e,t,n,r,o){for(var i=e.getSelections(),a=[],s=t.toLower,l=0;l<i.length;l++){var c=i[l],u=""
if(!0===s)u=c.toLowerCase()
else if(!1===s)u=c.toUpperCase()
else for(var h=0;h<c.length;h++){var f=c.charAt(h)
u+=m(f)?f.toLowerCase():f.toUpperCase()}a.push(u)}return e.replaceSelections(a),t.shouldMoveCursor?o:!e.state.vim.visualMode&&t.linewise&&n[0].anchor.line+1==n[0].head.line?F.moveToFirstNonWhiteSpaceCharacter(e,r):t.linewise?r:ee(n[0].anchor,n[0].head)},yank:function(e,t,n,r){var o=e.state.vim,i=e.getSelection(),a=o.visualMode?ee(o.sel.anchor,o.sel.head,n[0].head,n[0].anchor):r
return T.registerController.pushText(t.registerName,"yank",i,t.linewise,o.visualBlock),a}},q={jumpListWalk:function(e,t,n){if(!n.visualMode){var r=t.repeat,o=t.forward,i=T.jumpList.move(e,o?r:-r),a=i?i.find():void 0
a=a||e.getCursor(),e.setCursor(a)}},scroll:function(e,t,n){if(!n.visualMode){var r=t.repeat||1,o=e.defaultTextHeight(),i=e.getScrollInfo().top,a=o*r,s=t.forward?i+a:i-a,l=X(e.getCursor()),c=e.charCoords(l,"local")
if(t.forward)s>c.top?(l.line+=(s-c.top)/o,l.line=Math.ceil(l.line),e.setCursor(l),c=e.charCoords(l,"local"),e.scrollTo(null,c.top)):e.scrollTo(null,s)
else{var u=s+e.getScrollInfo().clientHeight
u<c.bottom?(l.line-=(c.bottom-u)/o,l.line=Math.floor(l.line),e.setCursor(l),c=e.charCoords(l,"local"),e.scrollTo(null,c.bottom-e.getScrollInfo().clientHeight)):e.scrollTo(null,s)}}},scrollToCursor:function(e,t){e.moveCurrentLineTo(t.position)},replayMacro:function(e,t,n){var r=t.selectedCharacter,o=t.repeat,i=T.macroModeState
for("@"==r&&(r=i.latestRegister);o--;)He(e,n,i,r)},enterMacroRecordMode:function(e,t){var n=T.macroModeState,r=t.selectedCharacter
T.registerController.isValidRegister(r)&&n.enterMacroRecordMode(e,r)},toggleOverwrite:function(e){e.replaceMode?(e.toggleOverwrite(!1),e.setOption("keyMap","vim-insert"),S.signal(e,"vim-mode-change",{mode:"insert"})):(e.toggleOverwrite(!0),e.setOption("keyMap","vim-replace"),S.signal(e,"vim-mode-change",{mode:"replace"}))},enterInsertMode:function(e,t,n){if(!e.getOption("readOnly")){n.insertMode=!0,n.insertModeRepeat=t&&t.repeat||1,e.leaveVimMode()
var r=t?t.insertAt:null,o=n.sel,i=t.head||e.getCursor("head"),a=e.listSelections().length
if("eol"==r)i=A(i.line,re(e,i.line))
else if("charAfter"==r)i=Q(i,0,1)
else if("firstNonBlank"==r)i=F.moveToFirstNonWhiteSpaceCharacter(e,i)
else if("startOfSelectedArea"==r)n.visualBlock?(i=A(Math.min(o.head.line,o.anchor.line),Math.min(o.head.ch,o.anchor.ch)),a=Math.abs(o.head.line-o.anchor.line)+1):i=o.head.line<o.anchor.line?o.head:A(o.anchor.line,0)
else if("endOfSelectedArea"==r)n.visualBlock?(i=A(Math.min(o.head.line,o.anchor.line),Math.max(o.head.ch+1,o.anchor.ch)),a=Math.abs(o.head.line-o.anchor.line)+1):i=o.head.line>=o.anchor.line?Q(o.head,0,1):A(o.anchor.line,0)
else if("inplace"==r&&n.visualMode)return
e.setOption("disableInput",!1),n.visualMode&&he(e),t&&t.replace?(e.toggleOverwrite(!0),e.setOption("keyMap","vim-replace"),S.signal(e,"vim-mode-change",{mode:"replace"})):(e.toggleOverwrite(!1),e.setOption("keyMap","vim-insert"),S.signal(e,"vim-mode-change",{mode:"insert"})),T.macroModeState.isPlaying||(e.on("change",Ue),S.on(e.getInputField(),"keydown",Qe)),se(e,i,a)}},toggleVisualMode:function(e,t,n){var r,o=t.repeat,i=e.getCursor()
n.visualMode?n.visualLine^t.linewise||n.visualBlock^t.blockwise?(n.visualLine=!!t.linewise,n.visualBlock=!!t.blockwise,S.signal(e,"vim-mode-change",{mode:"visual",subMode:n.visualLine?"linewise":n.visualBlock?"blockwise":""}),ce(e)):he(e):(n.visualMode=!0,n.visualLine=!!t.linewise,n.visualBlock=!!t.blockwise,r=$(e,A(i.line,i.ch+o-1),!0),n.sel={anchor:i,head:r},S.signal(e,"vim-mode-change",{mode:"visual",subMode:n.visualLine?"linewise":n.visualBlock?"blockwise":""}),ce(e),ke(e,n,"<",ee(i,r)),ke(e,n,">",te(i,r)))},reselectLastSelection:function(e,t,n){var r=n.lastSelection
if(n.visualMode&&le(e,n),r){var o=r.anchorMark.find(),i=r.headMark.find()
if(!o||!i)return
n.sel={anchor:o,head:i},n.visualMode=!0,n.visualLine=r.visualLine,n.visualBlock=r.visualBlock,ce(e),ke(e,n,"<",ee(o,i)),ke(e,n,">",te(o,i)),S.signal(e,"vim-mode-change",{mode:"visual",subMode:n.visualLine?"linewise":n.visualBlock?"blockwise":""})}},joinLines:function(e,t,n){var r,o
if(n.visualMode){if(r=e.getCursor("anchor"),Z(o=e.getCursor("head"),r)){var i=o
o=r,r=i}o.ch=re(e,o.line)-1}else{var a=Math.max(t.repeat,2)
r=e.getCursor(),o=$(e,A(r.line+a-1,1/0))}for(var s=0,l=r.line;l<o.line;l++){s=re(e,r.line),i=A(r.line+1,re(e,r.line+1))
var c=e.getRange(r,i)
c=c.replace(/\n\s*/g," "),e.replaceRange(c,r,i)}var u=A(r.line,s)
n.visualMode&&he(e,!1),e.setCursor(u)},newLineAndEnterInsertMode:function(e,t,n){n.insertMode=!0
var r=X(e.getCursor())
r.line!==e.firstLine()||t.after?(r.line=t.after?r.line:r.line-1,r.ch=re(e,r.line),e.setCursor(r),(S.commands.newlineAndIndentContinueComment||S.commands.newlineAndIndent)(e)):(e.replaceRange("\n",A(e.firstLine(),0)),e.setCursor(e.firstLine(),0)),this.enterInsertMode(e,{repeat:t.repeat},n)},paste:function(e,t,n){var r=X(e.getCursor()),o=T.registerController.getRegister(t.registerName)
if(f=o.toString()){if(t.matchIndent){var i=e.getOption("tabSize"),a=function(e){var t=e.split("\t").length-1,n=e.split(" ").length-1
return t*i+1*n},s=e.getLine(e.getCursor().line),l=a(s.match(/^\s*/)[0]),c=f.replace(/\n$/,""),u=f!==c,h=a(f.match(/^\s*/)[0]),f=c.replace(/^\s*/gm,(function(t){var n=l+(a(t)-h)
if(n<0)return""
if(e.getOption("indentWithTabs")){var r=Math.floor(n/i)
return Array(r+1).join("\t")}return Array(n+1).join(" ")}))
f+=u?"\n":""}t.repeat>1&&(f=Array(t.repeat+1).join(f))
var p,d,g=o.linewise,m=o.blockwise
if(g)n.visualMode?f=n.visualLine?f.slice(0,-1):"\n"+f.slice(0,f.length-1)+"\n":t.after?(f="\n"+f.slice(0,f.length-1),r.ch=re(e,r.line)):r.ch=0
else{if(m){f=f.split("\n")
for(var v=0;v<f.length;v++)f[v]=""==f[v]?" ":f[v]}r.ch+=t.after?1:0}if(n.visualMode){var y
n.lastPastedText=f
var k=function(e,t){var n=t.lastSelection
return t.visualMode?function(){var t=e.listSelections(),n=t[0],r=t[t.length-1]
return[Z(n.anchor,n.head)?n.anchor:n.head,Z(r.anchor,r.head)?r.head:r.anchor]}():function(){var t=e.getCursor(),r=e.getCursor(),o=n.visualBlock
if(o){var i=o.width,a=o.height
r=A(t.line+a,t.ch+i)
for(var s=[],l=t.line;l<r.line;l++){var c={anchor:A(l,t.ch),head:A(l,r.ch)}
s.push(c)}e.setSelections(s)}else{var u=n.anchorMark.find(),h=n.headMark.find(),f=h.line-u.line,p=h.ch-u.ch
r={line:r.line+f,ch:f?r.ch:p+r.ch},n.visualLine&&(t=A(t.line,0),r=A(r.line,re(e,r.line))),e.setSelection(t,r)}return[t,r]}()}(e,n),C=k[0],w=k[1],S=e.getSelection(),M=e.listSelections(),x=new Array(M.length).join("1").split("1")
n.lastSelection&&(y=n.lastSelection.headMark.find()),T.registerController.unnamedRegister.setText(S),m?(e.replaceSelections(x),w=A(C.line+f.length-1,C.ch),e.setCursor(C),ae(e,w),e.replaceSelections(f),p=C):n.visualBlock?(e.replaceSelections(x),e.setCursor(C),e.replaceRange(f,C,C),p=C):(e.replaceRange(f,C,w),p=e.posFromIndex(e.indexFromPos(C)+f.length-1)),y&&(n.lastSelection.headMark=e.setBookmark(y)),g&&(p.ch=0)}else if(m){for(e.setCursor(r),v=0;v<f.length;v++){var b=r.line+v
b>e.lastLine()&&e.replaceRange("\n",A(b,0)),re(e,b)<r.ch&&ie(e,b,r.ch)}e.setCursor(r),ae(e,A(r.line+f.length-1,r.ch)),e.replaceSelections(f),p=r}else e.replaceRange(f,r),g&&t.after?p=A(r.line+1,e.findFirstNonWhiteSpaceCharacter(r.line+1)):g&&!t.after?p=A(r.line,e.findFirstNonWhiteSpaceCharacter(r.line)):!g&&t.after?(d=e.indexFromPos(r),p=e.posFromIndex(d+f.length-1)):(d=e.indexFromPos(r),p=e.posFromIndex(d+f.length))
n.visualMode&&he(e,!1),e.setCursor(p)}},undo:function(e,t){e.operation((function(){G(e,S.commands.undo,t.repeat)(),e.setCursor(e.getCursor("anchor"))}))},redo:function(e,t){G(e,S.commands.redo,t.repeat)()},setRegister:function(e,t,n){n.inputState.registerName=t.selectedCharacter},setMark:function(e,t,n){ke(e,n,t.selectedCharacter,e.getCursor())},replace:function(e,t,n){var r,o,i=t.selectedCharacter,a=e.getCursor(),s=e.listSelections()
if(n.visualMode)a=e.getCursor("start"),o=e.getCursor("end")
else{var l=e.getLine(a.line);(r=a.ch+t.repeat)>l.length&&(r=l.length),o=A(a.line,r)}if("\n"==i)n.visualMode||e.replaceRange("",a,o),(S.commands.newlineAndIndentContinueComment||S.commands.newlineAndIndent)(e)
else{var c=e.getRange(a,o)
if(c=c.replace(/[^\n]/g,i),n.visualBlock){var u=new Array(e.getOption("tabSize")+1).join(" ")
c=(c=e.getSelection()).replace(/\t/g,u).replace(/[^\n]/g,i).split("\n"),e.replaceSelections(c)}else e.replaceRange(c,a,o)
n.visualMode?(a=Z(s[0].anchor,s[0].head)?s[0].anchor:s[0].head,e.setCursor(a),he(e,!1)):e.setCursor(Q(o,0,-1))}},incrementNumberToken:function(e,t){for(var n,r,o,i,a=e.getCursor(),s=e.getLine(a.line),l=/(-?)(?:(0x)([\da-f]+)|(0b|0|)(\d+))/gi;null!==(n=l.exec(s))&&(o=(r=n.index)+n[0].length,!(a.ch<o)););if((t.backtrack||!(o<=a.ch))&&n){var c=n[2]||n[4],u=n[3]||n[5],h=t.increase?1:-1,f={"0b":2,0:8,"":10,"0x":16}[c.toLowerCase()]
i=(parseInt(n[1]+u,f)+h*t.repeat).toString(f)
var p=c?new Array(u.length-i.length+1+n[1].length).join("0"):""
i="-"===i.charAt(0)?"-"+c+p+i.substr(1):c+p+i
var d=A(a.line,r),g=A(a.line,o)
e.replaceRange(i,d,g),e.setCursor(A(a.line,r+i.length-1))}},repeatLastEdit:function(e,t,n){if(n.lastEditInputState){var r=t.repeat
r&&t.repeatIsExplicit?n.lastEditInputState.repeatOverride=r:r=n.lastEditInputState.repeatOverride||r,ze(e,n,r,!1)}},indent:function(e,t){e.indentLine(e.getCursor().line,t.indentRight)},exitInsertMode:_e}
function $(e,t,n){var r=Math.min(Math.max(e.firstLine(),t.line),e.lastLine()),o=re(e,r)-1
o=n?o+1:o
var i=Math.min(Math.max(0,t.ch),o)
return A(r,i)}function J(e){var t={}
for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])
return t}function Q(e,t,n){return"object"===M(t)&&(n=t.ch,t=t.line),A(e.line+t,e.ch+n)}function z(e,t){if("<character>"==t.slice(-11)){var n=t.length-11,r=e.slice(0,n),o=t.slice(0,n)
return r==o&&e.length>n?"full":0==o.indexOf(r)&&"partial"}return e==t?"full":0==t.indexOf(e)&&"partial"}function G(e,t,n){return function(){for(var r=0;r<n;r++)t(e)}}function X(e){return A(e.line,e.ch)}function Y(e,t){return e.ch==t.ch&&e.line==t.line}function Z(e,t){return e.line<t.line||e.line==t.line&&e.ch<t.ch}function ee(e,t){return arguments.length>2&&(t=ee.apply(void 0,Array.prototype.slice.call(arguments,1))),Z(e,t)?e:t}function te(e,t){return arguments.length>2&&(t=te.apply(void 0,Array.prototype.slice.call(arguments,1))),Z(e,t)?t:e}function ne(e,t,n){var r=Z(e,t),o=Z(t,n)
return r&&o}function re(e,t){return e.getLine(t).length}function oe(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function ie(e,t,n){var r=re(e,t),o=new Array(n-r+1).join(" ")
e.setCursor(A(t,r)),e.replaceRange(o,e.getCursor())}function ae(e,t){var n=[],r=e.listSelections(),o=X(e.clipPos(t)),i=!Y(t,o),a=function(e,t,n){for(var r=0;r<e.length;r++){var o=Y(e[r].anchor,t),i=Y(e[r].head,t)
if(o||i)return r}return-1}(r,e.getCursor("head")),s=Y(r[a].head,r[a].anchor),l=r.length-1,c=l-a>a?l:0,u=r[c].anchor,h=Math.min(u.line,o.line),f=Math.max(u.line,o.line),p=u.ch,d=o.ch,g=r[c].head.ch-p,m=d-p
g>0&&m<=0?(p++,i||d--):g<0&&m>=0?(p--,s||d++):g<0&&-1==m&&(p--,d++)
for(var v=h;v<=f;v++){var y={anchor:new A(v,p),head:new A(v,d)}
n.push(y)}return e.setSelections(n),t.ch=d,u.ch=p,u}function se(e,t,n){for(var r=[],o=0;o<n;o++){var i=Q(t,o,0)
r.push({anchor:i,head:i})}e.setSelections(r,0)}function le(e,t){var n=t.sel.anchor,r=t.sel.head
t.lastPastedText&&(r=e.posFromIndex(e.indexFromPos(n)+t.lastPastedText.length),t.lastPastedText=null),t.lastSelection={anchorMark:e.setBookmark(n),headMark:e.setBookmark(r),anchor:X(n),head:X(r),visualMode:t.visualMode,visualLine:t.visualLine,visualBlock:t.visualBlock}}function ce(e,t,n){var r=e.state.vim,o=ue(e,t=t||r.sel,n=n||r.visualLine?"line":r.visualBlock?"block":"char",r.visualMode&&"char"===n)
e.setSelections(o.ranges,o.primary),$e(e)}function ue(e,t,n,r){var o=X(t.head),i=X(t.anchor)
if("char"==n){var a=r||Z(t.head,t.anchor)?0:1,s=Z(t.head,t.anchor)?1:0
return o=Q(t.head,0,a),{ranges:[{anchor:i=Q(t.anchor,0,s),head:o}],primary:0}}if("line"==n){if(Z(t.head,t.anchor))o.ch=0,i.ch=re(e,i.line)
else{i.ch=0
var l=e.lastLine()
o.line>l&&(o.line=l),o.ch=re(e,o.line)}return{ranges:[{anchor:i,head:o}],primary:0}}if("block"==n){for(var c=Math.min(i.line,o.line),u=Math.min(i.ch,o.ch),h=Math.max(i.line,o.line),f=Math.max(i.ch,o.ch)+1,p=h-c+1,d=o.line==c?0:p-1,g=[],m=0;m<p;m++)g.push({anchor:A(c+m,u),head:A(c+m,f)})
return{ranges:g,primary:d}}}function he(e,t){var n=e.state.vim
!1!==t&&e.setCursor($(e,n.sel.head)),le(e,n),n.visualMode=!1,n.visualLine=!1,n.visualBlock=!1,S.signal(e,"vim-mode-change",{mode:"normal"}),n.fakeCursor&&n.fakeCursor.clear()}function fe(e,t,n,r,o){for(var i=function(e){var t=e.getCursor("head")
return 1==e.getSelection().length&&(t=ee(t,e.getCursor("anchor"))),t}(e),l=e.getLine(i.line),c=i.ch,u=o?a[0]:s[0];!u(l.charAt(c));)if(++c>=l.length)return null
r?u=s[0]:(u=a[0])(l.charAt(c))||(u=a[1])
for(var h=c,f=c;u(l.charAt(h))&&h<l.length;)h++
for(;u(l.charAt(f))&&f>=0;)f--
if(f++,t){for(var p=h;/\s/.test(l.charAt(h))&&h<l.length;)h++
if(p==h){for(var d=f;/\s/.test(l.charAt(f-1))&&f>0;)f--
f||(f=d)}}return{start:A(i.line,f),end:A(i.line,h)}}function pe(e,t,n){Y(t,n)||T.jumpList.add(e,t,n)}function de(e,t){T.lastCharacterSearch.increment=e,T.lastCharacterSearch.forward=t.forward,T.lastCharacterSearch.selectedCharacter=t.selectedCharacter}var ge={"(":"bracket",")":"bracket","{":"bracket","}":"bracket","[":"section","]":"section","*":"comment","/":"comment",m:"method",M:"method","#":"preprocess"},me={bracket:{isComplete:function(e){if(e.nextCh===e.symb){if(e.depth++,e.depth>=1)return!0}else e.nextCh===e.reverseSymb&&e.depth--
return!1}},section:{init:function(e){e.curMoveThrough=!0,e.symb=(e.forward?"]":"[")===e.symb?"{":"}"},isComplete:function(e){return 0===e.index&&e.nextCh===e.symb}},comment:{isComplete:function(e){var t="*"===e.lastCh&&"/"===e.nextCh
return e.lastCh=e.nextCh,t}},method:{init:function(e){e.symb="m"===e.symb?"{":"}",e.reverseSymb="{"===e.symb?"}":"{"},isComplete:function(e){return e.nextCh===e.symb}},preprocess:{init:function(e){e.index=0},isComplete:function(e){if("#"===e.nextCh){var t=e.lineText.match(/#(\w+)/)[1]
if("endif"===t){if(e.forward&&0===e.depth)return!0
e.depth++}else if("if"===t){if(!e.forward&&0===e.depth)return!0
e.depth--}if("else"===t&&0===e.depth)return!0}return!1}}}
function ve(e,t,n,r,o){var i=t.line,l=t.ch,c=e.getLine(i),u=n?1:-1,h=r?s:a
if(o&&""==c){if(i+=u,c=e.getLine(i),!d(e,i))return null
l=n?0:c.length}for(;;){if(o&&""==c)return{from:0,to:0,line:i}
for(var f=u>0?c.length:-1,p=f,g=f;l!=f;){for(var m=!1,v=0;v<h.length&&!m;++v)if(h[v](c.charAt(l))){for(p=l;l!=f&&h[v](c.charAt(l));)l+=u
if(m=p!=(g=l),p==t.ch&&i==t.line&&g==p+u)continue
return{from:Math.min(p,g+1),to:Math.max(p,g),line:i}}m||(l+=u)}if(!d(e,i+=u))return null
c=e.getLine(i),l=u>0?0:c.length}}function ye(e,t,n,r){for(var o,i=e.getCursor(),a=i.ch,s=0;s<t;s++){if(-1==(o=Ce(a,e.getLine(i.line),r,n,!0)))return null
a=o}return A(e.getCursor().line,o)}function ke(e,t,n,r){k(n,f)&&(t.marks[n]&&t.marks[n].clear(),t.marks[n]=e.setBookmark(r))}function Ce(e,t,n,r,o){var i
return r?-1==(i=t.indexOf(n,e+1))||o||(i-=1):-1==(i=t.lastIndexOf(n,e-1))||o||(i+=1),i}function we(e,t,n,r,o){var i,a=t.line,s=e.firstLine(),l=e.lastLine(),c=a
function u(t){return!e.getLine(t)}function h(e,t,n){return n?u(e)!=u(e+t):!u(e)&&u(e+t)}if(r){for(;s<=c&&c<=l&&n>0;)h(c,r)&&n--,c+=r
return new A(c,0)}var f=e.state.vim
if(f.visualLine&&h(a,1,!0)){var p=f.sel.anchor
h(p.line,-1,!0)&&(o&&p.line==a||(a+=1))}var d=u(a)
for(c=a;c<=l&&n;c++)h(c,1,!0)&&(o&&u(c)==d||n--)
for(i=new A(c,0),c>l&&!d?d=!0:o=!1,c=a;c>s&&(o&&u(c)!=d&&c!=a||!h(c,-1,!0));c--);return{start:new A(c,0),end:i}}function Se(){}function Me(e){var t=e.state.vim
return t.searchState_||(t.searchState_=new Se)}function xe(e,t){var n=be(e,t)||[]
if(!n.length)return[]
var r=[]
if(0===n[0]){for(var o=0;o<n.length;o++)"number"==typeof n[o]&&r.push(e.substring(n[o]+1,n[o+1]))
return r}}function be(e,t){t||(t="/")
for(var n=!1,r=[],o=0;o<e.length;o++){var i=e.charAt(o)
n||i!=t||r.push(o),n=!n&&"\\"==i}return r}w("pcre",!0,"boolean"),Se.prototype={getQuery:function(){return T.query},setQuery:function(e){T.query=e},getOverlay:function(){return this.searchOverlay},setOverlay:function(e){this.searchOverlay=e},isReversed:function(){return T.isReversed},setReversed:function(e){T.isReversed=e},getScrollbarAnnotate:function(){return this.annotate},setScrollbarAnnotate:function(e){this.annotate=e}}
var Ae={"\\n":"\n","\\r":"\r","\\t":"\t"},Le={"\\/":"/","\\\\":"\\","\\n":"\n","\\r":"\r","\\t":"\t"}
function Ee(e,t){e.openNotification?e.openNotification('<span style="color: red">'+t+"</span>",{bottom:!0,duration:5e3}):alert(t)}var Te="(Javascript regexp)"
function Re(e,t){var n,r,o=(t.prefix||"")+" "+(t.desc||"");(function(e,t,n,r,o){e.openDialog?e.openDialog(t,r,{bottom:!0,value:o.value,onKeyDown:o.onKeyDown,onKeyUp:o.onKeyUp,selectValueOnOpen:!1}):r(prompt(n,""))})(e,(r='<span style="font-family: monospace; white-space: pre">'+(t.prefix||"")+'<input type="text"></span>',(n=t.desc)&&(r+=' <span style="color: #888">'+n+"</span>"),r),o,t.onClose,t)}function Ie(e,t,n,r){if(t){var o=Me(e),i=function(e,t,n){if(T.registerController.getRegister("/").setText(e),e instanceof RegExp)return e
var r,o,i=be(e,"/")
return i.length?(r=e.substring(0,i[0]),o=-1!=e.substring(i[0]).indexOf("i")):r=e,r?(E("pcre")||(r=function(e){for(var t=!1,n=[],r=-1;r<e.length;r++){var o=e.charAt(r)||"",i=e.charAt(r+1)||"",a=i&&-1!="|(){".indexOf(i)
t?("\\"===o&&a||n.push(o),t=!1):"\\"===o?(t=!0,i&&-1!="}".indexOf(i)&&(a=!0),a&&"\\"!==i||n.push(o)):(n.push(o),a&&"\\"!==i&&n.push("\\"))}return n.join("")}(r)),n&&(t=/^[^A-Z]*$/.test(r)),new RegExp(r,t||o?"i":void 0)):null}(t,!!n,!!r)
if(i)return Oe(e,i),function(e,t){if(e instanceof RegExp&&t instanceof RegExp){for(var n=["global","multiline","ignoreCase","source"],r=0;r<n.length;r++){var o=n[r]
if(e[o]!==t[o])return!1}return!0}return!1}(i,o.getQuery())||o.setQuery(i),i}}function Oe(e,t){var n=Me(e),r=n.getOverlay()
r&&t==r.query||(r&&e.removeOverlay(r),r=function(e){if("^"==e.source.charAt(0))var t=!0
return{token:function(n){if(!t||n.sol()){var r=n.match(e,!1)
if(r)return 0==r[0].length?(n.next(),"searching"):n.sol()||(n.backUp(1),e.exec(n.next()+r[0]))?(n.match(e),"searching"):(n.next(),null)
for(;!n.eol()&&(n.next(),!n.match(e,!1)););}else n.skipToEnd()},query:e}}(t),e.addOverlay(r),e.showMatchesOnScrollbar&&(n.getScrollbarAnnotate()&&n.getScrollbarAnnotate().clear(),n.setScrollbarAnnotate(e.showMatchesOnScrollbar(t))),n.setOverlay(r))}function Be(e,t,n,r){return void 0===r&&(r=1),e.operation((function(){for(var o=e.getCursor(),i=e.getSearchCursor(n,o),a=0;a<r;a++){var s=i.find(t)
if(0==a&&s&&Y(i.from(),o)&&(s=i.find(t)),!s&&!(i=e.getSearchCursor(n,t?A(e.lastLine()):A(e.firstLine(),0))).find(t))return}return i.from()}))}function Pe(e){var t=Me(e)
e.removeOverlay(Me(e).getOverlay()),t.setOverlay(null),t.getScrollbarAnnotate()&&(t.getScrollbarAnnotate().clear(),t.setScrollbarAnnotate(null))}function Ne(e,t,n){return"number"!=typeof e&&(e=e.line),t instanceof Array?k(e,t):n?e>=t&&e<=n:e==t}function Ke(e){return e.getUserVisibleLines()}function Ve(e,t,n){if("'"==n){var r=e.doc.history.done,o=r[r.length-2]
return o&&o.ranges&&o.ranges[0].head}if("."==n){if(0==e.doc.history.lastModTime)return
var i=e.doc.history.done.filter((function(e){if(void 0!==e.changes)return e}))
return i.reverse(),i[0].changes[0].to}var a=t.marks[n]
return a&&a.find()}var We=function(){this.buildCommandMap_()}
We.prototype={processCommand:function(e,t,n){var r=this
e.operation((function(){e.curOp.isVimOp=!0,r._processCommand(e,t,n)}))},_processCommand:function(e,t,n){var r=e.state.vim,o=T.registerController.getRegister(":"),i=o.toString()
r.visualMode&&he(e)
var a=new S.StringStream(t)
o.setText(t)
var s,l,c=n||{}
c.input=t
try{this.parseInput_(e,a,c)}catch(t){throw Ee(e,t),t}if(c.commandName){if(s=this.matchCommand_(c.commandName)){if(l=s.name,s.excludeFromCommandHistory&&o.setText(i),this.parseCommandArgs_(a,c,s),"exToKey"==s.type){for(var u=0;u<s.toKeys.length;u++)S.Vim.handleKey(e,s.toKeys[u],"mapping")
return}if("exToEx"==s.type)return void this.processCommand(e,s.toInput)}}else void 0!==c.line&&(l="move")
if(l)try{De[l](e,c),s&&s.possiblyAsync||!c.callback||c.callback()}catch(t){throw Ee(e,t),t}else Ee(e,'Not an editor command ":'+t+'"')},parseInput_:function(e,t,n){t.eatWhile(":"),t.eat("%")?(n.line=e.firstLine(),n.lineEnd=e.lastLine()):(n.line=this.parseLineSpec_(e,t),void 0!==n.line&&t.eat(",")&&(n.lineEnd=this.parseLineSpec_(e,t)))
var r=t.match(/^(\w+)/)
return n.commandName=r?r[1]:t.match(/.*/)[0],n},parseLineSpec_:function(e,t){var n=t.match(/^(\d+)/)
if(n)return parseInt(n[1],10)-1
switch(t.next()){case".":return this.parseLineSpecOffset_(t,e.getCursor().line)
case"$":return this.parseLineSpecOffset_(t,e.lastLine())
case"'":var r=t.next(),o=Ve(e,e.state.vim,r)
if(!o)throw new Error("Mark not set")
return this.parseLineSpecOffset_(t,o.line)
case"-":case"+":return t.backUp(1),this.parseLineSpecOffset_(t,e.getCursor().line)
default:return void t.backUp(1)}},parseLineSpecOffset_:function(e,t){var n=e.match(/^([+-])?(\d+)/)
if(n){var r=parseInt(n[2],10)
"-"==n[1]?t-=r:t+=r}return t},parseCommandArgs_:function(e,t,n){if(!e.eol()){t.argString=e.match(/.*/)[0]
var r=n.argDelimiter||/\s+/,o=oe(t.argString).split(r)
o.length&&o[0]&&(t.args=o)}},matchCommand_:function(e){for(var t=e.length;t>0;t--){var n=e.substring(0,t)
if(this.commandMap_[n]){var r=this.commandMap_[n]
if(0===r.name.indexOf(e))return r}}return null},buildCommandMap_:function(){this.commandMap_={}
for(var e=0;e<b.length;e++){var t=b[e],n=t.shortName||t.name
this.commandMap_[n]=t}},map:function(e,t,n){if(":"!=e&&":"==e.charAt(0)){if(n)throw Error("Mode not supported for ex mappings")
var r=e.substring(1)
":"!=t&&":"==t.charAt(0)?this.commandMap_[r]={name:r,type:"exToEx",toInput:t.substring(1),user:!0}:this.commandMap_[r]={name:r,type:"exToKey",toKeys:t,user:!0}}else if(":"!=t&&":"==t.charAt(0)){var o={keys:e,type:"keyToEx",exArgs:{input:t.substring(1)}}
n&&(o.context=n),x.unshift(o)}else o={keys:e,type:"keyToKey",toKeys:t},n&&(o.context=n),x.unshift(o)},unmap:function(e,t){if(":"!=e&&":"==e.charAt(0)){if(t)throw Error("Mode not supported for ex mappings")
var n=e.substring(1)
if(this.commandMap_[n]&&this.commandMap_[n].user)return void delete this.commandMap_[n]}else for(var r=e,o=0;o<x.length;o++)if(r==x[o].keys&&x[o].context===t)return void x.splice(o,1)
throw Error("No such mapping.")}}
var De={colorscheme:function(e,t){!t.args||t.args.length<1?Ee(e,e.getOption("theme")):e.setOption("theme",t.args[0])},map:function(e,t,n){var r=t.args
!r||r.length<2?e&&Ee(e,"Invalid mapping: "+t.input):je.map(r[0],r[1],n)},imap:function(e,t){this.map(e,t,"insert")},nmap:function(e,t){this.map(e,t,"normal")},vmap:function(e,t){this.map(e,t,"visual")},unmap:function(e,t,n){var r=t.args
!r||r.length<1?e&&Ee(e,"No such mapping: "+t.input):je.unmap(r[0],n)},move:function(e,t){_.processCommand(e,e.state.vim,{type:"motion",motion:"moveToLineOrEdgeOfDocument",motionArgs:{forward:!1,explicitRepeat:!0,linewise:!0},repeatOverride:t.line+1})},set:function(e,t){var n=t.args,r=t.setCfg||{}
if(!n||n.length<1)e&&Ee(e,"Invalid mapping: "+t.input)
else{var o=n[0].split("="),i=o[0],a=o[1],s=!1
if("?"==i.charAt(i.length-1)){if(a)throw Error("Trailing characters: "+t.argString)
i=i.substring(0,i.length-1),s=!0}void 0===a&&"no"==i.substring(0,2)&&(i=i.substring(2),a=!1)
var l=C[i]&&"boolean"==C[i].type
if(l&&null==a&&(a=!0),!l&&void 0===a||s){var c=E(i,e,r)
c instanceof Error?Ee(e,c.message):Ee(e,!0===c||!1===c?" "+(c?"":"no")+i:"  "+i+"="+c)}else{var u=L(i,a,e,r)
u instanceof Error&&Ee(e,u.message)}}},setlocal:function(e,t){t.setCfg={scope:"local"},this.set(e,t)},setglobal:function(e,t){t.setCfg={scope:"global"},this.set(e,t)},registers:function(e,t){var n=t.args,r=T.registerController.registers,o="----------Registers----------<br><br>"
if(n){n=n.join("")
for(var i=0;i<n.length;i++)a=n.charAt(i),T.registerController.isValidRegister(a)&&(o+='"'+a+"    "+(r[a]||new W).toString()+"<br>")}else for(var a in r){var s=r[a].toString()
s.length&&(o+='"'+a+"    "+s+"<br>")}Ee(e,o)},sort:function(e,t){var n,r,o,i,a,s=function(){if(t.argString){var e=new S.StringStream(t.argString)
if(e.eat("!")&&(n=!0),e.eol())return
if(!e.eatSpace())return"Invalid arguments"
var s=e.match(/([dinuox]+)?\s*(\/.+\/)?\s*/)
if(!s&&!e.eol())return"Invalid arguments"
if(s[1]){r=-1!=s[1].indexOf("i"),o=-1!=s[1].indexOf("u")
var l=-1!=s[1].indexOf("d")||-1!=s[1].indexOf("n")&&1,c=-1!=s[1].indexOf("x")&&1,u=-1!=s[1].indexOf("o")&&1
if(l+c+u>1)return"Invalid arguments"
i=(l?"decimal":c&&"hex")||u&&"octal"}s[2]&&(a=new RegExp(s[2].substr(1,s[2].length-2),r?"i":""))}}()
if(s)Ee(e,s+": "+t.argString)
else{var l=t.line||e.firstLine(),c=t.lineEnd||t.line||e.lastLine()
if(l!=c){var u=A(l,0),h=A(c,re(e,c)),f=e.getRange(u,h).split("\n"),p=a||("decimal"==i?/(-?)([\d]+)/:"hex"==i?/(-?)(?:0x)?([0-9a-f]+)/i:"octal"==i?/([0-7]+)/:null),d="decimal"==i?10:"hex"==i?16:"octal"==i?8:null,g=[],m=[]
if(i||a)for(var v=0;v<f.length;v++){var y=a?f[v].match(a):null
y&&""!=y[0]?g.push(y):!a&&p.exec(f[v])?g.push(f[v]):m.push(f[v])}else m=f
if(g.sort(a?function(e,t){var o
return n&&(o=e,e=t,t=o),r&&(e[0]=e[0].toLowerCase(),t[0]=t[0].toLowerCase()),e[0]<t[0]?-1:1}:w),a)for(v=0;v<g.length;v++)g[v]=g[v].input
else i||m.sort(w)
if(f=n?g.concat(m):m.concat(g),o){var k,C=f
for(f=[],v=0;v<C.length;v++)C[v]!=k&&f.push(C[v]),k=C[v]}e.replaceRange(f.join("\n"),u,h)}}function w(e,t){var o
n&&(o=e,e=t,t=o),r&&(e=e.toLowerCase(),t=t.toLowerCase())
var a=i&&p.exec(e),s=i&&p.exec(t)
return a?(a=parseInt((a[1]+a[2]).toLowerCase(),d))-(s=parseInt((s[1]+s[2]).toLowerCase(),d)):e<t?-1:1}},global:function(e,t){var n=t.argString
if(n){var r,o=void 0!==t.line?t.line:e.firstLine(),i=t.lineEnd||t.line||e.lastLine(),a=function(e){return xe(e,"/")}(n),s=n
if(a.length&&(s=a[0],r=a.slice(1,a.length).join("/")),s)try{Ie(e,s,!0,!0)}catch(t){return void Ee(e,"Invalid regex: "+s)}for(var l=Me(e).getQuery(),c=[],u="",h=o;h<=i;h++)l.test(e.getLine(h))&&(c.push(h+1),u+=e.getLine(h)+"<br>")
if(r){var f=0
!function t(){if(f<c.length){var n=c[f]+r
je.processCommand(e,n,{callback:t})}f++}()}else Ee(e,u)}else Ee(e,"Regular Expression missing from global")},substitute:function(e,t){if(!e.getSearchCursor)throw new Error("Search feature not available. Requires searchcursor.js or any other getSearchCursor implementation.")
var n,r,o,a,s=t.argString,l=s?xe(s,s[0]):[],c="",u=!1,h=!1
if(l.length)n=l[0],c=l[1],n&&"$"===n[n.length-1]&&(n=n.slice(0,n.length-1)+"\\n",c=c?c+"\n":"\n"),void 0!==c&&(c=E("pcre")?function(e){for(var t=new S.StringStream(e),n=[];!t.eol();){for(;t.peek()&&"\\"!=t.peek();)n.push(t.next())
var r=!1
for(var o in Le)if(t.match(o,!0)){r=!0,n.push(Le[o])
break}r||n.push(t.next())}return n.join("")}(c):function(e){for(var t,n=!1,r=[],o=-1;o<e.length;o++){var a=e.charAt(o)||"",s=e.charAt(o+1)||""
Ae[a+s]?(r.push(Ae[a+s]),o++):n?(r.push(a),n=!1):"\\"===a?(n=!0,t=s,i.test(t)||"$"===s?r.push("$"):"/"!==s&&"\\"!==s&&r.push("\\")):("$"===a&&r.push("$"),r.push(a),"/"===s&&r.push("\\"))}return r.join("")}(c),T.lastSubstituteReplacePart=c),r=l[2]?l[2].split(" "):[]
else if(s&&s.length)return void Ee(e,"Substitutions should be of the form :s/pattern/replace/")
if(r&&(o=r[0],a=parseInt(r[1]),o&&(-1!=o.indexOf("c")&&(u=!0,o.replace("c","")),-1!=o.indexOf("g")&&(h=!0,o.replace("g","")),n=n.replace(/\//g,"\\/")+"/"+o)),n)try{Ie(e,n,!0,!0)}catch(t){return void Ee(e,"Invalid regex: "+n)}if(void 0!==(c=c||T.lastSubstituteReplacePart)){var f=Me(e).getQuery(),p=void 0!==t.line?t.line:e.getCursor().line,d=t.lineEnd||p
p==e.firstLine()&&d==e.lastLine()&&(d=1/0),a&&(d=(p=d)+a-1)
var g=$(e,A(p,0)),m=e.getSearchCursor(f,g)
!function(e,t,n,r,o,i,a,s,l){e.state.vim.exMode=!0
var c=!1,u=i.from()
function h(){var t=i.getMatches(),n=t.length
e.operation(function(e,t){for(var n=t-1;n>=0;n--)f(),p(e,n)
c=!0,g()}.bind(this,t,n))}function f(){var t=e.getRange(i.from(),i.to()).replace(a,s)
i.replace(t)}function p(t,a){var s=i.jumpTo(a)&&Ne(i.from(),r,o)
t.pop(),s&&!n&&u&&i.from().line==u.line||(e.scrollIntoView(i.from(),30),u=i.from(),c=!1)}function d(){for(;i.findNext()&&Ne(i.from(),r,o);)if(n||!u||i.from().line!=u.line)return e.scrollIntoView(i.from(),30),e.setSelection(i.from(),i.to()),u=i.from(),void(c=!1)
c=!0}function g(t){if(t&&t(),e.focus(),u){e.setCursor(u)
var n=e.state.vim
n.exMode=!1,n.lastHPos=n.lastHSPos=u.ch}l&&l()}if(d(),!c)return t?void Re(e,{prefix:"replace with <strong>"+s+"</strong> (y/n/a/q/l)",onKeyDown:function(t,n,r){switch(S.e_stop(t),S.keyName(t)){case"y":case"Y":f(),d()
break
case"n":case"N":d()
break
case"a":case"A":var o=l
l=void 0,e.operation(h),l=o
break
case"l":case"L":f()
case"q":case"Q":case"Esc":case"Ctrl-C":case"Ctrl-[":g(r)}return c&&g(r),!0}}):(h(),void(l&&l()))
Ee(e,"No matches for "+a.source)}(e,u,h,p,d,m,f,c,t.callback)}else Ee(e,"No previous substitute regular expression")},redo:S.commands.redo,undo:S.commands.undo,write:function(e){S.commands.save?S.commands.save(e):e.save&&e.save()},nohlsearch:function(e){Pe(e)},yank:function(e){var t=X(e.getCursor()).line,n=e.getLine(t)
T.registerController.pushText("0","yank",n,!0,!0)},delmarks:function(e,t){if(t.argString&&oe(t.argString))for(var n=e.state.vim,r=new S.StringStream(oe(t.argString));!r.eol();){r.eatSpace()
var o=r.pos
if(!r.match(/[a-zA-Z]/,!1))return void Ee(e,"Invalid argument: "+t.argString.substring(o))
var i=r.next()
if(r.match("-",!0)){if(!r.match(/[a-zA-Z]/,!1))return void Ee(e,"Invalid argument: "+t.argString.substring(o))
var a=i,s=r.next()
if(!(g(a)&&g(s)||m(a)&&m(s)))return void Ee(e,"Invalid argument: "+a+"-")
var l=a.charCodeAt(0),c=s.charCodeAt(0)
if(l>=c)return void Ee(e,"Invalid argument: "+t.argString.substring(o))
for(var u=0;u<=c-l;u++){var h=String.fromCharCode(l+u)
delete n.marks[h]}}else delete n.marks[i]}else Ee(e,"Argument required")}},je=new We
function _e(e){var t=e.state.vim,n=T.macroModeState,r=T.registerController.getRegister("."),o=n.isPlaying,i=n.lastInsertModeChanges,a=[]
if(!o){for(var s=i.inVisualBlock&&t.lastSelection?t.lastSelection.visualBlock.height:1,l=i.changes,c=(a=[],0);c<l.length;)a.push(l[c]),l[c]instanceof Je?c++:c+=s
i.changes=a,e.off("change",Ue),S.off(e.getInputField(),"keydown",Qe)}!o&&t.insertModeRepeat>1&&(ze(e,t,t.insertModeRepeat-1,!0),t.lastEditInputState.repeatOverride=t.insertModeRepeat),delete t.insertModeRepeat,t.insertMode=!1,e.setCursor(e.getCursor().line,e.getCursor().ch-1),e.setOption("keyMap","vim"),e.setOption("disableInput",!0),e.toggleOverwrite(!1),r.setText(i.changes.join("")),S.signal(e,"vim-mode-change",{mode:"normal"}),n.isRecording&&function(e){if(!e.isPlaying){var t=e.latestRegister,n=T.registerController.getRegister(t)
n&&n.pushInsertModeChanges&&n.pushInsertModeChanges(e.lastInsertModeChanges)}}(n),e.enterVimMode()}function Fe(e){x.unshift(e)}function He(e,t,n,r){var o=T.registerController.getRegister(r)
if(":"==r)return o.keyBuffer[0]&&je.processCommand(e,o.keyBuffer[0]),void(n.isPlaying=!1)
var i=o.keyBuffer,a=0
n.isPlaying=!0,n.replaySearchQueries=o.searchQueries.slice(0)
for(var s=0;s<i.length;s++)for(var l,c,u=i[s];u;)if(c=(l=/<\w+-.+?>|<\w+>|./.exec(u))[0],u=u.substring(l.index+c.length),S.Vim.handleKey(e,c,"macro"),t.insertMode){var h=o.insertModeChanges[a++].changes
T.macroModeState.lastInsertModeChanges.changes=h,Ge(e,h,1),_e(e)}n.isPlaying=!1}function Ue(e,t){var n=T.macroModeState,r=n.lastInsertModeChanges
if(!n.isPlaying)for(;t;){if(r.expectCursorActivityForChange=!0,"+input"==t.origin||"paste"==t.origin||void 0===t.origin){var o=t.text.join("\n")
r.maybeReset&&(r.changes=[],r.maybeReset=!1),e.state.overwrite&&!/\n/.test(o)?r.changes.push([o]):r.changes.push(o)}t=t.next}}function qe(e){var t=e.state.vim
if(t.insertMode){var n=T.macroModeState
if(n.isPlaying)return
var r=n.lastInsertModeChanges
r.expectCursorActivityForChange?r.expectCursorActivityForChange=!1:r.maybeReset=!0}else e.curOp.isVimOp||function(e,t){var n=e.getCursor("anchor"),r=e.getCursor("head")
if(t.visualMode&&!e.somethingSelected()?he(e,!1):t.visualMode||t.insertMode||!e.somethingSelected()||(t.visualMode=!0,t.visualLine=!1,S.signal(e,"vim-mode-change",{mode:"visual"})),t.visualMode){var o=Z(r,n)?0:-1,i=Z(r,n)?-1:0
r=Q(r,0,o),n=Q(n,0,i),t.sel={anchor:n,head:r},ke(e,t,"<",ee(r,n)),ke(e,t,">",te(r,n))}else t.insertMode||(t.lastHPos=e.getCursor().ch)}(e,t)
t.visualMode&&$e(e)}function $e(e){var t=e.state.vim,n=$(e,X(t.sel.head)),r=Q(n,0,1)
t.fakeCursor&&t.fakeCursor.clear(),t.fakeCursor=e.markText(n,r,{className:"cm-animate-fat-cursor"})}function Je(e){this.keyName=e}function Qe(e){var t=T.macroModeState.lastInsertModeChanges,n=S.keyName(e)
n&&(-1==n.indexOf("Delete")&&-1==n.indexOf("Backspace")||S.lookupKey(n,"vim-insert",(function(){return t.maybeReset&&(t.changes=[],t.maybeReset=!1),t.changes.push(new Je(n)),!0})))}function ze(e,t,n,r){var o=T.macroModeState
o.isPlaying=!0
var i=!!t.lastEditActionCommand,a=t.inputState
function s(){i?_.processAction(e,t,t.lastEditActionCommand):_.evalInput(e,t)}function l(n){if(o.lastInsertModeChanges.changes.length>0){n=t.lastEditActionCommand?n:1
var r=o.lastInsertModeChanges
Ge(e,r.changes,n)}}if(t.inputState=t.lastEditInputState,i&&t.lastEditActionCommand.interlaceInsertRepeat)for(var c=0;c<n;c++)s(),l(1)
else r||s(),l(n)
t.inputState=a,t.insertMode&&!r&&_e(e),o.isPlaying=!1}function Ge(e,t,n){function r(t){return"string"==typeof t?S.commands[t](e):t(e),!0}var o=e.getCursor("head"),i=T.macroModeState.lastInsertModeChanges.inVisualBlock
if(i){var a=e.state.vim.lastSelection,s=function(e,t){return{line:t.line-e.line,ch:t.line-e.line}}(a.anchor,a.head)
se(e,o,s.line+1),n=e.listSelections().length,e.setCursor(o)}for(var l=0;l<n;l++){i&&e.setCursor(Q(o,l,0))
for(var c=0;c<t.length;c++){var u=t[c]
if(u instanceof Je)S.lookupKey(u.keyName,"vim-insert",r)
else if("string"==typeof u){var h=e.getCursor()
e.replaceRange(u,h,h)}else{var f=e.getCursor(),p=Q(f,0,u[0].length)
e.replaceRange(u[0],f,p)}}}i&&e.setCursor(Q(o,0,1))}return S.keyMap.vim={attach:t,detach:e,call:n},w("insertModeEscKeysTimeout",200,"number"),S.keyMap["vim-insert"]={fallthrough:["default"],attach:t,detach:e,call:n},S.keyMap["vim-replace"]={Backspace:"goCharLeft",fallthrough:["vim-insert"],attach:t,detach:e,call:n},P(),N}()
var L=S
function E(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function T(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var R=function(){function e(t,n){var r=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null
E(this,e),this.closeInput=function(){r.removeInputListeners(),r.input=null,r.setSec(""),r.editor&&r.editor.focus()},this.clear=function(){r.setInnerHtml_(r.node,"")},this.inputKeyUp=function(e){var t=r.input.options
t&&t.onKeyUp&&t.onKeyUp(e,e.target.value,r.closeInput)},this.inputBlur=function(){r.input.options.closeOnBlur&&r.closeInput()},this.inputKeyDown=function(e){var t=r.input,n=t.options,o=t.callback
n&&n.onKeyDown&&n.onKeyDown(e,e.target.value,r.closeInput)||((27===e.keyCode||n&&!1!==n.closeOnEnter&&13==e.keyCode)&&(r.input.node.blur(),e.stopPropagation(),r.closeInput()),13===e.keyCode&&o&&(e.stopPropagation(),e.preventDefault(),o(e.target.value)))},this.node=t,this.modeInfoNode=document.createElement("span"),this.secInfoNode=document.createElement("span"),this.notifNode=document.createElement("span"),this.notifNode.className="vim-notification",this.keyInfoNode=document.createElement("span"),this.keyInfoNode.setAttribute("style","float: right"),this.node.appendChild(this.modeInfoNode),this.node.appendChild(this.secInfoNode),this.node.appendChild(this.notifNode),this.node.appendChild(this.keyInfoNode),this.toggleVisibility(!1),this.editor=n,this.sanitizer=o}var t,n
return t=e,(n=[{key:"setMode",value:function(e){"visual"!==e.mode||"linewise"!==e.subMode?this.setText("--".concat(e.mode.toUpperCase(),"--")):this.setText("--VISUAL LINE--")}},{key:"setKeyBuffer",value:function(e){this.keyInfoNode.textContent=e}},{key:"setSec",value:function(e,t,n){if(this.notifNode.textContent="",void 0!==e){this.setInnerHtml_(this.secInfoNode,e)
var r=this.secInfoNode.querySelector("input")
return r&&(r.focus(),this.input={callback:t,options:n,node:r},n&&(n.selectValueOnOpen&&r.select(),n.value&&(r.value=n.value)),this.addInputListeners()),this.closeInput}}},{key:"setText",value:function(e){this.modeInfoNode.textContent=e}},{key:"toggleVisibility",value:function(e){this.node.style.display=e?"block":"none",this.input&&this.removeInputListeners(),clearInterval(this.notifTimeout)}},{key:"addInputListeners",value:function(){var e=this.input.node
e.addEventListener("keyup",this.inputKeyUp),e.addEventListener("keydown",this.inputKeyDown),e.addEventListener("input",this.inputKeyInput),e.addEventListener("blur",this.inputBlur)}},{key:"removeInputListeners",value:function(){if(this.input&&this.input.node){var e=this.input.node
e.removeEventListener("keyup",this.inputKeyUp),e.removeEventListener("keydown",this.inputKeyDown),e.removeEventListener("input",this.inputKeyInput),e.removeEventListener("blur",this.inputBlur)}}},{key:"showNotification",value:function(e){var t=this,n=document.createElement("span")
this.setInnerHtml_(n,e),this.notifNode.textContent=n.textContent,this.notifTimeout=setTimeout((function(){t.notifNode.textContent=""}),5e3)}},{key:"setInnerHtml_",value:function(e,t){if(this.sanitizer){for(;e.children.length;)e.removeChild(e.children[0])
e.appendChild(this.sanitizer(t))}else e.innerHTML=t}}])&&T(t.prototype,n),e}()
function I(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:R,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=new L(e)
if(!t)return o.attach(),o
var i=new n(t,e,r),a=""
return o.on("vim-mode-change",(function(e){i.setMode(e)})),o.on("vim-keypress",(function(e){":"===e?a="":a+=e,i.setKeyBuffer(a)})),o.on("vim-command-done",(function(){a="",i.setKeyBuffer(a)})),o.on("dispose",(function(){i.toggleVisibility(!1),i.closeInput(),i.clear()})),i.toggleVisibility(!0),o.setStatusBar(i),o.attach(),o}n.d(t,"initVimMode",(function(){return I})),n.d(t,"VimMode",(function(){return L})),n.d(t,"StatusBar",(function(){return R}))}])}))
