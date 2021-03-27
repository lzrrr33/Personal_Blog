# JavaScript进阶

## 1. BOM对象

BOM(Browser Object Model) 是指浏览器对象模型，是用于描述这种对象与对象之间层次关系的模型，浏览器对象模型提供了独立于内容的、可以与浏览器窗口进行互动的对象结构。

> window对象:  所有浏览器对象的父对象
>
> navigator对象:  获取浏览器的信息
>
> screen对象:  屏幕对象
>
> **location对象** ： 代表当前页面的URL信息
>
> ```java
> location.reload(); // 刷新页面
> location.href; //当前连接
> location.protocol; //协议
> location.assign("https://www.baidu.com"); //跳转
> ```
>
> **document对象:**  文档对象（DOM）
>
> histoty对象：回退与前进
>
> ```javascript
> histoty.back()
> history.foward()
> ```
>
> 

## 2.DOM对象

DOM:文档对象模型

> 1. 获取dom节点
>
> ![image-20210321171633404](C:\Users\11252\Desktop\报告ppt及论文\markdown\Web\JS\image-20210321171633404.png) 
>
> 2. 更新dom节点
>
> ![image-20210321171700380](C:\Users\11252\Desktop\报告ppt及论文\markdown\Web\JS\image-20210321171700380.png) 
>
> 3. 删除dom节点
>
> ![image-20210321172106664](C:\Users\11252\Desktop\报告ppt及论文\markdown\Web\JS\image-20210321172106664.png) 
>
> 4. 添加dom节点
>
> ![image-20210321173232762](C:\Users\11252\Desktop\报告ppt及论文\markdown\Web\JS\image-20210321173232762.png) 

## 3. jQuery库

jQuery是一个快速、简洁的JavaScript框架，是继Prototype之后又一个优秀的JavaScript代码库。

jQuery封装了大量的JavaScript函数。

我们之前写的代码都可以用jQuery快速完成

1. 选择器

```javascript
<button type="button" id="b1"> 点我</button>
    <button type="button" id="b2"> 点我</button>
    <button type="button" id="b3" class="button1"> 点我</button>
<script>
    'use strict'
    $('button').click(function (){ 
        alert('dnmn1') // 标签选择器
    })
    $('#b2').click(function (){
        alert('dnmn2') // id选择器
    })
    $('.button1').click(function (){
        alert('dnmn3') // class选择器
    })
</script>
```

2. 事件

> 鼠标事件、键盘事件、其他事件

...

