function writeText(){
    var target = document.getElementsByClassName("main-text hide")[0]
    var glitch = document.getElementsByClassName("glitch hide")[0]

    var textSplit = target.innerHTML
    target.className = "main-text"
    target.innerHTML = ""
    
    var glitchTextSplit = glitch.innerHTML
    glitch.className = "glitch"
    glitch.innerHTML = ""

    for (let index = 0; index < textSplit.length; index++) {
        var written = ""
        const element = textSplit[index];
        setTimeout(function(){
            written += element
            target.innerHTML = written;
        }, 100*index);
    }
    setTimeout(function(){
        for (let index = 0; index < glitchTextSplit.length; index++) {
            var written = ""
            const element = glitchTextSplit[index];
            setTimeout(function(){
                written += element
                glitch.innerHTML = written;
                glitch.dataset.text = written
            }, 150*index);
        }
    }, 100*(textSplit.length+1));
    
}

function draw()
{
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#09ed1c";
    ctx.font = font_size + "px arial";
    for(var i = 0; i < drops.length; i++)
    {
        var text = matrix[Math.floor(Math.random()*matrix.length)];
        ctx.fillText(text, i*font_size, drops[i]*font_size);

        if(drops[i]*font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;

        drops[i]++;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var c = document.getElementById("c");
    ctx = c.getContext("2d");

    c.height = window.innerHeight;
    c.width = window.innerWidth;

    matrix = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ123456789#$%^&*()*&^%+-/~{[|`]}";
    matrix = matrix.split("");

    font_size = 10
    var columns = c.width/font_size;

    drops = [];

    for(var x = 0; x < columns; x++)
        drops[x] = c.height; 
    elements = document.querySelectorAll('.number');
    setInterval(draw, 35);
    writeText()
}, false);

window.addEventListener('resize', function() {
    c.height = window.innerHeight;
    c.width = window.innerWidth;

    var columns = c.width/font_size;
    drops = [];

    for(var x = 0; x < columns; x++)
        drops[x] = c.height; 
}, true);

function countUp(entries){
    entries.forEach(entry => {
        var startNum = Number(entry.target.dataset.number)
        entry.target.innerHTML = 0
        var number = 0
        var time = 0
        for (let index = 0; index < startNum; index++) {
            number += 1
            time += Math.random()*(1500/startNum)
            setTimeout(function(number){
            
                var formattedNumberUS = number.toLocaleString('en-US');
                entry.target.innerHTML = formattedNumberUS;
            }, time, number);
        }
    })
    
}   


document.addEventListener('DOMContentLoaded', function() {
    elements = document.querySelectorAll('.number');      
      var observer = new IntersectionObserver(countUp);
      const options = { root: null, rootMargin: '0px', threshold: 1 }; 
    
      elements.forEach(el => {
        observer.observe(el, options);
      });

    const banner = document.querySelector('.banner');
    banner.classList.remove('banner-transition');

    var observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        banner.classList.add('banner-transition');
        return;
        }

        banner.classList.remove('banner-transition');
    });
    });

    observer.observe(banner);
}, false);

//   // Get multiple elements instead of a single one using "querySelectorAll"
//   const squares = document.getElementsByClassName('number');
//   console.log(squares)
//   // Loop over the elements and add each one to the observer
//   Array.from(squares).forEach((element) => observer.observe(element));

// TODO
// 1 - Finish content - ALMOST
// 2 - Add animation on scroll - Done 
// 3 - Js function to count up to number also on scroll - DONE
// 4 - Add cv link
// 5 - Buy domain - DONE
// 6 - Add email link
// 7 - add footer