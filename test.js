function _curryr(fn){
    return function(a,b){
        return arguments.length == 2 ? fn(a,b) : function(b){ return fn(b, a)};
    }
}
var sub = _curryr(function(a,b){
    return a-b;
});

//console.log( sub(10,5) );

var sub10 = sub(10);

console.log( sub(10,5) );
var sub105 = sub10(5)
console.log(sub105)

