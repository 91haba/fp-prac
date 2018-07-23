// 커링 : 함수에 인자를 하나씩 적용해 나가다가 필요한 인자가 모두 채워지면 함수 본체 실행
// 자바스크립트에서는 지원 되지 않지만, 1급 함수가 지원되고, 평가시점을 마음대로 다룰 수 있기 때문ㅇ
// 커링 구현 가능
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

    // 1. _curry, _curryr

    function _curry(fn){
        return function(a){
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
    function _curryr(fn){
        return function(a,b){
            return arguments.length == 2 ? fn(a,b) : function(b){ return fn(b, a)};
        }
    }

    /*function add(a,b){
        return a+b;
    }*/
    var add = _curry(function(a,b){
        return a+b;
    });
    /*
    var add = function(a){
        return fuction(b){
            return fn(a,b);
        }
    }
    */
    var add10 = add(10);

    console.log(add(10,5));
    console.log(add10(5));


    //함수가 function(a) 까지만 실행이되어 function(b)가 return
    console.log(add(1,2))

    var sub = _curryr(function(a,b){
        return a-b;
    });

    //5
    console.log( sub(10,5) );

    var sub10 = sub(10);

    //-5
    console.log( sub10(5) );

    //_curryr, curry와는 달리 인자를 오른쪽에서부터 적용

    // 2. _get 만들어 좀 더 간단하게 하기
   /* function _get(obj, key){
        return obj == null ? undefined : obj[key];
    }*/
    var _get = _curryr(function(obj,key){
        return obj == null ? undefined : obj[key];
    });
    var user1 = users[0];
    console.log(user1.name);
    console.log(_get(user1, 'name'));

    //error
    console.log( users[10].name );
    //undefined
    console.log(_get(users[0], 'name'));
    //curryr 적용
    console.log(_get('name')(users[10]));


    

