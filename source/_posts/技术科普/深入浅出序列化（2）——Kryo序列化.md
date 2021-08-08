---
title: 深入浅出序列化（2）——Kryo序列化
categories:
  - 技术科普
tags:
  - 序列化
  - java
cover: 'https://tva1.sinaimg.cn/large/008i3skNly1gt8g21vixjj309f040glp.jpg'
abbrlink: 10d8
---

前一篇文章我们介绍了 Java 中的两个常见的序列化方式，JDK 序列化和 Hessian2 序列化，本文我们接着来讲述一个后起之秀——Kryo 序列化，它号称 Java 中最快的序列化框架。那么话不多说，就让我们来看看这个后起之秀到底有什么能耐吧。

## Kryo 序列化

![](https://tva1.sinaimg.cn/large/008i3skNly1gt8g21vixjj309f040glp.jpg)

Kryo 是一个快速序列化/反序列化工具，依赖于字节码生成机制（底层使用了 ASM 库)，因此在序列化速度上有一定的优势，但正因如此，其使用也只能限制在基于 JVM 的语言上。

> 网上有很多资料说 Kryo 只能在 Java 上使用，这点是不对的，事实上除 Java 外，Scala 和 Kotlin 这些基于 JVM 的语言同样可以使用 Kryo 实现序列化。

和 Hessian 类似，Kryo 序列化出的结果，是其自定义的、独有的一种格式。由于其序列化出的结果是二进制的，也即 byte[]，因此像 Redis 这样可以存储二进制数据的存储引擎是可以直接将 Kryo 序列化出来的数据存进去。当然你也可以选择转换成 String 的形式存储在其他存储引擎中（性能有损耗）。

由于其优秀的性能，目前 Kryo 已经成为多个知名 Java 框架的底层序列化协议，包括但不限于 👇

- [Apache Fluo](https://fluo.apache.org/) (Kryo is default serialization for Fluo Recipes)
- [Apache Hive](http://hive.apache.org/) (query plan serialization)
- [Apache Spark](http://spark.apache.org/) (shuffled/cached data serialization)
- [Storm](https://github.com/nathanmarz/storm/wiki/Serialization) (distributed realtime computation system, in turn used by [many others](https://github.com/nathanmarz/storm/wiki/Powered-By))
- [Apache Dubbo](https://github.com/apache/incubator-dubbo) (high performance, open source RPC framework)
- ……

官网地址在：[https://github.com/EsotericSoftware/kryo](https://github.com/EsotericSoftware/kryo)

## 基础用法

介绍了这么多，接下来我们就来看看 Kryo 的基础用法吧。其实对于序列化框架来说，API 基本都差不多，毕竟入参和出参通常都是确定的（需要序列化的对象/序列化的结果）。在使用 Kryo 之前，我们需要引入相应的依赖

```xml
<dependency>
   <groupId>com.esotericsoftware</groupId>
   <artifactId>kryo</artifactId>
   <version>5.2.0</version>
</dependency>
```

基本使用如下所示 👇

```java
import com.esotericsoftware.kryo.Kryo;
import com.esotericsoftware.kryo.io.Input;
import com.esotericsoftware.kryo.io.Output;
import java.io.*;

public class HelloKryo {
    static public void main(String[] args) throws Exception {
        Kryo kryo = new Kryo();
        kryo.register(SomeClass.class);

        SomeClass object = new SomeClass();
        object.value = "Hello Kryo!";

        Output output = new Output(new FileOutputStream("file.bin"));
        kryo.writeObject(output, object);
        output.close();

        Input input = new Input(new FileInputStream("file.bin"));
        SomeClass object2 = kryo.readObject(input, SomeClass.class);
        input.close();
        System.out.println(object2.value);
    }

    static public class SomeClass {
        String value;
    }
}

```

Kryo 类会自动执行序列化。Output 类和 Input 类负责处理缓冲字节，并写入到流中。

## Kryo 的序列化

作为一个灵活的序列化框架，Kryo 并不关心读写的数据，作为开发者，你可以随意使用 Kryo 提供的那些开箱即用的序列化器。

### Kryo 的注册

和很多其他的序列化框架一样，Kryo 为了提供性能和减小序列化结果体积，提供注册的序列化对象类的方式。在注册时，会为该序列化类生成 int ID，后续在序列化时使用 int ID 唯一标识该类型。注册的方式如下：

```java
kryo.register(SomeClass.class);
```

或者

```java
kryo.register(SomeClass.class, 1);
```

可以明确指定注册类的 int ID，但是该 ID 必须大于等于 0。如果不提供，内部将会使用 int++的方式维护一个有序的 int ID 生成。

### Kryo 的序列化器

Kryo 支持多种序列化器，通过源码我们可窥知一二 👇

![](https://tva1.sinaimg.cn/large/008i3skNly1gt8g2zo38jj61300m2qci02.jpg)

具体可参考 👉[「Kryo 支持的序列化类型」](https://github.com/EsotericSoftware/kryo/blob/master/src/com/esotericsoftware/kryo/Kryo.java#L179)

虽然 Kryo 提供的序列化器可以读写大多数对象，但开发者也可以轻松的制定自己的序列化器。篇幅限制，这里就不展开说明了，仅以默认的序列化器为例。

## 对象引用

在新版本的 Kryo 中，默认情况下是不启用对象引用的。这意味着如果一个对象多次出现在一个对象图中，它将被多次写入，并将被反序列化为多个不同的对象。

举个例子，当开启了引用属性，每个对象第一次出现在对象图中，会在记录时写入一个 varint，用于标记。当此后有同一对象出现时，只会记录一个 varint，以此达到节省空间的目标。此举虽然会节省序列化空间，但是是一种用时间换空间的做法，会影响序列化的性能，这是因为在写入/读取对象时都需要进行追踪。

开发者可以使用 kryo 自带的 `setReferences` 方法来决定是否启用 Kryo 的引用功能。

## 线程不安全

Kryo 不是线程安全的。每个线程都应该有自己的 Kryo 对象、输入和输出实例。

因此在多线程环境中，可以考虑使用 ThreadLocal 或者对象池来保证线程安全性。

### ThreadLocal + Kryo 解决线程不安全

ThreadLocal 是一种典型的牺牲空间来换取并发安全的方式，它会为每个线程都单独创建本线程专用的 kryo 对象。对于每条线程的每个 kryo 对象来说，都是顺序执行的，因此天然避免了并发安全问题。创建方法如下：

```java
static private final ThreadLocal<Kryo> kryos = new ThreadLocal<Kryo>() {
   protected Kryo initialValue() {
      Kryo kryo = new Kryo();
      // 在此处配置kryo对象的使用示例，如循环引用等
      return kryo;
   };
};

Kryo kryo = kryos.get();
```

之后，仅需要通过 `kryos.get()` 方法从线程上下文中取出对象即可使用。

### 对象池 + Kryo 解决线程不安全

**「池」**是一种非常重要的编程思想，连接池、线程池、对象池等都是**「复用」**思想的体现，通过将创建的“对象”保存在某一个“容器”中，以便后续反复使用，避免创建、销毁的产生的性能损耗，以此达到提升整体性能的作用。

Kryo 对象池原理也是如此。Kryo 框架自带了对象池的实现，整个使用过程不外乎**创建池、从池中获取对象、归还对象**三步，以下为代码实例。

```java
// Pool constructor arguments: thread safe, soft references, maximum capacity
Pool<Kryo> kryoPool = new Pool<Kryo>(true, false, 8) {
   protected Kryo create () {
      Kryo kryo = new Kryo();
      // Kryo 配置
      return kryo;
   }
};

// 获取池中的Kryo对象
Kryo kryo = kryoPool.obtain();
// 将kryo对象归还到池中
kryoPool.free(kryo);
```

创建 Kryo 池时需要传入三个参数，其中第一个参数用于指定是否在 Pool 内部使用同步，如果指定为 true，则允许被多个线程并发访问。第三个参数适用于指定对象池的大小的，这两个参数较容易理解，因此重点来说一下第二个参数。

如果将第二个参数设置为 true，Kryo 池将会使用 java.lang.ref.SoftReference 来存储对象。这允许池中的对象在 JVM 的内存压力大时被垃圾回收。Pool clean 会删除所有对象已经被垃圾回收的软引用。当没有设置最大容量时，这可以减少池的大小。当池子有最大容量时，没有必要调用 clean，因为如果达到了最大容量，Pool free 会尝试删除一个空引用。

创建玩 Kryo 池后，使用 kryo 就变得异常简单了，只需调用 `kryoPool.obtain()` 方法即可，使用完毕后再调用 `kryoPool.free(kryo)` 归还对象，就完成了一次完整的租赁使用。

理论上，只要对象池大小评估得当，就能在占用极小内存空间的情况下完美解决并发安全问题。如果想要封装一个 Kryo 的序列化方法，可以参考如下的代码 👇

```java
public static byte[] serialize(Object obj) {
    Kryo kryo = kryoPool.obtain();
    // 使用 Output 对象池会导致序列化重复的错误（getBuffer返回了Output对象的buffer引用）
    try (Output opt = new Output(1024, -1)) {
        kryo.writeClassAndObject(opt, obj);
        opt.flush();
        return opt.getBuffer();
    }finally {
        kryoPool.free(kryo);
    }
}
```

## 小结

相较于 JDK 自带的序列化方式，Kryo 的性能更快，并且由于 Kryo 允许多引用和循环引用，在存储开销上也更小。

只不过，虽然 Kryo 拥有非常好的性能，但其自身却舍去了很多特性，例如线程安全、对序列化对象的字段修改等。虽然这些弊端可以通过 Kryo 良好的扩展性得到一定的满足，但是对于开发者来说仍然具有一定的上手难度，不过这并不能影响其在 Java 中的地位。

Kryo 还有很多优秀的特性，详情可参考 👉[EsotericSoftware/kryo](https://github.com/EsotericSoftware/kryo)

最后，如果你觉得本文对你有帮助的话，不要吝啬你的关注和点赞，也欢迎读者在评论区留言讨论，一起进步啊～
