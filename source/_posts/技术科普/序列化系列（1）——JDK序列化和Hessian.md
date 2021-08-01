---
title: 想追女神？先学 Synchronized 吧
categories:
  - 技术科普
tags:
  - 其他
  - java
cover: 'https://cdn.ytools.xyz/uPic/sQ7UHdiShot2021-08-01%2022.55.13.png'
abbrlink: '7819'
---

![](https://cdn.ytools.xyz/uPic/sQ7UHdiShot2021-08-01%2022.55.13.png)

我之前在[《聊一聊 RPC》](https://mp.weixin.qq.com/s/R8UJFu_aKjOhjKdvbhy1AQ)中曾提过什么是序列化和反序列化，当时有说过之后要单独抽出一期来详细聊聊序列化，没想到这一拖竟然拖了一年多，现在来把这个坑补上。由于篇幅较长，本文先主要介绍两种常见的序列化方式——JDK 序列化和 Hessian 序列化。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7fe49e9f71434f79975b728283fa4621~tplv-k3u1fbpfcp-zoom-1.image)

## 序列化是什么（What）

百度百科对于 **「序列化」** 的解释是：

> 序列化 (Serialization)是将对象的**状态信息**转换为可以**存储或传输**的形式的过程。

这么说太抽象了，举一个例子：你如果想让一个女孩子知道你喜欢她，你可以给她写情书，这样 **「喜欢」** 这种状态信息就变成了 **「文字」** 这种可以存储或传输的信息。

至于怎么把“情书”送给女生就有很多种方式了，我在[《聊一聊 RPC》](https://mp.weixin.qq.com/s/R8UJFu_aKjOhjKdvbhy1AQ)中已经有写过了，感兴趣的读者们可以点击阅读。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2b568e10705436eb2e6ddba8c0cf94b~tplv-k3u1fbpfcp-zoom-1.image)

所以，简单理解序列化就是将“对象”存储的信息保存到某个“文件”中，之后再通过某种方式读取“文件”转换成对象。在 Java 中，序列化其实就是把一个 Java 对象变成二进制内容，本质上就是一个 byte[]数组。

既然有序列化，那么就会有反序列化，在上文的例子中，如果女孩通过情书中的文字明白了男孩的喜欢，这就是一种反序列化。在 Java 中，将一个 byte[]数组重新变成 Java 对象就是一种反序列化。

## 为什么要序列化（Why）

这个时候肯定就有人会问了，直接把对象作为参数传递不就可以了吗？为什么还要多此一举把对象变成“文本”，然后再将“文本”变成对象？

我们知道，Java 创建的对象都是存在于 Java 虚拟机中，也即 JVM 中，那么 JVM 又在哪里呢？

JVM 是 Java 程序运行的环境，但是他同时是一个操作系统的一个应用程序，即一个进程。他的运行依赖于内存，因此 Java 中对象都是存储在内存中，准确地说是 JVM 的堆或栈内存中，可以各个线程之间进行对象传输，但是无法在进程之间进行传输。如果涉及到跨内存的数据传输（比如两台机器的传输），直接把对象作为参数传递就不可取了，这时就需要通过“网络”将数据传输。

举个例子，如果没办法自己亲自把情书送到对方手上，是不是得找一个人送过去？这就是 RPC 相关的知识了。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9664e64be4d54f36bb53409a4b8787c6~tplv-k3u1fbpfcp-zoom-1.image)

## 怎么序列化（How）

上述内容在之前那篇文章里都有涉及，接下来才是本文的重点，在实际使用时我们究竟该怎么序列化，有哪些方式可以序列化？为什么我们在代码中很少遇到手写序列化的情况。这些都是本文要解答的内容。

本文我们以 Java 为例。

### JDK 序列化

作为一个成熟的编程语言，Java 本身就已经提供了序列化的方法了，因此我们也选择把他作为第一个介绍的序列化方式。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2dce6295ad4443289ecc59235d2f2a7~tplv-k3u1fbpfcp-zoom-1.image)

JDK 自带的序列化方式，使用起来非常方便，只需要序列化的类实现了**Serializable**接口即可，Serializable 接口没有定义任何方法和属性，所以只是起到了**标识**的作用，**表示这个类是可以被序列化的。**如果想把一个 Java 对象变为 byte[]数组，需要使用**ObjectOutputStream**。它负责把一个 Java 对象写入一个字节流：

```yaml
public class Main {
    public static void main(String[] args) throws IOException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        try (ObjectOutputStream output = new ObjectOutputStream(buffer)) {
            // 写入int:
            output.writeInt(12345);
            // 写入String:
            output.writeUTF("Hello");
            // 写入Object:
            output.writeObject(Double.valueOf(123.456));
        }
        System.out.println(Arrays.toString(buffer.toByteArray()));
    }
}
```

如果没有实现 Serializable 接口而进行序列化操作就会抛出 NotSerializableException 异常

上面代码输出的是如下的 Byte 数组：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/caadbbd216514ba0921bdcb9564f63c0~tplv-k3u1fbpfcp-zoom-1.image)

#### serialVersionUID

在反序列化时，JVM 需要知道所属的 class 文件，在序列化的时候 JVM 会记录 class 文件的版本号，也即 serialVersionUID 这一变量。该变量默认是由 JVM 自动生成，也可以手动定义。反序列化时 JVM 会按版本号找指定版本的 class 文件进行反序列化，如果 class 文件有版本号在序列化和反序列化时不一致就会导致反序列化失败，会抛异常提示版本号不一致，

#### 特点

JDK 序列化会把对象类的描述和所有属性的元数据都序列化为字节流，另外**继承的元数据也会序列化**，所以导致序列化的元素较多且字节流很大，但是由于序列化了所有信息所以相对而言更可靠。但是如果只需要序列化属性的值时就比较浪费。

而且因为 Java 的序列化机制可以导致一个实例**能直接从 byte[]数组创建**，而不经过构造方法，因此，它存在一定的安全隐患。一个精心构造的 byte[]数组被反序列化后可以执行特定的 Java 代码，从而导致严重的安全漏洞。

其次，由于这种方式是 JDK 自带，无法被多个语言通用，因此通常情况下不会使用该种方式进行序列化。

### Hessian

Hessian 是一种动态类型、二进制序列化和 Web 服务协议，专为面向对象的传输而设计。

官方介绍 👉[Hessian 2.0 Serialization Protocol](http://hessian.caucho.com/doc/hessian-serialization.html)

和 JDK 自带的序列化方式类似，Hessian 采用的也是二进制协议，只不过 Hessian 序列化之后，字节数更小，性能更优。目前 Hessian 已经出到 2.0 版本，相较于 1.0 的 Hessian 性能更优。相较于 JDK 自带的序列化，Hessian 的设计目标更明确 👇

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5f23e9ec11344a19ee55b9f6a122ad4~tplv-k3u1fbpfcp-zoom-1.image)

#### 序列化实现方式

之所以说 Hessian 序列化之后的数据字节数更小，和他的实现方式密不可分，以 int 存储整数为例，我们通过官网的说明可以发现存储逻辑如下 👇

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54bf77d2d08e4950971d1da3246007b8~tplv-k3u1fbpfcp-zoom-1.image)

翻译一下就是：

> 一个 32 位有符号的整数。一个整数由八位数 x49('I')表示，后面是整数的 4 个八位数，以高位优先（big-endian）顺序排列。

简单来说就是，如果要存储一个数据为 1 的整数，Hessian 会存储成`I 1`这样的形式。

存对象也很简单，如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84b5e513fce64432940d53f241169aa0~tplv-k3u1fbpfcp-zoom-1.image)

对于 Hessian 支持的数据结构，官网均有序列化的语法，详情可参考 👉[Serialization](http://hessian.caucho.com/doc/hessian-serialization.html#anchor4)

而且，和 JDK 自带序列化不同的是，如果一个对象之前出现过，hessian 会直接插入一个 R index 这样的块来表示一个引用位置，从而省去再次序列化和反序列化的时间。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7c7164aa5a441a68b3666116687528f~tplv-k3u1fbpfcp-zoom-1.image)

也正是因为如此，Hessian 的序列化速度相较于 JDK 序列化才更快。只不过 Java 序列化会把要序列化的对象类的元数据和业务数据全部序列化从字节流，并且会保留完整的继承关系，因此相较于 Hessian 序列化更加可靠。

不过相较于 JDK 的序列化，Hessian 另一个优势在于，这是一个跨语言的序列化方式，这意味着序列化后的数据可以被其他语言使用，兼容性更好。

#### 不服跑个分？

空口无凭，我们以一个小 demo 来测试一下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d8ac85be211445eab3202d0eaa6eefd~tplv-k3u1fbpfcp-zoom-1.image)

使用之前记得先引入依赖哦

```xml
<!-- https://mvnrepository.com/artifact/com.caucho/hessian -->
<dependency>
    <groupId>com.caucho</groupId>
    <artifactId>hessian</artifactId>
    <version>4.0.65</version>
</dependency>
```

运行的结果也和我们预想的一样：

```
hessian序列化长度：47
jdk序列化长度：99
```

## 总结

通过上文的介绍，想必你也了解了 JDK 自带序列化方式和 Hessian 序列化之间的一些区别了，JDK 序列化选择将所有的信息保存下来，因此可靠性更好。与此同时，由于采取了不同的序列化方案，Hessian 在体积和速度上相较于 JDK 序列化更优秀，且由于 Hessian 设计之初就考虑到跨语言的需求因此在兼容性方面也更胜一筹。

之后我们将会介绍其他的一些序列化协议，如果你觉得本文对你有所帮助，不妨点赞关注支持一下～
