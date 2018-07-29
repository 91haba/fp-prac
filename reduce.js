//기본적으로 원래자료와는 다르게 축약된 형태로 사용하기 위해 주로 사용됨
//ex. array로 숫자 하나를 뽑아내거나 or array로 객체 하나를 만들어 내거나

function _each(list,iter){
    for(var i=0;i<list.length;i++){
        iter(list[i]);
    }
    return list;
}

function _reduce(list, iter, memo) {
    _each(list,function(val){
        memo = iter(memo,val);
    });
    return memo;
}
var add = function(a,b){
    return a+b;
}

console.log(_reduce([1,2,3,4], add, 0));
console.log (
    _reduce(
        [1,2,3], function(a, b){

        },0));

memo = add(0,1);
memo = add(memo,2);
memo = add(memo,3);
return memo;

add(add(add(0,1),2),3);