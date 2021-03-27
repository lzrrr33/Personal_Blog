# JS练手小项目1 纸牌连连看

## 可视化（略丑）

![image-20210322100728493](C:\Users\11252\Desktop\报告ppt及论文\markdown\Web\JS\image-20210322100728493.png)

如图，当点击两个相同数值且联通的卡牌时，就将消除该卡牌

![image-20210322100937203](C:\Users\11252\Desktop\报告ppt及论文\markdown\Web\JS\image-20210322100937203.png)

## 实现代码

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>纸牌连连看</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <style type="text/css">
        .poker{color:#000000;display:inline-block;width:25px;height:50px;border:1px #000 solid;font:16px "arial","times new roman";cursor:default;background-color:#fff;text-align:center;-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;-ms-user-select:none;user-select:none;}
        [dui]{background-color:#eee;pointer-events:none;}
        table td{padding:0;}
        body{font:20px "Scerh","开心软件少儿简体","方正少儿简体","方正少儿_gbk","微软雅黑","宋体",sans-serif}
    </style>
</head>
<body>


<table id="pokerSet" align="center">
    <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>

</table>

<script type="text/javascript">
    var type = "♠♥♣♦"; // 花色
    var number = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"] // 数字
    var numSet = new Array();

    var removeNum=0;
    var State=0; // 定义当前状态 0:没有元素指定 1：指定了一个元素
    var NowId; // 指定前一个指定的id
    for(var i=0;i<54;i++){ // 初始化卡牌的位置
        numSet[i] = i;
    }
    var randomNumber = function(){
        return 0.5 - Math.random()
    }
    numSet.sort(randomNumber) // 随机初始化

    function getPoker(n, local){ // 获得卡牌
        var pokerNum;
        var pokerType;
        if(n>=52){
            if(n==52) {
                pokerType = "大";
            }else{
                pokerType = "小";
            }
            pokerNum = "王";
        }else{
            pokerType = type.substr(n%4, 1);
            pokerNum = number[n%13];
        }
        return "<span class='poker' id='"+n+"' style='"+((n/13)%2==1?"color:#f00":"")+"'  local='"+(local)+"' num='"+(pokerNum)+"'>"+pokerNum+"<br>"+pokerType+"</span>";
    }
    for(var i=0;i<54;i++){
        $("#pokerSet td").eq(i).html(getPoker(numSet[i], i)); // 随机分配卡牌
    }
    $("span").click( //点击效果
        function(){
            $("#"+this.id).css('color', 'pink');
            var b=true;
            if(NowId !== undefined && State==1){ // 判断当前状态
                var numpre = parseInt($("#"+NowId).attr("local"));
                var numnow = parseInt($("#"+this.id).attr("local"));
                var num1 = $("#"+NowId).attr("num");
                var num2 = $("#"+this.id).attr("num");
                // 判断值是否相等
                var if_1_eq_2 = (num1===num2 && numpre!==numnow) ;
                // 判断卡牌1是否可连
                var if_1_edge = (numpre<9 || numpre>45 || numpre%9==0 || numpre%9==8 || numSet[numpre-1]==-1 || numSet[numpre+1]==-1 || numSet[numpre-9]==-1 || numSet[numpre+9]==-1);
                // 判断卡牌2是否可连
                var if_2_edge = (numnow<9 || numnow>45 || numnow%9==0 || numnow%9==8 || numSet[numnow-1]==-1 || numSet[numnow+1]==-1 || numSet[numnow-9]==-1 || numSet[numnow+9]==-1);
                //判断卡牌是否相邻
                var if_1_s_2 = numpre==(numnow+1) || numpre==(numnow-1)|| numpre==(numnow+9) || numpre==(numnow-9);
                if(if_1_eq_2 && ((if_1_edge && if_2_edge)||if_1_s_2))
                {
                    b=false;
                    numSet[numpre]=-1; // 记录该卡牌已被消除
                    numSet[numnow]=-1;
                    $("#"+this.id).css('visibility','hidden'); // 消除
                    $("#"+NowId).css('visibility','hidden');
                    State=0;
                    removeNum = removeNum+2;
                    if(removeNum==54){ // 成功后重新开始
                        alert("成功！");
                        location.reload();
                    }
                }
            }
            if(b){
                if(NowId !== undefined) $("#"+NowId).css('color', '#000000') // 复原点击效果
                NowId=this.id;
                State=1;
            }


        }
    );
</script>

</body>
</html>
```

