# JS练手小项目2（JustJump!）

## 预览

![image-20210324110452786](C:\Users\11252\Desktop\报告ppt及论文\markdown\Web\JS\image-20210324110452786.png)

操作说明：按空格键即可跳跃，途中躲避石头和乌鸦哦。

## 代码

> imdex.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name=viewport content="width=device-width, initial-scale=1">
    <title>JustJump!</title>

    <style type="text/css" media="screen">
        *{
            margin: 0;
            padding: 0;
        }
        img{
            border:0;
        }
        ol, ul ,li{list-style: none;}


        html,body{
            /* background: url('img/bj.jpg'); */
            height:100%;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            -khtml-user-select: none;
            user-select: none;
            font-family:sans-serif;
        }
        .layout{
            width:100%;
            height:100%;
            margin: 0 auto;
            background: url('img/background.png') ;
            /* background:#505149; */
            position: relative;
            overflow: hidden;


        }
        .mario{
            width:110px;
            height:110px;
            /* background:#fff; */
            background:url('img/mario1.png') 50% no-repeat;
            position: absolute;
            bottom:0;
            left:15%;
            top:52%;
            cursor:pointer;
            z-index: 500;
        }

        .stone{
            width:90px;
            height:190px;
            /* background:#fff; */
            background:url('img/stone1.png') 50% no-repeat;
            position: absolute;
            bottom:0;
            left:100%;
            top:42%;
            cursor:pointer;
        }

        .bird{
            width:130px;
            height:100px;
            /* background:red; */
            background:url('img/bird1.png') 50% no-repeat;
            position: absolute;
            top:10%;
            left:100%;
        }

        .score{
            display: none;
            padding: 10px 15px;
            font-size:30px;
            font-weight:bold;
            color:#99B2D6;
            background:#031540;
            border:5px solid #425579;
            border-radius:0 50px 50px 0;
            position: absolute;
            top:20px;
            left:20px;
            z-index:1000000;

            /* background:red; */
        }


        #start{
            width: 100%;
            height:100%;
            background:rgba(0, 0, 0, 0.7);
            position: absolute;
            top:0;
            left:0;
            z-index: 1000;
            display: none;
        }
        #startBtn{
            background:blue;
            color: #fff;
            font-size:50px;
            margin:100px 0 0 -115px;
            padding: 10px 30px;
            border:5px solid #fff;
            border-radius:50px;
            position: absolute;
            top:50%;
            left:50%;
            outline:none;
            cursor:pointer;
        }
        #name-over{
            font-family:'微软雅黑',sans-serif;
            width:100%;
            padding: 120px 0 10px;
            margin: -200px 0 0 0;
            font-size:50px;
            font-weight:bold;
            text-align:center;
            color:rgba(106,124,197,1);
            line-height:70px;
            background:rgba(106,124,197,0.5) url('img/mario1.png') center 20px no-repeat;
            position: absolute;
            top:60%;
            left:0;

        }
    </style>

</head>
<body>

<div class="layout" id="layout"></div>

<!--<div class="score">得分：-->
<!--    <span id="score">0</span>-->
<!--</div>-->
<div id="start">
    <div id="name-over"><i style="text-align: center">Game over</i></div>
    <input id="startBtn" type="button" value="RESTART">
</div>

<script src="js/jquery.min.js"></script>
<script src="js/justjump.js"></script>


</div>
</body>
</html>
```

> justjump.js

```javascript
/**
 * @Author： faizer
 * @date： 2021/3/23
 */

'use strict';

window.onload = function () {
    Game.init();
}

var JumpState= true;
var time1; // 定义一堆定时器
var time2;
var time3;
var time4;
var time5;
var time6;
var mario;

var Game = {
    data : {
    //各类参数定义
        stone : {
            speed: 10,
        },
        bird : {
            speed: 10,
        },
        Mario : {
            speed_y : 25,  //起跳速度
            accelerate : 1, //重力加速度
        }
    },

    init : function (){
        this.createMario();
    },


    // 创建马里奥
    createMario : function (){
        mario = $("<div>").attr('class', 'mario');
        mario.appendTo('#layout');
        time1 = setInterval(function (){ // 定时产生石头
            Game.createStone();
        },4000);

        time2 = setInterval(function (){  // 定时产生乌鸦
            time6 = setInterval(function (){
                Game.createBird();
            },8000);
            clearTimeout(time2);
        },5000);


    },
    //创建石头
    createStone : function (){
        var stone = $("<div>").attr('class', 'stone');
        stone.appendTo('#layout');
        var offsetLeft = parseInt(stone.css('left'));
        time3 = setInterval(function () {  // 石头运动
            if(offsetLeft<=-100){
                stone.remove();
                clearInterval(time3);
            }
            if(Game.TC(stone, mario)){
                console.log('1111')
                Game.gameover();
            }
            offsetLeft = offsetLeft-parseInt(Game.data.stone.speed);
            stone.css('left', offsetLeft+'px');


        },20);

    },
    // 产生乌鸦
    createBird : function (){
        var bird = $("<div>").attr('class', 'bird');
        bird.appendTo('#layout');
        var offsetLeft = parseInt(bird.css('left'));
        time4 = setInterval(function () { // 乌鸦运动
            if(offsetLeft<=-120){
                bird.remove();
                clearInterval(time4);
            }

            if(Game.TC(bird, mario)){
                console.log('2222')
                Game.gameover();
            }

            offsetLeft = offsetLeft-parseInt(Game.data.bird.speed);
            bird.css('left', offsetLeft+'px');
        },20);
    },

    TC : function (obj, mario){  // 碰撞检测
        var t1 = parseInt(obj.css('top')),
            l1 = parseInt(obj.css('left')),
            r1 = parseInt(obj.css('left'))+parseInt(obj.css('width')),
            b1 = parseInt(obj.css('top'))+parseInt(obj.css('height')),


            r2 = parseInt(mario.css('left'))+parseInt(mario.css('width')),
            b2 = parseInt(mario.css('top'))+parseInt(mario.css('height')),
            l2 = parseInt(mario.css('left')),
            t2 = parseInt(mario.css('top'));

        if(b2<t1 || l2>r1 || r2<l1 || t2>b1){
            return false;
        }else{
            console.log(b2+":"+t1+"  "+l2+":"+r1+"  "+r2+":"+l1);
            return true;
        }
    },

    gameover  : function () {  // 游戏结束
        clearTimeout(time1);
        clearTimeout(time2);
        clearTimeout(time3);
        clearTimeout(time4);
        clearTimeout(time5);
        clearTimeout(time6);
        $("#start").css('display', 'block')

    }

}



$(window).keydown(function (e) {  // 跳跃事件
    var keycode = e.keyCode;
    if(keycode==32 && JumpState){
        JumpState = false;  // 跳跃中不可起跳
        var mario = $('.mario');
        mario.css('background','url(\'img/mario3.png\') 50% no-repeat');
        var offsettop = parseInt(mario.css('top'));
        var rawtop = offsettop;
        var speed = Game.data.Mario.speed_y;
        time5 = setInterval(function () {
            offsettop = offsettop - speed;
            speed = speed-parseInt(Game.data.Mario.accelerate);
            if(offsettop==rawtop){
                JumpState = true;
                mario.css('background','url(\'img/mario1.png\') 50% no-repeat');
                clearInterval(time5);
            }
            mario.css('top',offsettop+'px');

        }, 20);

    }
});

$('#startBtn').click(function () { // 重新开始
    location.reload();
});
```