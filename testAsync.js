async function a(num) {
    console.log('a ' + num + ' starting');
    await setTimeout(function(){console.log('a ' + num + ' timeout')}, num * 1000);
    console.log('a() ' + num + ' seconds');
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

a(3);
a(1);