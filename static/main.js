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
//add change color??
INDEX = [["#09ed1c", 50, 0.3,1],["#09ed1c", 35, 0.1,1],["aqua", 30, 0.08,1], ["white", 20, 0.04,1.2], ["orange", 10, 0.04,1.3], ["red", 5, 0.04, 1.6]]
function draw(index, c, previos)
{
    var level = c.firstChild.textContent
    if (level != previos) {
      var c = Array.from(document.getElementsByClassName("c"))[0]
      c.width = c.getBoundingClientRect().width;
      c.height = c.getBoundingClientRect().height;
    }
    var data = INDEX[level]
    var drops = dropArray[index]
    var ctx = c.getContext("2d");
    ctx.fillStyle = `rgba(0, 0, 0, ${data[2]})`;
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = data[0];
    var multiplier = data[3]
    ctx.font = font_size*multiplier + "px arial";
    for(var i = 0; i < drops.length; i++)
    {

        var text = matrix[Math.floor(Math.random()*matrix.length)];
        ctx.fillText(text, i*font_size*multiplier, drops[i]*font_size*multiplier);

        if(drops[i]*font_size*multiplier > c.height && Math.random() > 0.975)
            drops[i] = 0;

        drops[i]++;
    }
    setTimeout(function() { draw(index, c, level); }, data[1]);
}
dropArray = [];
document.addEventListener('DOMContentLoaded', function() {
    var canvases = Array.from(document.getElementsByClassName("c"));


    canvases.forEach(function (c, index){
        c.width = c.getBoundingClientRect().width;
        c.height = c.getBoundingClientRect().height;

        matrix = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ123456789#$%^&*()*&^%+-/~{[|`]}";
        matrix = matrix.split("");

        font_size = 10
        var columns = c.width/font_size;

        var drops = [];

        for(var x = 0; x < columns; x++)
            drops[x] = c.height; 
        elements = document.querySelectorAll('.number');

        dropArray.push(drops)
        draw(index, c, 90)

    })
    
    writeText()
}, false);

window.addEventListener('resize', function() {

    var canvases = Array.from(document.getElementsByClassName("c"));

    canvases.forEach(function (c, index){
        c.width = c.getBoundingClientRect().width;
        c.height = c.getBoundingClientRect().height;

        var columns = c.width/font_size;
        dropArray[index] = []

        for(var x = 0; x < columns; x++)
            dropArray[index][x] = c.height; 
    })
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

}, false);


function addEgg(){
  fetch("./add_egg_923785rufhrejg93");
}


$(document).ready(function () {
    (function ($) {
        $(function () {
      
      
          $(window).on('scroll', function () {
            fnOnScroll();
          });
      
          $(window).on('resize', function () {
            fnOnResize();
          });
      
      
          var agTimeline = $('.js-timeline'),
            agTimelineLine = $('.js-timeline_line'),
            agTimelineLineProgress = $('.js-timeline_line-progress'),
            agTimelinePoint = $('.js-timeline-card_point-box'),
            agTimelineItem = $('.js-timeline_item'),
            agOuterHeight = $(window).outerHeight(),
            agHeight = $(window).height(),
            f = -1,
            agFlag = false;
      
          function fnOnScroll() {
            agPosY = $(window).scrollTop();
      
            fnUpdateFrame();
          }
      
          function fnOnResize() {
            agPosY = $(window).scrollTop();
            agHeight = $(window).height();
      
            fnUpdateFrame();
          }
      
          function fnUpdateWindow() {
            agFlag = false;
      
            agTimelineLine.css({
              top: agTimelineItem.first().find(agTimelinePoint).offset().top - agTimelineItem.first().offset().top,
              bottom: agTimeline.offset().top + agTimeline.outerHeight() - agTimelineItem.last().find(agTimelinePoint).offset().top
            });
      
            f !== agPosY && (f = agPosY, agHeight, fnUpdateProgress());
          }
      
          function fnUpdateProgress() {
            var agTop = agTimelineItem.last().find(agTimelinePoint).offset().top;
      
            i = agTop + agPosY - $(window).scrollTop();
            a = agTimelineLineProgress.offset().top + agPosY - $(window).scrollTop();
            n = agPosY - a + agOuterHeight / 2;
            i <= agPosY + agOuterHeight / 2 && (n = i - a);
            agTimelineLineProgress.css({height: n + "px"});
      
            agTimelineItem.each(function () {
              var agTop = $(this).find(agTimelinePoint).offset().top;
      
              (agTop + agPosY - $(window).scrollTop()) < agPosY + .5 * agOuterHeight ? $(this).addClass('js-ag-active') : $(this).removeClass('js-ag-active');
            })
          }
      
          function fnUpdateFrame() {
            agFlag || requestAnimationFrame(fnUpdateWindow);
            agFlag = true;
          }
      
      
        });
      })(jQuery);
      
  });

