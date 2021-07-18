(function(a,t){"function"==typeof define&&define.amd?define(["./blockly_compressed-ab59f1afdcc7517959a74315f4b2e14b.js"],t):"object"==typeof exports?module.exports=t(require("./blockly_compressed-ab59f1afdcc7517959a74315f4b2e14b.js")):a.Blockly.JavaScript=t(a.Blockly)})(this,(function(a){"use strict"
return a.JavaScript=new a.Generator("JavaScript"),a.JavaScript.addReservedWords("break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,new,return,super,switch,this,throw,try,typeof,var,void,while,with,yield,enum,implements,interface,let,package,private,protected,public,static,await,null,true,false,arguments,"+Object.getOwnPropertyNames(a.utils.global).join(",")),a.JavaScript.ORDER_ATOMIC=0,a.JavaScript.ORDER_NEW=1.1,a.JavaScript.ORDER_MEMBER=1.2,a.JavaScript.ORDER_FUNCTION_CALL=2,a.JavaScript.ORDER_INCREMENT=3,a.JavaScript.ORDER_DECREMENT=3,a.JavaScript.ORDER_BITWISE_NOT=4.1,a.JavaScript.ORDER_UNARY_PLUS=4.2,a.JavaScript.ORDER_UNARY_NEGATION=4.3,a.JavaScript.ORDER_LOGICAL_NOT=4.4,a.JavaScript.ORDER_TYPEOF=4.5,a.JavaScript.ORDER_VOID=4.6,a.JavaScript.ORDER_DELETE=4.7,a.JavaScript.ORDER_AWAIT=4.8,a.JavaScript.ORDER_EXPONENTIATION=5,a.JavaScript.ORDER_MULTIPLICATION=5.1,a.JavaScript.ORDER_DIVISION=5.2,a.JavaScript.ORDER_MODULUS=5.3,a.JavaScript.ORDER_SUBTRACTION=6.1,a.JavaScript.ORDER_ADDITION=6.2,a.JavaScript.ORDER_BITWISE_SHIFT=7,a.JavaScript.ORDER_RELATIONAL=8,a.JavaScript.ORDER_IN=8,a.JavaScript.ORDER_INSTANCEOF=8,a.JavaScript.ORDER_EQUALITY=9,a.JavaScript.ORDER_BITWISE_AND=10,a.JavaScript.ORDER_BITWISE_XOR=11,a.JavaScript.ORDER_BITWISE_OR=12,a.JavaScript.ORDER_LOGICAL_AND=13,a.JavaScript.ORDER_LOGICAL_OR=14,a.JavaScript.ORDER_CONDITIONAL=15,a.JavaScript.ORDER_ASSIGNMENT=16,a.JavaScript.ORDER_YIELD=17,a.JavaScript.ORDER_COMMA=18,a.JavaScript.ORDER_NONE=99,a.JavaScript.ORDER_OVERRIDES=[[a.JavaScript.ORDER_FUNCTION_CALL,a.JavaScript.ORDER_MEMBER],[a.JavaScript.ORDER_FUNCTION_CALL,a.JavaScript.ORDER_FUNCTION_CALL],[a.JavaScript.ORDER_MEMBER,a.JavaScript.ORDER_MEMBER],[a.JavaScript.ORDER_MEMBER,a.JavaScript.ORDER_FUNCTION_CALL],[a.JavaScript.ORDER_LOGICAL_NOT,a.JavaScript.ORDER_LOGICAL_NOT],[a.JavaScript.ORDER_MULTIPLICATION,a.JavaScript.ORDER_MULTIPLICATION],[a.JavaScript.ORDER_ADDITION,a.JavaScript.ORDER_ADDITION],[a.JavaScript.ORDER_LOGICAL_AND,a.JavaScript.ORDER_LOGICAL_AND],[a.JavaScript.ORDER_LOGICAL_OR,a.JavaScript.ORDER_LOGICAL_OR]],a.JavaScript.isInitialized=!1,a.JavaScript.init=function(t){a.JavaScript.definitions_=Object.create(null),a.JavaScript.functionNames_=Object.create(null),a.JavaScript.variableDB_?a.JavaScript.variableDB_.reset():a.JavaScript.variableDB_=new a.Names(a.JavaScript.RESERVED_WORDS_),a.JavaScript.variableDB_.setVariableMap(t.getVariableMap())
for(var r=[],e=a.Variables.allDeveloperVariables(t),i=0;i<e.length;i++)r.push(a.JavaScript.variableDB_.getName(e[i],a.Names.DEVELOPER_VARIABLE_TYPE))
for(t=a.Variables.allUsedVarModels(t),i=0;i<t.length;i++)r.push(a.JavaScript.variableDB_.getName(t[i].getId(),a.VARIABLE_CATEGORY_NAME))
r.length&&(a.JavaScript.definitions_.variables="var "+r.join(", ")+";"),this.isInitialized=!0},a.JavaScript.finish=function(t){var r,e=[]
for(r in a.JavaScript.definitions_)e.push(a.JavaScript.definitions_[r])
return delete a.JavaScript.definitions_,delete a.JavaScript.functionNames_,a.JavaScript.variableDB_.reset(),e.join("\n\n")+"\n\n\n"+t},a.JavaScript.scrubNakedValue=function(a){return a+";\n"},a.JavaScript.quote_=function(a){return"'"+(a=a.replace(/\\/g,"\\\\").replace(/\n/g,"\\\n").replace(/'/g,"\\'"))+"'"},a.JavaScript.multiline_quote_=function(t){return t.split(/\n/g).map(a.JavaScript.quote_).join(" + '\\n' +\n")},a.JavaScript.scrub_=function(t,r,e){var i=""
if(!t.outputConnection||!t.outputConnection.targetConnection){var c=t.getCommentText()
c&&(c=a.utils.string.wrap(c,a.JavaScript.COMMENT_WRAP-3),i+=a.JavaScript.prefixLines(c+"\n","// "))
for(var n=0;n<t.inputList.length;n++)t.inputList[n].type==a.INPUT_VALUE&&(c=t.inputList[n].connection.targetBlock())&&(c=a.JavaScript.allNestedComments(c))&&(i+=a.JavaScript.prefixLines(c,"// "))}return t=t.nextConnection&&t.nextConnection.targetBlock(),i+r+(e=e?"":a.JavaScript.blockToCode(t))},a.JavaScript.getAdjusted=function(t,r,e,i,c){e=e||0,c=c||a.JavaScript.ORDER_NONE,t.workspace.options.oneBasedIndex&&e--
var n=t.workspace.options.oneBasedIndex?"1":"0"
if(t=0<e?a.JavaScript.valueToCode(t,r,a.JavaScript.ORDER_ADDITION)||n:0>e?a.JavaScript.valueToCode(t,r,a.JavaScript.ORDER_SUBTRACTION)||n:i?a.JavaScript.valueToCode(t,r,a.JavaScript.ORDER_UNARY_NEGATION)||n:a.JavaScript.valueToCode(t,r,c)||n,a.isNumber(t))t=Number(t)+e,i&&(t=-t)
else{if(0<e){t=t+" + "+e
var v=a.JavaScript.ORDER_ADDITION}else 0>e&&(t=t+" - "+-e,v=a.JavaScript.ORDER_SUBTRACTION)
i&&(t=e?"-("+t+")":"-"+t,v=a.JavaScript.ORDER_UNARY_NEGATION),v=Math.floor(v),c=Math.floor(c),v&&c>=v&&(t="("+t+")")}return t},a.JavaScript.colour={},a.JavaScript.colour_picker=function(t){return[a.JavaScript.quote_(t.getFieldValue("COLOUR")),a.JavaScript.ORDER_ATOMIC]},a.JavaScript.colour_random=function(t){return[a.JavaScript.provideFunction_("colourRandom",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"() {","  var num = Math.floor(Math.random() * Math.pow(2, 24));","  return '#' + ('00000' + num.toString(16)).substr(-6);","}"])+"()",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.colour_rgb=function(t){var r=a.JavaScript.valueToCode(t,"RED",a.JavaScript.ORDER_NONE)||0,e=a.JavaScript.valueToCode(t,"GREEN",a.JavaScript.ORDER_NONE)||0
return t=a.JavaScript.valueToCode(t,"BLUE",a.JavaScript.ORDER_NONE)||0,[a.JavaScript.provideFunction_("colourRgb",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(r, g, b) {","  r = Math.max(Math.min(Number(r), 100), 0) * 2.55;","  g = Math.max(Math.min(Number(g), 100), 0) * 2.55;","  b = Math.max(Math.min(Number(b), 100), 0) * 2.55;","  r = ('0' + (Math.round(r) || 0).toString(16)).slice(-2);","  g = ('0' + (Math.round(g) || 0).toString(16)).slice(-2);","  b = ('0' + (Math.round(b) || 0).toString(16)).slice(-2);","  return '#' + r + g + b;","}"])+"("+r+", "+e+", "+t+")",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.colour_blend=function(t){var r=a.JavaScript.valueToCode(t,"COLOUR1",a.JavaScript.ORDER_NONE)||"'#000000'",e=a.JavaScript.valueToCode(t,"COLOUR2",a.JavaScript.ORDER_NONE)||"'#000000'"
return t=a.JavaScript.valueToCode(t,"RATIO",a.JavaScript.ORDER_NONE)||.5,[a.JavaScript.provideFunction_("colourBlend",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(c1, c2, ratio) {","  ratio = Math.max(Math.min(Number(ratio), 1), 0);","  var r1 = parseInt(c1.substring(1, 3), 16);","  var g1 = parseInt(c1.substring(3, 5), 16);","  var b1 = parseInt(c1.substring(5, 7), 16);","  var r2 = parseInt(c2.substring(1, 3), 16);","  var g2 = parseInt(c2.substring(3, 5), 16);","  var b2 = parseInt(c2.substring(5, 7), 16);","  var r = Math.round(r1 * (1 - ratio) + r2 * ratio);","  var g = Math.round(g1 * (1 - ratio) + g2 * ratio);","  var b = Math.round(b1 * (1 - ratio) + b2 * ratio);","  r = ('0' + (r || 0).toString(16)).slice(-2);","  g = ('0' + (g || 0).toString(16)).slice(-2);","  b = ('0' + (b || 0).toString(16)).slice(-2);","  return '#' + r + g + b;","}"])+"("+r+", "+e+", "+t+")",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.lists={},a.JavaScript.lists_create_empty=function(t){return["[]",a.JavaScript.ORDER_ATOMIC]},a.JavaScript.lists_create_with=function(t){for(var r=Array(t.itemCount_),e=0;e<t.itemCount_;e++)r[e]=a.JavaScript.valueToCode(t,"ADD"+e,a.JavaScript.ORDER_NONE)||"null"
return["["+r.join(", ")+"]",a.JavaScript.ORDER_ATOMIC]},a.JavaScript.lists_repeat=function(t){return[a.JavaScript.provideFunction_("listsRepeat",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(value, n) {","  var array = [];","  for (var i = 0; i < n; i++) {","    array[i] = value;","  }","  return array;","}"])+"("+(a.JavaScript.valueToCode(t,"ITEM",a.JavaScript.ORDER_NONE)||"null")+", "+(t=a.JavaScript.valueToCode(t,"NUM",a.JavaScript.ORDER_NONE)||"0")+")",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.lists_length=function(t){return[(a.JavaScript.valueToCode(t,"VALUE",a.JavaScript.ORDER_MEMBER)||"[]")+".length",a.JavaScript.ORDER_MEMBER]},a.JavaScript.lists_isEmpty=function(t){return["!"+(a.JavaScript.valueToCode(t,"VALUE",a.JavaScript.ORDER_MEMBER)||"[]")+".length",a.JavaScript.ORDER_LOGICAL_NOT]},a.JavaScript.lists_indexOf=function(t){var r="FIRST"==t.getFieldValue("END")?"indexOf":"lastIndexOf",e=a.JavaScript.valueToCode(t,"FIND",a.JavaScript.ORDER_NONE)||"''"
return r=(a.JavaScript.valueToCode(t,"VALUE",a.JavaScript.ORDER_MEMBER)||"[]")+"."+r+"("+e+")",t.workspace.options.oneBasedIndex?[r+" + 1",a.JavaScript.ORDER_ADDITION]:[r,a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.lists_getIndex=function(t){var r=t.getFieldValue("MODE")||"GET",e=t.getFieldValue("WHERE")||"FROM_START",i=a.JavaScript.valueToCode(t,"VALUE","RANDOM"==e?a.JavaScript.ORDER_NONE:a.JavaScript.ORDER_MEMBER)||"[]"
switch(e){case"FIRST":if("GET"==r)return[i+"[0]",a.JavaScript.ORDER_MEMBER]
if("GET_REMOVE"==r)return[i+".shift()",a.JavaScript.ORDER_MEMBER]
if("REMOVE"==r)return i+".shift();\n"
break
case"LAST":if("GET"==r)return[i+".slice(-1)[0]",a.JavaScript.ORDER_MEMBER]
if("GET_REMOVE"==r)return[i+".pop()",a.JavaScript.ORDER_MEMBER]
if("REMOVE"==r)return i+".pop();\n"
break
case"FROM_START":if(t=a.JavaScript.getAdjusted(t,"AT"),"GET"==r)return[i+"["+t+"]",a.JavaScript.ORDER_MEMBER]
if("GET_REMOVE"==r)return[i+".splice("+t+", 1)[0]",a.JavaScript.ORDER_FUNCTION_CALL]
if("REMOVE"==r)return i+".splice("+t+", 1);\n"
break
case"FROM_END":if(t=a.JavaScript.getAdjusted(t,"AT",1,!0),"GET"==r)return[i+".slice("+t+")[0]",a.JavaScript.ORDER_FUNCTION_CALL]
if("GET_REMOVE"==r)return[i+".splice("+t+", 1)[0]",a.JavaScript.ORDER_FUNCTION_CALL]
if("REMOVE"==r)return i+".splice("+t+", 1);"
break
case"RANDOM":if(i=a.JavaScript.provideFunction_("listsGetRandomItem",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(list, remove) {","  var x = Math.floor(Math.random() * list.length);","  if (remove) {","    return list.splice(x, 1)[0];","  } else {","    return list[x];","  }","}"])+"("+i+", "+("GET"!=r)+")","GET"==r||"GET_REMOVE"==r)return[i,a.JavaScript.ORDER_FUNCTION_CALL]
if("REMOVE"==r)return i+";\n"}throw Error("Unhandled combination (lists_getIndex).")},a.JavaScript.lists_setIndex=function(t){function r(){if(e.match(/^\w+$/))return""
var t=a.JavaScript.variableDB_.getDistinctName("tmpList",a.VARIABLE_CATEGORY_NAME),r="var "+t+" = "+e+";\n"
return e=t,r}var e=a.JavaScript.valueToCode(t,"LIST",a.JavaScript.ORDER_MEMBER)||"[]",i=t.getFieldValue("MODE")||"GET",c=t.getFieldValue("WHERE")||"FROM_START",n=a.JavaScript.valueToCode(t,"TO",a.JavaScript.ORDER_ASSIGNMENT)||"null"
switch(c){case"FIRST":if("SET"==i)return e+"[0] = "+n+";\n"
if("INSERT"==i)return e+".unshift("+n+");\n"
break
case"LAST":if("SET"==i)return(t=r())+(e+"[")+e+".length - 1] = "+n+";\n"
if("INSERT"==i)return e+".push("+n+");\n"
break
case"FROM_START":if(c=a.JavaScript.getAdjusted(t,"AT"),"SET"==i)return e+"["+c+"] = "+n+";\n"
if("INSERT"==i)return e+".splice("+c+", 0, "+n+");\n"
break
case"FROM_END":if(c=a.JavaScript.getAdjusted(t,"AT",1,!1,a.JavaScript.ORDER_SUBTRACTION),t=r(),"SET"==i)return t+(e+"[")+e+".length - "+c+"] = "+n+";\n"
if("INSERT"==i)return t+(e+".splice(")+e+".length - "+c+", 0, "+n+");\n"
break
case"RANDOM":if(t=r(),t+="var "+(c=a.JavaScript.variableDB_.getDistinctName("tmpX",a.VARIABLE_CATEGORY_NAME))+" = Math.floor(Math.random() * "+e+".length);\n","SET"==i)return t+(e+"[")+c+"] = "+n+";\n"
if("INSERT"==i)return t+(e+".splice(")+c+", 0, "+n+");\n"}throw Error("Unhandled combination (lists_setIndex).")},a.JavaScript.lists.getIndex_=function(a,t,r){return"FIRST"==t?"0":"FROM_END"==t?a+".length - 1 - "+r:"LAST"==t?a+".length - 1":r},a.JavaScript.lists_getSublist=function(t){var r=a.JavaScript.valueToCode(t,"LIST",a.JavaScript.ORDER_MEMBER)||"[]",e=t.getFieldValue("WHERE1"),i=t.getFieldValue("WHERE2")
if("FIRST"==e&&"LAST"==i)r+=".slice(0)"
else if(r.match(/^\w+$/)||"FROM_END"!=e&&"FROM_START"==i){switch(e){case"FROM_START":var c=a.JavaScript.getAdjusted(t,"AT1")
break
case"FROM_END":c=r+".length - "+(c=a.JavaScript.getAdjusted(t,"AT1",1,!1,a.JavaScript.ORDER_SUBTRACTION))
break
case"FIRST":c="0"
break
default:throw Error("Unhandled option (lists_getSublist).")}switch(i){case"FROM_START":t=a.JavaScript.getAdjusted(t,"AT2",1)
break
case"FROM_END":t=r+".length - "+(t=a.JavaScript.getAdjusted(t,"AT2",0,!1,a.JavaScript.ORDER_SUBTRACTION))
break
case"LAST":t=r+".length"
break
default:throw Error("Unhandled option (lists_getSublist).")}r=r+".slice("+c+", "+t+")"}else{c=a.JavaScript.getAdjusted(t,"AT1"),t=a.JavaScript.getAdjusted(t,"AT2")
var n=a.JavaScript.lists.getIndex_,v={FIRST:"First",LAST:"Last",FROM_START:"FromStart",FROM_END:"FromEnd"}
r=a.JavaScript.provideFunction_("subsequence"+v[e]+v[i],["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(sequence"+("FROM_END"==e||"FROM_START"==e?", at1":"")+("FROM_END"==i||"FROM_START"==i?", at2":"")+") {","  var start = "+n("sequence",e,"at1")+";","  var end = "+n("sequence",i,"at2")+" + 1;","  return sequence.slice(start, end);","}"])+"("+r+("FROM_END"==e||"FROM_START"==e?", "+c:"")+("FROM_END"==i||"FROM_START"==i?", "+t:"")+")"}return[r,a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.lists_sort=function(t){var r=a.JavaScript.valueToCode(t,"LIST",a.JavaScript.ORDER_FUNCTION_CALL)||"[]",e="1"===t.getFieldValue("DIRECTION")?1:-1
return t=t.getFieldValue("TYPE"),[r+".slice().sort("+a.JavaScript.provideFunction_("listsGetSortCompare",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(type, direction) {","  var compareFuncs = {",'    "NUMERIC": function(a, b) {',"        return Number(a) - Number(b); },",'    "TEXT": function(a, b) {',"        return a.toString() > b.toString() ? 1 : -1; },",'    "IGNORE_CASE": function(a, b) {',"        return a.toString().toLowerCase() > b.toString().toLowerCase() ? 1 : -1; },","  };","  var compare = compareFuncs[type];","  return function(a, b) { return compare(a, b) * direction; }","}"])+'("'+t+'", '+e+"))",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.lists_split=function(t){var r=a.JavaScript.valueToCode(t,"INPUT",a.JavaScript.ORDER_MEMBER),e=a.JavaScript.valueToCode(t,"DELIM",a.JavaScript.ORDER_NONE)||"''"
if("SPLIT"==(t=t.getFieldValue("MODE")))r||(r="''"),t="split"
else{if("JOIN"!=t)throw Error("Unknown mode: "+t)
r||(r="[]"),t="join"}return[r+"."+t+"("+e+")",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.lists_reverse=function(t){return[(a.JavaScript.valueToCode(t,"LIST",a.JavaScript.ORDER_FUNCTION_CALL)||"[]")+".slice().reverse()",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.logic={},a.JavaScript.controls_if=function(t){var r=0,e=""
a.JavaScript.STATEMENT_PREFIX&&(e+=a.JavaScript.injectId(a.JavaScript.STATEMENT_PREFIX,t))
do{var i=a.JavaScript.valueToCode(t,"IF"+r,a.JavaScript.ORDER_NONE)||"false",c=a.JavaScript.statementToCode(t,"DO"+r)
a.JavaScript.STATEMENT_SUFFIX&&(c=a.JavaScript.prefixLines(a.JavaScript.injectId(a.JavaScript.STATEMENT_SUFFIX,t),a.JavaScript.INDENT)+c),e+=(0<r?" else ":"")+"if ("+i+") {\n"+c+"}",++r}while(t.getInput("IF"+r))
return(t.getInput("ELSE")||a.JavaScript.STATEMENT_SUFFIX)&&(c=a.JavaScript.statementToCode(t,"ELSE"),a.JavaScript.STATEMENT_SUFFIX&&(c=a.JavaScript.prefixLines(a.JavaScript.injectId(a.JavaScript.STATEMENT_SUFFIX,t),a.JavaScript.INDENT)+c),e+=" else {\n"+c+"}"),e+"\n"},a.JavaScript.controls_ifelse=a.JavaScript.controls_if,a.JavaScript.logic_compare=function(t){var r={EQ:"==",NEQ:"!=",LT:"<",LTE:"<=",GT:">",GTE:">="}[t.getFieldValue("OP")],e="=="==r||"!="==r?a.JavaScript.ORDER_EQUALITY:a.JavaScript.ORDER_RELATIONAL
return[(a.JavaScript.valueToCode(t,"A",e)||"0")+" "+r+" "+(t=a.JavaScript.valueToCode(t,"B",e)||"0"),e]},a.JavaScript.logic_operation=function(t){var r="AND"==t.getFieldValue("OP")?"&&":"||",e="&&"==r?a.JavaScript.ORDER_LOGICAL_AND:a.JavaScript.ORDER_LOGICAL_OR,i=a.JavaScript.valueToCode(t,"A",e)
if(t=a.JavaScript.valueToCode(t,"B",e),i||t){var c="&&"==r?"true":"false"
i||(i=c),t||(t=c)}else t=i="false"
return[i+" "+r+" "+t,e]},a.JavaScript.logic_negate=function(t){var r=a.JavaScript.ORDER_LOGICAL_NOT
return["!"+(a.JavaScript.valueToCode(t,"BOOL",r)||"true"),r]},a.JavaScript.logic_boolean=function(t){return["TRUE"==t.getFieldValue("BOOL")?"true":"false",a.JavaScript.ORDER_ATOMIC]},a.JavaScript.logic_null=function(t){return["null",a.JavaScript.ORDER_ATOMIC]},a.JavaScript.logic_ternary=function(t){return[(a.JavaScript.valueToCode(t,"IF",a.JavaScript.ORDER_CONDITIONAL)||"false")+" ? "+(a.JavaScript.valueToCode(t,"THEN",a.JavaScript.ORDER_CONDITIONAL)||"null")+" : "+(t=a.JavaScript.valueToCode(t,"ELSE",a.JavaScript.ORDER_CONDITIONAL)||"null"),a.JavaScript.ORDER_CONDITIONAL]},a.JavaScript.loops={},a.JavaScript.controls_repeat_ext=function(t){var r=t.getField("TIMES")?String(Number(t.getFieldValue("TIMES"))):a.JavaScript.valueToCode(t,"TIMES",a.JavaScript.ORDER_ASSIGNMENT)||"0",e=a.JavaScript.statementToCode(t,"DO")
e=a.JavaScript.addLoopTrap(e,t),t=""
var i=a.JavaScript.variableDB_.getDistinctName("count",a.VARIABLE_CATEGORY_NAME),c=r
return r.match(/^\w+$/)||a.isNumber(r)||(t+="var "+(c=a.JavaScript.variableDB_.getDistinctName("repeat_end",a.VARIABLE_CATEGORY_NAME))+" = "+r+";\n"),t+"for (var "+i+" = 0; "+i+" < "+c+"; "+i+"++) {\n"+e+"}\n"},a.JavaScript.controls_repeat=a.JavaScript.controls_repeat_ext,a.JavaScript.controls_whileUntil=function(t){var r="UNTIL"==t.getFieldValue("MODE"),e=a.JavaScript.valueToCode(t,"BOOL",r?a.JavaScript.ORDER_LOGICAL_NOT:a.JavaScript.ORDER_NONE)||"false",i=a.JavaScript.statementToCode(t,"DO")
return r&&(e="!"+e),"while ("+e+") {\n"+(i=a.JavaScript.addLoopTrap(i,t))+"}\n"},a.JavaScript.controls_for=function(t){var r=a.JavaScript.variableDB_.getName(t.getFieldValue("VAR"),a.VARIABLE_CATEGORY_NAME),e=a.JavaScript.valueToCode(t,"FROM",a.JavaScript.ORDER_ASSIGNMENT)||"0",i=a.JavaScript.valueToCode(t,"TO",a.JavaScript.ORDER_ASSIGNMENT)||"0",c=a.JavaScript.valueToCode(t,"BY",a.JavaScript.ORDER_ASSIGNMENT)||"1",n=a.JavaScript.statementToCode(t,"DO")
if(n=a.JavaScript.addLoopTrap(n,t),a.isNumber(e)&&a.isNumber(i)&&a.isNumber(c)){var v=Number(e)<=Number(i)
t="for ("+r+" = "+e+"; "+r+(v?" <= ":" >= ")+i+"; "+r,t=(1==(r=Math.abs(Number(c)))?t+(v?"++":"--"):t+(v?" += ":" -= ")+r)+") {\n"+n+"}\n"}else t="",v=e,e.match(/^\w+$/)||a.isNumber(e)||(t+="var "+(v=a.JavaScript.variableDB_.getDistinctName(r+"_start",a.VARIABLE_CATEGORY_NAME))+" = "+e+";\n"),e=i,i.match(/^\w+$/)||a.isNumber(i)||(t+="var "+(e=a.JavaScript.variableDB_.getDistinctName(r+"_end",a.VARIABLE_CATEGORY_NAME))+" = "+i+";\n"),t+="var "+(i=a.JavaScript.variableDB_.getDistinctName(r+"_inc",a.VARIABLE_CATEGORY_NAME))+" = ",t=(t=a.isNumber(c)?t+(Math.abs(c)+";\n"):t+"Math.abs("+c+");\n")+"if ("+v+" > "+e+") {\n"+(a.JavaScript.INDENT+i)+" = -"+i+";\n",t+="}\n",t+="for ("+r+" = "+v+"; "+i+" >= 0 ? "+r+" <= "+e+" : "+r+" >= "+e+"; "+r+" += "+i+") {\n"+n+"}\n"
return t},a.JavaScript.controls_forEach=function(t){var r=a.JavaScript.variableDB_.getName(t.getFieldValue("VAR"),a.VARIABLE_CATEGORY_NAME),e=a.JavaScript.valueToCode(t,"LIST",a.JavaScript.ORDER_ASSIGNMENT)||"[]",i=a.JavaScript.statementToCode(t,"DO")
i=a.JavaScript.addLoopTrap(i,t),t=""
var c=e
return e.match(/^\w+$/)||(t+="var "+(c=a.JavaScript.variableDB_.getDistinctName(r+"_list",a.VARIABLE_CATEGORY_NAME))+" = "+e+";\n"),t+"for (var "+(e=a.JavaScript.variableDB_.getDistinctName(r+"_index",a.VARIABLE_CATEGORY_NAME))+" in "+c+") {\n"+(i=a.JavaScript.INDENT+r+" = "+c+"["+e+"];\n"+i)+"}\n"},a.JavaScript.controls_flow_statements=function(t){var r=""
if(a.JavaScript.STATEMENT_PREFIX&&(r+=a.JavaScript.injectId(a.JavaScript.STATEMENT_PREFIX,t)),a.JavaScript.STATEMENT_SUFFIX&&(r+=a.JavaScript.injectId(a.JavaScript.STATEMENT_SUFFIX,t)),a.JavaScript.STATEMENT_PREFIX){var e=a.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.getSurroundLoop(t)
e&&!e.suppressPrefixSuffix&&(r+=a.JavaScript.injectId(a.JavaScript.STATEMENT_PREFIX,e))}switch(t.getFieldValue("FLOW")){case"BREAK":return r+"break;\n"
case"CONTINUE":return r+"continue;\n"}throw Error("Unknown flow statement.")},a.JavaScript.math={},a.JavaScript.math_number=function(t){return[t=Number(t.getFieldValue("NUM")),0<=t?a.JavaScript.ORDER_ATOMIC:a.JavaScript.ORDER_UNARY_NEGATION]},a.JavaScript.math_arithmetic=function(t){var r={ADD:[" + ",a.JavaScript.ORDER_ADDITION],MINUS:[" - ",a.JavaScript.ORDER_SUBTRACTION],MULTIPLY:[" * ",a.JavaScript.ORDER_MULTIPLICATION],DIVIDE:[" / ",a.JavaScript.ORDER_DIVISION],POWER:[null,a.JavaScript.ORDER_NONE]}[t.getFieldValue("OP")],e=r[0]
r=r[1]
var i=a.JavaScript.valueToCode(t,"A",r)||"0"
return t=a.JavaScript.valueToCode(t,"B",r)||"0",e?[i+e+t,r]:["Math.pow("+i+", "+t+")",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.math_single=function(t){var r=t.getFieldValue("OP")
if("NEG"==r)return"-"==(t=a.JavaScript.valueToCode(t,"NUM",a.JavaScript.ORDER_UNARY_NEGATION)||"0")[0]&&(t=" "+t),["-"+t,a.JavaScript.ORDER_UNARY_NEGATION]
switch(t="SIN"==r||"COS"==r||"TAN"==r?a.JavaScript.valueToCode(t,"NUM",a.JavaScript.ORDER_DIVISION)||"0":a.JavaScript.valueToCode(t,"NUM",a.JavaScript.ORDER_NONE)||"0",r){case"ABS":var e="Math.abs("+t+")"
break
case"ROOT":e="Math.sqrt("+t+")"
break
case"LN":e="Math.log("+t+")"
break
case"EXP":e="Math.exp("+t+")"
break
case"POW10":e="Math.pow(10,"+t+")"
break
case"ROUND":e="Math.round("+t+")"
break
case"ROUNDUP":e="Math.ceil("+t+")"
break
case"ROUNDDOWN":e="Math.floor("+t+")"
break
case"SIN":e="Math.sin("+t+" / 180 * Math.PI)"
break
case"COS":e="Math.cos("+t+" / 180 * Math.PI)"
break
case"TAN":e="Math.tan("+t+" / 180 * Math.PI)"}if(e)return[e,a.JavaScript.ORDER_FUNCTION_CALL]
switch(r){case"LOG10":e="Math.log("+t+") / Math.log(10)"
break
case"ASIN":e="Math.asin("+t+") / Math.PI * 180"
break
case"ACOS":e="Math.acos("+t+") / Math.PI * 180"
break
case"ATAN":e="Math.atan("+t+") / Math.PI * 180"
break
default:throw Error("Unknown math operator: "+r)}return[e,a.JavaScript.ORDER_DIVISION]},a.JavaScript.math_constant=function(t){return{PI:["Math.PI",a.JavaScript.ORDER_MEMBER],E:["Math.E",a.JavaScript.ORDER_MEMBER],GOLDEN_RATIO:["(1 + Math.sqrt(5)) / 2",a.JavaScript.ORDER_DIVISION],SQRT2:["Math.SQRT2",a.JavaScript.ORDER_MEMBER],SQRT1_2:["Math.SQRT1_2",a.JavaScript.ORDER_MEMBER],INFINITY:["Infinity",a.JavaScript.ORDER_ATOMIC]}[t.getFieldValue("CONSTANT")]},a.JavaScript.math_number_property=function(t){var r=a.JavaScript.valueToCode(t,"NUMBER_TO_CHECK",a.JavaScript.ORDER_MODULUS)||"0",e=t.getFieldValue("PROPERTY")
if("PRIME"==e)return[a.JavaScript.provideFunction_("mathIsPrime",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(n) {","  // https://en.wikipedia.org/wiki/Primality_test#Naive_methods","  if (n == 2 || n == 3) {","    return true;","  }","  // False if n is NaN, negative, is 1, or not whole.","  // And false if n is divisible by 2 or 3.","  if (isNaN(n) || n <= 1 || n % 1 != 0 || n % 2 == 0 || n % 3 == 0) {","    return false;","  }","  // Check all the numbers of form 6k +/- 1, up to sqrt(n).","  for (var x = 6; x <= Math.sqrt(n) + 1; x += 6) {","    if (n % (x - 1) == 0 || n % (x + 1) == 0) {","      return false;","    }","  }","  return true;","}"])+"("+r+")",a.JavaScript.ORDER_FUNCTION_CALL]
switch(e){case"EVEN":var i=r+" % 2 == 0"
break
case"ODD":i=r+" % 2 == 1"
break
case"WHOLE":i=r+" % 1 == 0"
break
case"POSITIVE":i=r+" > 0"
break
case"NEGATIVE":i=r+" < 0"
break
case"DIVISIBLE_BY":i=r+" % "+(t=a.JavaScript.valueToCode(t,"DIVISOR",a.JavaScript.ORDER_MODULUS)||"0")+" == 0"}return[i,a.JavaScript.ORDER_EQUALITY]},a.JavaScript.math_change=function(t){var r=a.JavaScript.valueToCode(t,"DELTA",a.JavaScript.ORDER_ADDITION)||"0"
return(t=a.JavaScript.variableDB_.getName(t.getFieldValue("VAR"),a.VARIABLE_CATEGORY_NAME))+" = (typeof "+t+" == 'number' ? "+t+" : 0) + "+r+";\n"},a.JavaScript.math_round=a.JavaScript.math_single,a.JavaScript.math_trig=a.JavaScript.math_single,a.JavaScript.math_on_list=function(t){var r=t.getFieldValue("OP")
switch(r){case"SUM":t=a.JavaScript.valueToCode(t,"LIST",a.JavaScript.ORDER_MEMBER)||"[]",t+=".reduce(function(x, y) {return x + y;})"
break
case"MIN":t="Math.min.apply(null, "+(t=a.JavaScript.valueToCode(t,"LIST",a.JavaScript.ORDER_NONE)||"[]")+")"
break
case"MAX":t="Math.max.apply(null, "+(t=a.JavaScript.valueToCode(t,"LIST",a.JavaScript.ORDER_NONE)||"[]")+")"
break
case"AVERAGE":t=(r=a.JavaScript.provideFunction_("mathMean",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(myList) {","  return myList.reduce(function(x, y) {return x + y;}) / myList.length;","}"]))+"("+(t=a.JavaScript.valueToCode(t,"LIST",a.JavaScript.ORDER_NONE)||"[]")+")"
break
case"MEDIAN":t=(r=a.JavaScript.provideFunction_("mathMedian",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(myList) {","  var localList = myList.filter(function (x) {return typeof x == 'number';});","  if (!localList.length) return null;","  localList.sort(function(a, b) {return b - a;});","  if (localList.length % 2 == 0) {","    return (localList[localList.length / 2 - 1] + localList[localList.length / 2]) / 2;","  } else {","    return localList[(localList.length - 1) / 2];","  }","}"]))+"("+(t=a.JavaScript.valueToCode(t,"LIST",a.JavaScript.ORDER_NONE)||"[]")+")"
break
case"MODE":t=(r=a.JavaScript.provideFunction_("mathModes",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(values) {","  var modes = [];","  var counts = [];","  var maxCount = 0;","  for (var i = 0; i < values.length; i++) {","    var value = values[i];","    var found = false;","    var thisCount;","    for (var j = 0; j < counts.length; j++) {","      if (counts[j][0] === value) {","        thisCount = ++counts[j][1];","        found = true;","        break;","      }","    }","    if (!found) {","      counts.push([value, 1]);","      thisCount = 1;","    }","    maxCount = Math.max(thisCount, maxCount);","  }","  for (var j = 0; j < counts.length; j++) {","    if (counts[j][1] == maxCount) {","        modes.push(counts[j][0]);","    }","  }","  return modes;","}"]))+"("+(t=a.JavaScript.valueToCode(t,"LIST",a.JavaScript.ORDER_NONE)||"[]")+")"
break
case"STD_DEV":t=(r=a.JavaScript.provideFunction_("mathStandardDeviation",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(numbers) {","  var n = numbers.length;","  if (!n) return null;","  var mean = numbers.reduce(function(x, y) {return x + y;}) / n;","  var variance = 0;","  for (var j = 0; j < n; j++) {","    variance += Math.pow(numbers[j] - mean, 2);","  }","  variance = variance / n;","  return Math.sqrt(variance);","}"]))+"("+(t=a.JavaScript.valueToCode(t,"LIST",a.JavaScript.ORDER_NONE)||"[]")+")"
break
case"RANDOM":t=(r=a.JavaScript.provideFunction_("mathRandomList",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(list) {","  var x = Math.floor(Math.random() * list.length);","  return list[x];","}"]))+"("+(t=a.JavaScript.valueToCode(t,"LIST",a.JavaScript.ORDER_NONE)||"[]")+")"
break
default:throw Error("Unknown operator: "+r)}return[t,a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.math_modulo=function(t){return[(a.JavaScript.valueToCode(t,"DIVIDEND",a.JavaScript.ORDER_MODULUS)||"0")+" % "+(t=a.JavaScript.valueToCode(t,"DIVISOR",a.JavaScript.ORDER_MODULUS)||"0"),a.JavaScript.ORDER_MODULUS]},a.JavaScript.math_constrain=function(t){return["Math.min(Math.max("+(a.JavaScript.valueToCode(t,"VALUE",a.JavaScript.ORDER_NONE)||"0")+", "+(a.JavaScript.valueToCode(t,"LOW",a.JavaScript.ORDER_NONE)||"0")+"), "+(t=a.JavaScript.valueToCode(t,"HIGH",a.JavaScript.ORDER_NONE)||"Infinity")+")",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.math_random_int=function(t){var r=a.JavaScript.valueToCode(t,"FROM",a.JavaScript.ORDER_NONE)||"0"
return t=a.JavaScript.valueToCode(t,"TO",a.JavaScript.ORDER_NONE)||"0",[a.JavaScript.provideFunction_("mathRandomInt",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(a, b) {","  if (a > b) {","    // Swap a and b to ensure a is smaller.","    var c = a;","    a = b;","    b = c;","  }","  return Math.floor(Math.random() * (b - a + 1) + a);","}"])+"("+r+", "+t+")",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.math_random_float=function(t){return["Math.random()",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.math_atan2=function(t){var r=a.JavaScript.valueToCode(t,"X",a.JavaScript.ORDER_NONE)||"0"
return["Math.atan2("+(a.JavaScript.valueToCode(t,"Y",a.JavaScript.ORDER_NONE)||"0")+", "+r+") / Math.PI * 180",a.JavaScript.ORDER_DIVISION]},a.JavaScript.procedures={},a.JavaScript.procedures_defreturn=function(t){var r=a.JavaScript.variableDB_.getName(t.getFieldValue("NAME"),a.PROCEDURE_CATEGORY_NAME),e=""
a.JavaScript.STATEMENT_PREFIX&&(e+=a.JavaScript.injectId(a.JavaScript.STATEMENT_PREFIX,t)),a.JavaScript.STATEMENT_SUFFIX&&(e+=a.JavaScript.injectId(a.JavaScript.STATEMENT_SUFFIX,t)),e&&(e=a.JavaScript.prefixLines(e,a.JavaScript.INDENT))
var i=""
a.JavaScript.INFINITE_LOOP_TRAP&&(i=a.JavaScript.prefixLines(a.JavaScript.injectId(a.JavaScript.INFINITE_LOOP_TRAP,t),a.JavaScript.INDENT))
var c=a.JavaScript.statementToCode(t,"STACK"),n=a.JavaScript.valueToCode(t,"RETURN",a.JavaScript.ORDER_NONE)||"",v=""
c&&n&&(v=e),n&&(n=a.JavaScript.INDENT+"return "+n+";\n")
for(var S=[],p=t.getVars(),E=0;E<p.length;E++)S[E]=a.JavaScript.variableDB_.getName(p[E],a.VARIABLE_CATEGORY_NAME)
return e="function "+r+"("+S.join(", ")+") {\n"+e+i+c+v+n+"}",e=a.JavaScript.scrub_(t,e),a.JavaScript.definitions_["%"+r]=e,null},a.JavaScript.procedures_defnoreturn=a.JavaScript.procedures_defreturn,a.JavaScript.procedures_callreturn=function(t){for(var r=a.JavaScript.variableDB_.getName(t.getFieldValue("NAME"),a.PROCEDURE_CATEGORY_NAME),e=[],i=t.getVars(),c=0;c<i.length;c++)e[c]=a.JavaScript.valueToCode(t,"ARG"+c,a.JavaScript.ORDER_NONE)||"null"
return[r+"("+e.join(", ")+")",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.procedures_callnoreturn=function(t){return a.JavaScript.procedures_callreturn(t)[0]+";\n"},a.JavaScript.procedures_ifreturn=function(t){var r="if ("+(a.JavaScript.valueToCode(t,"CONDITION",a.JavaScript.ORDER_NONE)||"false")+") {\n"
return a.JavaScript.STATEMENT_SUFFIX&&(r+=a.JavaScript.prefixLines(a.JavaScript.injectId(a.JavaScript.STATEMENT_SUFFIX,t),a.JavaScript.INDENT)),t.hasReturnValue_?(t=a.JavaScript.valueToCode(t,"VALUE",a.JavaScript.ORDER_NONE)||"null",r+=a.JavaScript.INDENT+"return "+t+";\n"):r+=a.JavaScript.INDENT+"return;\n",r+"}\n"},a.JavaScript.texts={},a.JavaScript.text=function(t){return[a.JavaScript.quote_(t.getFieldValue("TEXT")),a.JavaScript.ORDER_ATOMIC]},a.JavaScript.text_multiline=function(t){var r=-1!=(t=a.JavaScript.multiline_quote_(t.getFieldValue("TEXT"))).indexOf("+")?a.JavaScript.ORDER_ADDITION:a.JavaScript.ORDER_ATOMIC
return[t,r]},a.JavaScript.text.forceString_=function(t){return a.JavaScript.text.forceString_.strRegExp.test(t)?[t,a.JavaScript.ORDER_ATOMIC]:["String("+t+")",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.text.forceString_.strRegExp=/^\s*'([^']|\\')*'\s*$/,a.JavaScript.text_join=function(t){switch(t.itemCount_){case 0:return["''",a.JavaScript.ORDER_ATOMIC]
case 1:return t=a.JavaScript.valueToCode(t,"ADD0",a.JavaScript.ORDER_NONE)||"''",a.JavaScript.text.forceString_(t)
case 2:var r=a.JavaScript.valueToCode(t,"ADD0",a.JavaScript.ORDER_NONE)||"''"
return t=a.JavaScript.valueToCode(t,"ADD1",a.JavaScript.ORDER_NONE)||"''",[t=a.JavaScript.text.forceString_(r)[0]+" + "+a.JavaScript.text.forceString_(t)[0],a.JavaScript.ORDER_ADDITION]
default:r=Array(t.itemCount_)
for(var e=0;e<t.itemCount_;e++)r[e]=a.JavaScript.valueToCode(t,"ADD"+e,a.JavaScript.ORDER_NONE)||"''"
return[t="["+r.join(",")+"].join('')",a.JavaScript.ORDER_FUNCTION_CALL]}},a.JavaScript.text_append=function(t){var r=a.JavaScript.variableDB_.getName(t.getFieldValue("VAR"),a.VARIABLE_CATEGORY_NAME)
return t=a.JavaScript.valueToCode(t,"TEXT",a.JavaScript.ORDER_NONE)||"''",r+" += "+a.JavaScript.text.forceString_(t)[0]+";\n"},a.JavaScript.text_length=function(t){return[(a.JavaScript.valueToCode(t,"VALUE",a.JavaScript.ORDER_MEMBER)||"''")+".length",a.JavaScript.ORDER_MEMBER]},a.JavaScript.text_isEmpty=function(t){return["!"+(a.JavaScript.valueToCode(t,"VALUE",a.JavaScript.ORDER_MEMBER)||"''")+".length",a.JavaScript.ORDER_LOGICAL_NOT]},a.JavaScript.text_indexOf=function(t){var r="FIRST"==t.getFieldValue("END")?"indexOf":"lastIndexOf",e=a.JavaScript.valueToCode(t,"FIND",a.JavaScript.ORDER_NONE)||"''"
return r=(a.JavaScript.valueToCode(t,"VALUE",a.JavaScript.ORDER_MEMBER)||"''")+"."+r+"("+e+")",t.workspace.options.oneBasedIndex?[r+" + 1",a.JavaScript.ORDER_ADDITION]:[r,a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.text_charAt=function(t){var r=t.getFieldValue("WHERE")||"FROM_START",e=a.JavaScript.valueToCode(t,"VALUE","RANDOM"==r?a.JavaScript.ORDER_NONE:a.JavaScript.ORDER_MEMBER)||"''"
switch(r){case"FIRST":return[e+".charAt(0)",a.JavaScript.ORDER_FUNCTION_CALL]
case"LAST":return[e+".slice(-1)",a.JavaScript.ORDER_FUNCTION_CALL]
case"FROM_START":return[e+".charAt("+(t=a.JavaScript.getAdjusted(t,"AT"))+")",a.JavaScript.ORDER_FUNCTION_CALL]
case"FROM_END":return[e+".slice("+(t=a.JavaScript.getAdjusted(t,"AT",1,!0))+").charAt(0)",a.JavaScript.ORDER_FUNCTION_CALL]
case"RANDOM":return[a.JavaScript.provideFunction_("textRandomLetter",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(text) {","  var x = Math.floor(Math.random() * text.length);","  return text[x];","}"])+"("+e+")",a.JavaScript.ORDER_FUNCTION_CALL]}throw Error("Unhandled option (text_charAt).")},a.JavaScript.text.getIndex_=function(a,t,r){return"FIRST"==t?"0":"FROM_END"==t?a+".length - 1 - "+r:"LAST"==t?a+".length - 1":r},a.JavaScript.text_getSubstring=function(t){var r=t.getFieldValue("WHERE1"),e=t.getFieldValue("WHERE2"),i="FROM_END"!=r&&"LAST"!=r&&"FROM_END"!=e&&"LAST"!=e,c=a.JavaScript.valueToCode(t,"STRING",i?a.JavaScript.ORDER_MEMBER:a.JavaScript.ORDER_NONE)||"''"
if("FIRST"==r&&"LAST"==e)return[c,a.JavaScript.ORDER_NONE]
if(c.match(/^'?\w+'?$/)||i){switch(r){case"FROM_START":i=a.JavaScript.getAdjusted(t,"AT1")
break
case"FROM_END":i=c+".length - "+(i=a.JavaScript.getAdjusted(t,"AT1",1,!1,a.JavaScript.ORDER_SUBTRACTION))
break
case"FIRST":i="0"
break
default:throw Error("Unhandled option (text_getSubstring).")}switch(e){case"FROM_START":t=a.JavaScript.getAdjusted(t,"AT2",1)
break
case"FROM_END":t=c+".length - "+(t=a.JavaScript.getAdjusted(t,"AT2",0,!1,a.JavaScript.ORDER_SUBTRACTION))
break
case"LAST":t=c+".length"
break
default:throw Error("Unhandled option (text_getSubstring).")}r=c+".slice("+i+", "+t+")"}else{i=a.JavaScript.getAdjusted(t,"AT1"),t=a.JavaScript.getAdjusted(t,"AT2")
var n=a.JavaScript.text.getIndex_,v={FIRST:"First",LAST:"Last",FROM_START:"FromStart",FROM_END:"FromEnd"}
r=a.JavaScript.provideFunction_("subsequence"+v[r]+v[e],["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(sequence"+("FROM_END"==r||"FROM_START"==r?", at1":"")+("FROM_END"==e||"FROM_START"==e?", at2":"")+") {","  var start = "+n("sequence",r,"at1")+";","  var end = "+n("sequence",e,"at2")+" + 1;","  return sequence.slice(start, end);","}"])+"("+c+("FROM_END"==r||"FROM_START"==r?", "+i:"")+("FROM_END"==e||"FROM_START"==e?", "+t:"")+")"}return[r,a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.text_changeCase=function(t){var r={UPPERCASE:".toUpperCase()",LOWERCASE:".toLowerCase()",TITLECASE:null}[t.getFieldValue("CASE")]
return t=a.JavaScript.valueToCode(t,"TEXT",r?a.JavaScript.ORDER_MEMBER:a.JavaScript.ORDER_NONE)||"''",[r?t+r:a.JavaScript.provideFunction_("textToTitleCase",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(str) {","  return str.replace(/\\S+/g,","      function(txt) {return txt[0].toUpperCase() + txt.substring(1).toLowerCase();});","}"])+"("+t+")",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.text_trim=function(t){var r={LEFT:".replace(/^[\\s\\xa0]+/, '')",RIGHT:".replace(/[\\s\\xa0]+$/, '')",BOTH:".trim()"}[t.getFieldValue("MODE")]
return[(a.JavaScript.valueToCode(t,"TEXT",a.JavaScript.ORDER_MEMBER)||"''")+r,a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.text_print=function(t){return"window.alert("+(a.JavaScript.valueToCode(t,"TEXT",a.JavaScript.ORDER_NONE)||"''")+");\n"},a.JavaScript.text_prompt_ext=function(t){var r="window.prompt("+(t.getField("TEXT")?a.JavaScript.quote_(t.getFieldValue("TEXT")):a.JavaScript.valueToCode(t,"TEXT",a.JavaScript.ORDER_NONE)||"''")+")"
return"NUMBER"==t.getFieldValue("TYPE")&&(r="Number("+r+")"),[r,a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.text_prompt=a.JavaScript.text_prompt_ext,a.JavaScript.text_count=function(t){var r=a.JavaScript.valueToCode(t,"TEXT",a.JavaScript.ORDER_NONE)||"''"
return t=a.JavaScript.valueToCode(t,"SUB",a.JavaScript.ORDER_NONE)||"''",[a.JavaScript.provideFunction_("textCount",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(haystack, needle) {","  if (needle.length === 0) {","    return haystack.length + 1;","  } else {","    return haystack.split(needle).length - 1;","  }","}"])+"("+r+", "+t+")",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.text_replace=function(t){var r=a.JavaScript.valueToCode(t,"TEXT",a.JavaScript.ORDER_NONE)||"''",e=a.JavaScript.valueToCode(t,"FROM",a.JavaScript.ORDER_NONE)||"''"
return t=a.JavaScript.valueToCode(t,"TO",a.JavaScript.ORDER_NONE)||"''",[a.JavaScript.provideFunction_("textReplace",["function "+a.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(haystack, needle, replacement) {",'  needle = needle.replace(/([-()\\[\\]{}+?*.$\\^|,:#<!\\\\])/g,"\\\\$1")','                 .replace(/\\x08/g,"\\\\x08");',"  return haystack.replace(new RegExp(needle, 'g'), replacement);","}"])+"("+r+", "+e+", "+t+")",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.text_reverse=function(t){return[(a.JavaScript.valueToCode(t,"TEXT",a.JavaScript.ORDER_MEMBER)||"''")+".split('').reverse().join('')",a.JavaScript.ORDER_FUNCTION_CALL]},a.JavaScript.variables={},a.JavaScript.variables_get=function(t){return[a.JavaScript.variableDB_.getName(t.getFieldValue("VAR"),a.VARIABLE_CATEGORY_NAME),a.JavaScript.ORDER_ATOMIC]},a.JavaScript.variables_set=function(t){var r=a.JavaScript.valueToCode(t,"VALUE",a.JavaScript.ORDER_ASSIGNMENT)||"0"
return a.JavaScript.variableDB_.getName(t.getFieldValue("VAR"),a.VARIABLE_CATEGORY_NAME)+" = "+r+";\n"},a.JavaScript.variablesDynamic={},a.JavaScript.variables_get_dynamic=a.JavaScript.variables_get,a.JavaScript.variables_set_dynamic=a.JavaScript.variables_set,a.JavaScript}))
