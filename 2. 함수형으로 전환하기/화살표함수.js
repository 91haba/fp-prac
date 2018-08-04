// 4. 화살표함수 간단히

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

var a = function(user){return users.age >= 30; };
var a = user => user.age >= 30;
var add = function(a,b){ return a+b; };
var add = (a,b) => a+b;
//내용이 길어지면
var add_ = (a,b) => {
    //
    return a+b;
}

//객체 자체를 리턴하고 싶으면
var addObject = (a,b) => ({val:a+b});