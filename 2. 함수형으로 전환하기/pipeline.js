
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

    //3.users에 go 적용

    var users = [

        {id: 1, name: 'ID', age:36 },
        {id: 2, name: 'BJ', age:32 },
        {id: 3, name: 'JM', age:32 },
        {id: 4, name: 'PJ', age:27 },
        {id: 5, name: 'HA', age:25 },
        {id: 6, name: 'JE', age:26 },
        {id: 7, name: 'JI', age:31 },
        {id: 8, name: 'MP', age:23 }
    
    ]

    function _map(list,mapper){
        var new_list = [];
        for(var i=0;i<list.length;i++){
            new_list.push(mapper(list[i]));
        }
        return new_list;
    }
    function _filter(users,predi){
        var new_list = [];
        for(var i=0;i<users.length;i++){
            if(predi(users[i])){
                new_list.push(users[i]);
            }
        }
        return new_list;
    }
    //curry
    function _curry(fn){
        return function(a,b){
            //인자가 2개 들어오면 return하지 않고 즉시실행 하는 코드 삽입
            //인자가 1개씩 들어오면 함수 실행을 미룸
            /*if (arguments.length == 2) return fn(a, b);
            return function(b){
                return fn(a,b);
            }*/
            //refactor
            return arguments.length == 2 ? fn(a,b) : function(b){ return fn(a,b); };
        }
    }
    //curryr
    function _curryr(fn){
        return function(a,b){
            return arguments.length == 2 ? fn(a,b) : function(b){ return fn(b, a)};
        }
    }
    var _get = _curryr(function(obj,key){
        return obj == null ? undefined : obj[key];
    });
    /*
    console.log(
        _map(
            _filter(users,function(user){return user.age>=30;}),
        _get('name'))
    );
    console.log(
        _map(
            _filter(users,function(user){return user.age<30;}),
        _get('age'))
    );*/


    // _go 함수를 이용하여 위와 같은 결과를 출력해보면 
    _go(users, //users가 들어오면
        function(users) {
            //users를 filter 한 것을
            return _filter(users,function(user){
                return user.age >= 30;
            });
        },
        function(users) { //filter된 users를 받아옴
            return _map(users, _get('name'));
        },
        //console.log에 담아줌
    console.log);
    _go(users, //users가 들어오면
        function(users) {
            //users를 filter 한 것을
            return _filter(users,function(user){
                return user.age < 30;
            });
        },
        function(users) { //filter된 users를 받아옴
            return _map(users, _get('age'));
        },
        //console.log에 담아줌
    console.log);

    //curryr을 이용하여 위 함수를 더 간결하게 refactoring

    //아래는 두 console.log는 같은 결과를 출력
    console.log(
        _map([1,2,3],function(val){return val * 2;}));

    //map과 filter에 curryr 적용 
    var _map = _curryr(_map);
    var _filter = _curryr(_filter);
    //이를 _go 함수에 적용하여 설명하면
    //_map에 함수를 하나 넣은 결과가 함수이고 [1,2,3]이 _go함수에서의 인자인(users) 라고 생각해보았을 때
    //아래의 curryr을 적용한 _map이 어떤식으로 _go에 적용될지 예측해볼 수 있음
    console.log(
        _map(function(val){return val*2;})([1,2,3]));


    //_go에 curryr 적용 결과

    //기존
    _go(users, //users가 들어오면
        function(users) {
            //users를 filter 한 것을
            return _filter(users,function(user){
                return user.age >= 30;
            });
        },
        function(users) { //filter된 users를 받아옴
            return _map(users, _get('name'));
        },
        //console.log에 담아줌
    console.log);

    //refactoring
    _go(users, 
        //_filter에 function(user){...} 함수를 적용할 예정인 새로운 함수를 return
        //이 함수는 users를 인자로 받음(한개만)
        _filter(function(user){ return user.age >= 30;}),
        //_map도 같은 방식으로 다음과 같이변경 가능
        _map(_get('name')),
        //console.log에 담아줌
    console.log);

    _go(users,
    _filter(users => users.age >= 30),
    _map(_get('age')),
    console.log);

    //위를 화살표함수로 표현하면
    _go(users,
    _filter(user => user.age < 30),
    _map(user => user.age),
    console.log);
    //함수형 프로그래밍
    // 순수함수들을 평가시점을 다루면서 조합성을 강조하는 프로그래밍
    //추상화의 단위를 함수로 하는 프로그래밍!
 
