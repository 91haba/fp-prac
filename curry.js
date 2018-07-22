// 커링 : 함수에 인자를 하나씩 적용해 나가다가 필요한 인자가 모두 채워지면 함수 본체 실행
// 자바스크립트에서는 지원 되지 않지만, 1급 함수가 지원되고, 평가시점을 마음대로 다룰 수 있기 때문ㅇ
// 커링 구현 가능

    // 1. _curry, _curryr

    function _curry(fn){
        return function(a){
            return function(b){
                return fn(a,b);
            }
        }
    }

    /*function add(a,b){
        return a+b;
    }*/
    var add = _curry(function(a,b){
        return a+b;
    });
    var add10 = add(10);

    console.log(add(10,5));
    console.log(add10(5));


