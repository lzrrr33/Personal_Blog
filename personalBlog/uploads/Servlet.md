# Servlet

## 1. 概述

Servlet（Server Applet）是[Java](https://baike.baidu.com/item/Java/85979) Servlet的简称，称为小服务程序或服务连接器，用Java编写的[服务器](https://baike.baidu.com/item/服务器/100571)端程序，具有独立于平台和[协议](https://baike.baidu.com/item/协议/13020269)的特性，主要功能在于交互式地浏览和生成数据，生成动态[Web](https://baike.baidu.com/item/Web/150564)内容。

## 2. 原理

![image-20210320201957138](C:\Users\11252\Desktop\报告ppt及论文\markdown\Web\Servlet\image-20210320201957138.png)

## 3.HttpServletRequest对象

代表发送过来的请求信息

用途：

> 1. 获取请求报文信息

![image-20210320224928771](C:\Users\11252\Desktop\报告ppt及论文\markdown\Web\Servlet\image-20210320224928771.png)

> 2. 请求转发
>
> ```java
> req.getRequestDispatcher("s1/hello").forward(req, resp);
> ```

## 4.HttpServletResponse对象

用于处理和设置响应报文

用途：

> 1. 向浏览器输出消息
> 2. 下载文件
>
> ```java
> // 1.获取文件绝对路径
> String path = this.getClass().getClassLoader().getResource("jpg/image1.png").getPath();
> System.out.println(path);
> // 2.获取文件输入流
> FileInputStream fis = new FileInputStream(path);
> // 3.设置响应头参数为下载文件
> resp.setHeader("content-disposition","attachment;fileName="+"image1");
> // 4，获取输出流
> ServletOutputStream os = resp.getOutputStream();
> int len = 0;
> // 5.缓冲输出
> byte[] buffer = new byte[1024];
> while((len=fis.read(buffer))>0){
>     os.write(buffer, 0, len);
> }
> fis.close();
> os.close();
> ```
>
> 3. 实现重定向
>
> ```java
> resp.sendRedirect("/s1/hello");
> ```

## 5. ServletContext对象

每个web程序都有一个对应的ServletContext对象，代表当前应用

用途：

> 1.用于servlet之间的通信，可以保存一些数据

```java
ServletContext context = this.getServletContext();
context.setAttribute("user", "123");
context.getAttribute("user");
```

> 2.获取初始化参数

```xml
<context-param>
  <param-name>url</param-name>
  <param-value>jdbc:mysql//localhost:3306/demo</param-value>
</context-param>
```

```java
String conn = context.getInitParameter("url");
```

> 3.转发

```java
ServletContext context = this.getServletContext();
context.getRequestDispatcher("/get").forward(req, resp);
```

> 4.获取资源

```java
Properties properties = new Properties();
InputStream is = this.getServletContext().getResourceAsStream("/WEB-INF/classes/db.properties");// 获取配置文件的文件流
properties.load(is);
String s = properties.getProperty("username");
```

## 6. JSP9大内置对象

- PageContext  保存数据（层级查找）
- Aplication（ServletContext） 保存数据（全局）
- request    保存数据（一次请求，请求转发可携带）
- response  
- out  生成HTML
- Session  保存数据（一个会话）
- Exception  异常
- Config（ServletConfig）配置
- Page