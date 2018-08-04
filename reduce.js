//기본적으로 원래자료와는 다르게 축약된 형태로 사용하기 위해 주로 사용됨
//ex. array로 숫자 하나를 뽑아내거나 or array로 객체 하나를 만들어 내거나


function _each(list,iter){
    for(var i=0;i<list.length;i++){
        iter(list[i]);
    }
    return list;
}

//앞서 작성한 each, map, filter 는 인자가 array가 아니어도 사용 가능했던것처럼 
//reduce도 똑같이
function _reduce(list, iter, memo) {
    if (arguments.length == 2) {
        memo = list[0];

        //slice 메서드는 array에서만 사용이 가능함
        //slice 메서드는 앞에서 부터 인자로 주는 갯수만큼 배열을 잘라서 리턴하는 메서드
        list = list.slice(1);

        //따라서 함수 사용의 범용성을 위해 다음과 같이 활용할수 있는데
        var slice = Array.prototype.slice;
        slice.call(a,2)
        slice.call(a,2).constructor;

        //다음과 같은 array처럼 동작할 수 있는 객체에서
        var a = { 0: 1, 1:20,2:30, length:3 };
        a[0]
        //1
        a[1]
        //20
        a[2]
        //30
        slice.call(a,1);
        //[20,30]
    }
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
/* 즉 reduce는 요런 느낌
memo = add(0,1);
memo = add(memo,2);
memo = add(memo,3);
return memo;
            */
add(add(add(0,1),2),3);

//세번째 인자를 생략하는 방법
//ex
console.log(
    _reduce([1,2,3], add, 10)
);
//16
console.log(
    _reduce([1,2,3], add)
);
 //6
//==> add(add(1,2),3);

//rest -> 
//_reduce 함수 내에서 argument나 jquery 객체나, nodelist를 비롯한 다양한 arraylike 객체를 앞부분을 slice 할 수있게함

var slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1);//넘겨준 값이 없으면 기본값 1
}

//이를 이용해 reduce 함수를 다음과 같이 변경가능
function __reduce(list,iter,meme) {

    if (arguments.length == 2) {
        memo = list[0];
        list = _rest(list);
    }
    //이처럼 reduce 함수를 수정해주면
    //memo가 인자로 들어오지 않아도 아래의 코드가 정상적으로 실행됨
    _each(list, function(val){
        memo = iter(memo,val);
    })
}

//확인
console.log(
    __reduce([1,2,3], add)
); //6

console.log (
    __reduce([1,2,3,4],add, 0)
); //20
