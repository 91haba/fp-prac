// 6. each의 외부 다형성 높이기

function _curryr(fn){
    return function(a,b){
        return arguments.length == 2 ? fn(a,b) : function(b){ return fn(b, a)};
    }
}
//curryr 함수를 사용하여 구현한 _get 함수
var _get = _curryr(function(obj,key){
    return obj == null ? undefined : obj[key];
});

function _each(list,iter){
    for(var i=0;i<list.length;i++){
        iter(list[i]);
    }
    return list;
}

//1. _each에 null 넣어도 에러 안나게

//에러발생코드, null을 참조하지 못함 -> TypeError: Cannot read property 'length' of null
//_each(null,console.log);

//_get 함수에서 null 처리 하는 방식을 차용
var _length = _get('length');

function __each(list, iter) {
    for(var i = 0, len = _length(list); i < len; i++) {
        iter(list[i]);
    }
    return list
}
//__each 함수를 이용한 filter 구현
function __filter(list,predi){
    var new_list = [];
    __each(list, function(val){
        if(predi(val))  new_list.push(val);
    });
    return new_list;
}
//__each 함수를 이용한 map 구현
function __map(list,mapper){
    var new_list = [];
    __each(list,function(val){
        new_list.push(mapper(val))
    });
    return new_list;
}

var __map = _curryr(__map);
var __filter = _curryr(__filter);

//빈 배열 return
__each(null,console.log);
console.log(__map(null, function(v){ return v; }));
console.log(__filter(null, function(v){return v;}));

var slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1);//넘겨준 값이 없으면 기본값 1
}
function _reduce(list, iter, memo) {
    _each(list,function(val){
        memo = iter(memo,val);
    });
    return memo;
}

function _pipe(){
    var fns = arguments;
    return function(arg){
        return _reduce(fns,function(arg,fn){
            return fn(arg);
        },arg);
    }
}

function _go(arg){
    var fns = _rest(arguments);
    return _pipe().apply(null,fns)(arg);
}

//함수형 프로그래밍에서는 함수의 연속실행을 할 때
//언제 어디서 undefined나 , 잘못된 값이 들어와도 특별히 error가 나지 않고 흘려 보낼 수 있는
//전략을 많이 취함
_go(null,
__filter(function(v){return v;}),
__map(function(v){return v;}),
console.log);