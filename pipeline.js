
//5. 파이프라인 만들기
    // 1. pipe : 인자로 들어오는 함수를 연속적으로 실행할 준비가 된 함수를 리턴하는 함수, 
    // 함수만 받는 함수, 함수를 다루는 함수
    // pipe의 추상화된 버전이 reduce
    // pipe는 reduce로 축약, 

    //rest -> 
    //_reduce 함수 내에서 argument나 jquery 객체나, nodelist를 비롯한 다양한 arraylike 객체를 앞부분을 slice 할 수있게함

    var slice = Array.prototype.slice;
    function _rest(list, num) {
        return slice.call(list, num || 1);//넘겨준 값이 없으면 기본값 1
    }

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

    function _pipe(){
        var fns = arguments;
        return function(arg){
            return _reduce(fns,function(arg,fn){
                return fn(arg);
            },arg);
        }
    }
    //f1에는 함수가 담김
    var f1 = _pipe(
        function(a) {return a+1;}, // 1+1
        function(a) {return a*2;} // 2*2
    );

    f1(1)

    console.log(f1(1));

    //2. _go: pipe 함수인데 즉시 실행되는 pipe 함수임
    //첫번째 인자로는 인자를 받고 두번쨰 부터는 함수를 받음


    function _go(){
        //arguments에서 첫번째값들을 제외한 것들이 arguments가 되어야함
    }
    //1로 시작해서 차례대로 실행
    _go(1,
        function(a) {return a + 1;},
        function(a) {return a * 2;},
        function(a) {return a * a;},
        console.log()
    )