
//5. 파이프라인 만들기
    // 1. pipe : 인자로 들어오는 함수를 연속적으로 실행할 준비가 된 함수를 리턴하는 함수, 
    // 함수만 받는 함수, 함수를 다루는 함수
    // pipe의 추상화된 버전이 reduce
    // pipe는 reduce로 축약을 하는데 함수 배열을 통해서 인자를 연속적으로 적용한
    // 최종 결과를 출력하는 것

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
        //함수를 리턴, pipe의 실행결과는 함수, 나중에 실행됨 함수를 return
        return function(arg){
            //실행되었을 때 만들 결과
            //모든 함수를 돌면서 fn 함수에 인자를 적용한 결과를 return 하면, 그 결과는
            //다시 arg가 되고, 그 결과를 다시 fn에 적용하는 것을 반복
            //이러한 방식으로 아래의 f1 함수가 정상적으로 동작하게 만듬
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
    //순서대로 함수를 표현해주는 표현력을 가진 함수라 할 수 있음

    function _go(arg){
        //arguments에서 첫번째값들을 제외한 것들이 arguments가 되어야함
        //만들어둔 _rest 함수를 활용
        //다음과 같이 argument는 array가 아닌 array like 객체
        //앞의 인자 하나가 제외된 fns 생성
        var fns = _rest(arguments);

        //_pipe함수는 인자'들' 로서 fns를 받기 때문에 
        //apply를 활용
        return _pipe().apply(null,fns)(arg);
        /*  apply 보충 설명 
        
        _go 를 만들때 apply 를 통해 _pipe 함수에 인자들을 전달한 이유는 
        _pipe 가 함수들을 인자로 받을때 배열로 받지 않기 때문입니다.
        근데 _go 안에서 전달할 fns 는 하나의 배열이라, 
        그 배열속에 들어있는 함수들을 _pipe 에서 쓰기 위해 apply 를 사용했습니다.
        
        */

    }
    //_go는 _pipe의 즉시 실행 버전임
    //1로 시작해서 차례대로 실행
    _go(1,
        function(a) {return a + 1;},
        function(a) {return a * 2;},
        function(a) {return a * a;},
        console.log()
    )
