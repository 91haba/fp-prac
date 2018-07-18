//함수형 프로그래밍
//순수함수 : 외부요소에 영향을 미치지 않는
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
// 1. 명령형 코드
// 30세 이상인 users를 거름
var temp_users = [];
for (var i=0; i<users.length;i++){
    if (users[i].age >= 30){
        temp_users.push(users[i]);
    }
}
console.log(temp_users);

// 2. 30세 이상인 user의 names를 수집한다
var names = [];
for(var i=0;i<temp_users.length;i++){
    names.push(temp_users[i].name);
}
console.log(names);

// 3. 30세 미만인 users를 거른다
var temp_users = [];
for (var i=0; i<users.length;i++){
    if (users[i].age < 30){
        temp_users.push(users[i]);
    }
}

// 4. 30세 미만인 users의 ages를 수집
var ages = [];
for(var i=0; i< temp_users.length;i++){
    ages.push(temp_users[i]);
}
console.log(ages);


// 2. _filter, _map으로 리팩토링
// 응용형 함수 : 함수가 함수를 받아서 원하는 시점에 해당하는 함수가 알고있는 인자를 적용하는 방식으로 프로그래밍함 = 응용형 프로그래밍, 적용형 프로그래밍
// 고차 함수
function _filter(users,predi){
    var new_list = [];
    for(var i=0;i<users.length;i++){
        if(predi(users[i])){
            new_list.push(users[i]);
        }
    }
    return new_list;
}
function _map(list,mapper){
    var new_list = [];
    for(var i=0;i<list.length;i++){
        new_list.push(mapper(list[i]));
    }
    return new_list;
}
var over_30 =  _filter(users, function(user){return user.age >= 30;})
console.log(over_30);

var names = _map(over_30,function(user){
    return user.name;
})
console.log(names);

var under_30 = _filter(users,function(user){return user.age < 30;})
console.log(under_30)
 var ages = _map(under_30,function(user){
     return user.age;
 })
 console.log(ages);