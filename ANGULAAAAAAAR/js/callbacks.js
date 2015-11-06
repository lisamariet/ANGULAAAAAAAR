





function doSomMagic(e) {

    var time = new Date();
    e(time);

}



doSomMagic(function (whatever) {

    alert(whatever);

});
