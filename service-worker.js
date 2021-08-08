/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["about/index.html","8174d7704cf2f2ca2ef5f92ad370787d"],["archives/2021/06/index.html","56ef6b5fbb43b7830e8bd9e4f235edd7"],["archives/2021/06/page/10/index.html","b2bf8dfd038725b311150e746eec8bec"],["archives/2021/06/page/11/index.html","c76b59c3d2dde2225ffb6c24267a0fc1"],["archives/2021/06/page/12/index.html","0fb4c85411d423de9daebde045de1c82"],["archives/2021/06/page/13/index.html","b2b2c9a9ca7d3ff1a2d296df4f19325b"],["archives/2021/06/page/14/index.html","f1b616a33412a22992f064e8938ceb4f"],["archives/2021/06/page/15/index.html","4d65f7473e79c1a6f40158cde3c103d2"],["archives/2021/06/page/16/index.html","b065b5e5d41451acd11186e5effc8a88"],["archives/2021/06/page/17/index.html","a6703167bedfb5e7e61da697e15b1e4e"],["archives/2021/06/page/2/index.html","9c4d7d84554603b06842492911d3b10f"],["archives/2021/06/page/3/index.html","1548bdcec41d9eff64a10d8af3b17ea4"],["archives/2021/06/page/4/index.html","d2648a1597b4a0fa4c8f53cad1135c52"],["archives/2021/06/page/5/index.html","df37d2421329bd827b2ec7af1dd42ea2"],["archives/2021/06/page/6/index.html","64a663f7f5fb108d51ad1f19f22f8d45"],["archives/2021/06/page/7/index.html","ac024eb54971168e6c0b99270df816b6"],["archives/2021/06/page/8/index.html","7db7240eb29cee7e3d9d94ac3b7ee74f"],["archives/2021/06/page/9/index.html","0715ba736456d697babca4c4f90fd5b1"],["archives/2021/07/index.html","d0105ee3381a15c0fbb1d259d8c7f9f4"],["archives/2021/08/index.html","9c3656cb34f595b815f5580e08540288"],["archives/2021/index.html","a9b56dfb14cb6d01a96f186fb2c02a84"],["archives/2021/page/10/index.html","2368060bb4b253be98c92a5d0c930dcd"],["archives/2021/page/11/index.html","71712c19c3d37250b6591577743a4389"],["archives/2021/page/12/index.html","bbced49d466701d2aac1bb72910e938c"],["archives/2021/page/13/index.html","b8cc700482f06a7fe28042450fdec518"],["archives/2021/page/14/index.html","e68e3b05ad8725b9e1b2f868d9690b42"],["archives/2021/page/15/index.html","00043ccce3434e51460294a0c61a312d"],["archives/2021/page/16/index.html","c82c952c8614850163996bcd988481cf"],["archives/2021/page/17/index.html","26016c3afc6930130cb132dc01871ca2"],["archives/2021/page/2/index.html","6a9dea46fbaa9afbca0e169c4c5198c7"],["archives/2021/page/3/index.html","18839eb498be1852da61431e11e48fe0"],["archives/2021/page/4/index.html","6f94b91c48691245e2d3774e5ab8e6b8"],["archives/2021/page/5/index.html","7285ef789555abf43d06087a80a80bb4"],["archives/2021/page/6/index.html","1f5f27c8b8258270a0e84d0afad3a36b"],["archives/2021/page/7/index.html","7ee1fe80988c78efa4be6d9df4f41f6d"],["archives/2021/page/8/index.html","06db34d2ed68c710a535f2e1304f24b2"],["archives/2021/page/9/index.html","596dd7c842986156758ebcf5b56f8b81"],["archives/index.html","c4d582c66159425c41fa49dedd5cba77"],["archives/page/10/index.html","4694095b7034a4b6fd250dba6b5079de"],["archives/page/11/index.html","542725ae9124038a7555a1869030d81b"],["archives/page/12/index.html","9eb3cbe27aecdbf976ddc574574278ed"],["archives/page/13/index.html","fb1d2edaf278d32307326f36ccd5b4a9"],["archives/page/14/index.html","2a32ce55bcfa186fe14e9476a63fd225"],["archives/page/15/index.html","e60465407a5f5fdeebea1af6ea7c222b"],["archives/page/16/index.html","491d4080dba6d1e35f1037cc1c32685f"],["archives/page/17/index.html","6c83a5e23d5af9b23fc5f4e6c54f25b1"],["archives/page/2/index.html","0b42eb11ebf67274e57c03569a1e9c12"],["archives/page/3/index.html","a29e414242e22c5b39af26455186e28d"],["archives/page/4/index.html","c8e19d03277771beb9fd0347388bf5ca"],["archives/page/5/index.html","4db9ea935bf68e70963cbca7cfd70375"],["archives/page/6/index.html","ec25e86736357b47a861acb9151b6cc1"],["archives/page/7/index.html","05330f6c9ec840ab2dee868f54edf7fd"],["archives/page/8/index.html","40cef87e2a1d03fcfb758c4f2d66eb7e"],["archives/page/9/index.html","3ed821e42d26a1511a11235e3b97315b"],["books/index.html","9d50ed055d739220499a4fdd5f40eb64"],["categories/index.html","c783e67f77bb2600f86e8a622aca68dc"],["categories/外文翻译/index.html","e87eacf36baa96b4cf3404bcdab9caff"],["categories/外文翻译/page/2/index.html","7ea44949d5440b529ecd033926f00895"],["categories/外文翻译/page/3/index.html","388d25e56f24a4ebd7bae18d429d410e"],["categories/外文翻译/page/4/index.html","4d67ef93bdd49ab4d0ab188f0fefb363"],["categories/外文翻译/page/5/index.html","40611479e745cf1ea7f32dd7e3d037ef"],["categories/学习笔记/index.html","fe54072cf21fdad88d09d1d7fe7282be"],["categories/学习笔记/page/2/index.html","6c9bba76bb26a38eb0f5eb98cc129a26"],["categories/实战教学/index.html","4a7acb91ba8992fc615cf0251f75d29e"],["categories/实战教学/page/2/index.html","7966d33ce2697fa988d5ad2242de26c0"],["categories/实战教学/page/3/index.html","9e2ad071291f0f2597a8177f98cd8948"],["categories/实战教学/page/4/index.html","debd2ae2e71f4fd741350d05e60a1363"],["categories/技术科普/index.html","6b0cc3832fa15f944a253249978f62a6"],["categories/技术科普/page/2/index.html","e3d3fa3e6b62b36f0439e85770484449"],["categories/技术科普/page/3/index.html","d04bd44e8c4e7b69efc7eaca1265cbd9"],["categories/来都来了/index.html","3562809a95de8cbcdc61707b1eaff717"],["categories/来都来了/page/2/index.html","885df5275748e2d64b90cf37df5269aa"],["categories/来都来了/page/3/index.html","a5dc549068b27429c3f675018762f0d7"],["categories/来都来了/page/4/index.html","425483612c5551947ffea07d08222572"],["categories/每周一问/index.html","2e404f272d7ad7b3e958f9973883e75b"],["categories/读书笔记/index.html","57049878e593c0446ca9ad2830421cfb"],["categories/面试学习/index.html","519e2dcce0b1ed5ca2e811da53e52165"],["css/index.css","c7c8ece4439a82dcac39d35b9a154252"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["img/algolia.svg","88450dd56ea1a00ba772424b30b7d34d"],["img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["img/icp.png","6e26aed5ced63bc60524cc736611d39e"],["img/loading.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["index.html","d084c8ddbf997e85293147f7b67f5c3e"],["js/main.js","1c7d6eb8f8b1a9e2a06c37906146eb84"],["js/search/algolia.js","e6a9c3f8fa43a7d3421169ea96eef44e"],["js/search/local-search.js","86e7fcbc5aa273e6c3d2c94b0054809b"],["js/tw_cn.js","bd869d5fd54e2fe1f1eeee7c46fa46bc"],["js/utils.js","5720a78dca20fab16f21914ae3ac0757"],["link/index.html","f38ca3a5873bbbb3f85424e81c19b294"],["movies/index.html","4549f7604e0b099b964a94f21be6dea3"],["p/0.html","30a08c441c8420d6b546d69724cd4041"],["p/102.html","60991ef24df7975e8275d14739f852c8"],["p/10d8.html","4b9b5df923b187f4ccd9da7d70bd6c5d"],["p/1109.html","3d6f7450964491fb5ebbde8fc8da4591"],["p/1229.html","1e886d0afd493696e934d7cb233d84b9"],["p/1282.html","78aeec398e22de5caf309885895675e0"],["p/16e3.html","b8a3b2371b397b0adfdb087282f12e09"],["p/18ed.html","10c7462814e9b6f4b6b0f8c521213250"],["p/1aa6.html","1247ce8c29422f9a9486014564e1969d"],["p/1acc.html","f7a686970617718a1a3aa4372cd293fd"],["p/1b55.html","b8d7a40bca6e8ca816bb6d4cb695bbbd"],["p/1daa.html","310c809d75e762aad00f5b78c916b78a"],["p/1f44.html","f6a2b79d262decbe614fa5b7f431ceb5"],["p/23f6.html","bd89768ef9ff5b71a8ace0a100479440"],["p/257a.html","3102f6b4cbddcce204df5df29d463a0a"],["p/27e7.html","7ec60fceefd371f1217947fd541538af"],["p/28be.html","e530ef659955b326c13c3d86649c1572"],["p/293a.html","5937494e72fae7fe168a5d643d9498f0"],["p/2c7f.html","98ebe245bc374982704276d080a6c8f8"],["p/2d8c.html","c942db79feaee7bc1fc5c0fc365930ac"],["p/2f4d.html","ebf78fcebdac55c561fe87e8a20e4215"],["p/31dd.html","b4a7034ba52b6ef73f04a3ff700874d3"],["p/332b.html","1814fb8a471d901f3c47839373396ddd"],["p/33d6.html","6adb1af60bd1aad4c1de61baf851a04d"],["p/3422.html","4a3da8b9645ed83a4daa277f997acae5"],["p/349f.html","87e3f52a718f321c7d094452240fdb8c"],["p/354f.html","f475e4713bab5c7b098cbdf4739aecf6"],["p/35e3.html","13b80279bb27d406b2d2aed7d0b5a0cf"],["p/373c.html","f7edc3419866ba73ff358501c26034a3"],["p/3bd2.html","3a81b6a7d53f568101b7e25736ffe73b"],["p/3d71.html","da5a68e0cdf80abddfb9b780674e1bed"],["p/3e02.html","81c272f7435975b1affac35fcdd7eca1"],["p/3f5e.html","53dfd00b45f496b4189b1a31a02bb8dc"],["p/431c.html","e59f9c8827fbc0f3d6efc6c661d906f9"],["p/43d8.html","ba3bc71080a4b95eb86d0d869052fe83"],["p/440f.html","5e37decb16178ea9f7e2b5c772faa12c"],["p/4670.html","f54d35e6acf410ddd386758b9679402f"],["p/4728.html","8c14da875f39289a92d13e1bb29ecd40"],["p/4a31.html","6c5fea4bbd4f2ac04bdd9559aee65b48"],["p/4a8e.html","323494b1c1f468660f234dc131c09010"],["p/4ab8.html","864faebc07251466a0e52842f12a9e47"],["p/4c3a.html","53259c45877e5396efcd8caa50d104ba"],["p/4c8f.html","f159df9e428b6a204f6535f7a68ef21a"],["p/4d94.html","295e83b2864c532ea06d9105ae279ace"],["p/4e00.html","cc1b03ea34099106aa87500dffa3a77a"],["p/4efb.html","101bff81d7e919fa6c88b4ced4614d84"],["p/4fa2.html","488aa00a15cdc5de987c441ae4e84b35"],["p/5219.html","fcbdb5f13a29d7ed33914f9212fb68a6"],["p/56a6.html","89870f4e0ecafc4d1d9dfb0be5202e18"],["p/5c5e.html","84b135c03e92009a6b4781821f4e6633"],["p/5daa.html","9c84f1cd4dab42783df07b963b82845b"],["p/5de1.html","181a5249bd9d83c30ef8f5e146a059ba"],["p/5ed4.html","7ec5534150d483281e062cf1d8eb189b"],["p/6136.html","518612fabfcde97e4cda6308bbff30c8"],["p/62cf.html","8083e9e36dd7bbda7a5010c3b8cc9782"],["p/6511.html","31228e6c722925e110a19627a438b144"],["p/66c6.html","4605cf3ec9c7e21c1a46d95da50dbfb0"],["p/6804.html","84ead0a319af5abc0392684b2f2bbe58"],["p/6bb.html","9b423db66e648007d64d0284ab068519"],["p/6ff8.html","635a13bcc3a0d44010c0c9b21b78bb96"],["p/74e.html","117f67bae9e6359a530c6cb73d21dddb"],["p/76d2.html","cea298f40b39a6397d05acb253876924"],["p/7819.html","7bb3bae9e3a9d81dd7d260ceb75b0bc0"],["p/7839.html","962a28ecf129ef5d26be23e5cf9c194b"],["p/797f.html","01d91e87a753aa5c318e24e45d20a3cb"],["p/7980.html","61e54c186dac7785fc124bc2e80f1d17"],["p/7b87.html","dc7b4a96b08067cadc303525c2d3284e"],["p/7c99.html","eb8c9fe0497e83274b1660e22bf30c9e"],["p/7d13.html","910d4fc2a09c44c97b3b27ffb1735135"],["p/80ee.html","348a4363b842872a58fc7dab106d8c0e"],["p/8245.html","042cea3221e6d6136ca7353f42e981f4"],["p/82ca.html","e7e406c9a14c4d7aaf1507ec52688b23"],["p/8486.html","7ef08a0ac17a005fa22d17af220f5663"],["p/84ea.html","6258c8d17e0d5171895b46b7e45a123d"],["p/87a1.html","85d56addc5982c611acebf6914e6b272"],["p/88b6.html","cb0978f795a668b7ce5f69a1091f56b5"],["p/8915.html","26617a856612d06f7a9f16b07dcddea9"],["p/89a3.html","3e9ab4a35233766765279feb9358c0fb"],["p/8e8e.html","94c07335da60ebdf5c5e60037019337c"],["p/91d7.html","80631aea094a215358d38dcfb1a960ea"],["p/9234.html","8c169f8ad31f35771b2497205bac1bcf"],["p/94b4.html","f247aa563551ce47201373541b4753f1"],["p/96c9.html","daee36bd9d625df1c060e1018d1aabbd"],["p/96d2.html","cd68ef5970a0f50538fd83ef0c80dc41"],["p/9793.html","d3cb672fb2675d6869315236d734d001"],["p/98b8.html","50ddb385516aece49ed90733312bc744"],["p/9bcc.html","724385aba4400bd6387a96698fd28a7b"],["p/9bdc.html","4ead35d7fa6ba16b4efad7861cd272f5"],["p/9f29.html","16273cf79ba09ea00fa8c75055e26f46"],["p/9f8a.html","65e860248b1672996ef69b5893e8dec2"],["p/9fa7.html","8039525ea1dd7babdd8067dbeb938dea"],["p/9fb0.html","75527dfd2f45771bc4f1f64fd0b93da2"],["p/a1a7.html","0441c1a1203c84e0e477d80c59256013"],["p/a28d.html","1af33007d35fcd72bbf787e09e33f62d"],["p/a56b.html","8d03862409c61a6656673918bda9100e"],["p/a695.html","d090ccc9c2cc1615832a44ffc2c895dd"],["p/a824.html","ed937243276559080af527875b9bcaa8"],["p/a92c.html","11d8061659dd8b8b8e521b6ee0ea29c5"],["p/a973.html","b6501641429149fcc7491dd9a4d8b6cd"],["p/aa30.html","c021ef0fa56ee2511a15b4ed48589f60"],["p/aaa8.html","434cd17b7754b5f3d2e0a2711ff366e7"],["p/ab06.html","9136b8d10ea0e21ad4c379e03e180b09"],["p/aca.html","10aa8829347133f4d0276f9dc145e5c5"],["p/adf2.html","938ef9535cac01fe8c72555523517ea3"],["p/af09.html","b299297a79c086df1a3b70fb87d50ba3"],["p/af33.html","3587492d2a4b1ea96eef5b840b152a9f"],["p/afc.html","153a53a762d30c6822f3f5088711bd35"],["p/afc8.html","08a39d32205a58772c84ad1bc6b960d4"],["p/b013.html","dfea862f6696149ea5086533fc4b358f"],["p/b2bf.html","caa3c9ae295c4ffab56dc4ad31410cd8"],["p/b392.html","3e04e5753a6145f17eed33e9abe50873"],["p/b3ec.html","ede19e22e2cdf86087959306618f3b76"],["p/b66d.html","021ad27662e1b7e9f9b790c368c0e603"],["p/ba89.html","5425fcbdcf5c5b87e3216e4714f44ed7"],["p/bc8a.html","09100b65f8370e8c4868ae689d2ca78f"],["p/bd3d.html","5ea63207cdcc2b36ca8e588e945c80fd"],["p/c0e2.html","5d6cfa64c5ca547a21f98a73a9769b71"],["p/c226.html","bcbcb6ababef374bc5b80b705ad3ec60"],["p/c346.html","5626732cc71b1985d8d7e8ef6627a457"],["p/c8ed.html","290a75daab343c6dabec8be74dc84685"],["p/ca50.html","d5c23eac3c34756406eb7f4c8a3a3bd8"],["p/cb44.html","28d4f637b9b12014b25c58c6e0c5647b"],["p/cbb1.html","4fdd99adaafd00d6e734facb8ed46b2e"],["p/cd72.html","3e6be1aa907160aef95d8346afde1714"],["p/cf73.html","19a7289b3e1d51e4bbc34d9ae58bb8d5"],["p/d04f.html","60c369ecc73cf2d8c00fc2331aaf00fd"],["p/d340.html","2b5d5678a737a3e49b9efd1b567931ed"],["p/d412.html","e84a2e7471ccc2d02810879ed1a08768"],["p/d67.html","78f67439315e357e9ba4ddbc7b0c8a5b"],["p/d6b4.html","f17d9c17941a7bfe107a25b007a73491"],["p/d74b.html","ac5b7ddda1c6a10e884eb112e8967a4a"],["p/d81e.html","0959a4f9dc595e0268d372bb0e8e583f"],["p/d8d0.html","8a6c5cee463b067e6c32946e1c086410"],["p/dbb1.html","7c061eef652eb45c10375adb638f1a6b"],["p/dbd2.html","a6bdb7b3f9ea7daa7f77c46d575d91e8"],["p/dfc1.html","22867f8d36099855ef9348c6f3d0a31d"],["p/dff4.html","21a6670bdc7aba2eb2a8937e417a45cd"],["p/e01e.html","3a3d594c364d9336d673369b7624d413"],["p/e0a1.html","fe008d9c2df67dcb50c303c11a5ff712"],["p/e0c9.html","8aa923805b582e6492e30a8725660eaa"],["p/e25d.html","eac6b2ab2e49cfb9759834e53b0cf3aa"],["p/e32c.html","96e5ee3b4fe8f3e4aa4759196c1400ee"],["p/e376.html","774b4a1bcfcdb0d1861b83055f86704f"],["p/e593.html","03e1a3ef97194efb03b5831c519d5232"],["p/e64d.html","a9d4fef693deae535ddc2e844637279d"],["p/e834.html","45236a4dc0772f6157e966ecdc728fe4"],["p/e87f.html","094aa477b93f85a54b22090f75d5e922"],["p/ec16.html","02cfd8f365d2541306c50d62cef759c7"],["p/ec8b.html","c8d69532847b36c4da0c30eee2de4f5e"],["p/ed06.html","7170d2b8bfadfd37125a6fb914d368a4"],["p/ee77.html","df4d8af7591c7919c96e50fc9faf58c1"],["p/efd4.html","ff10aaa4ad896fc972d07fc016bd3242"],["p/f04a.html","f3372b28b1083ec6d6549cd9800f1b62"],["p/f226.html","bd71054dcff999bfe787122be60ae398"],["p/f25e.html","59d1cd2b5e6c6030caaaf860b86d26a9"],["p/f2b.html","c245c7a1e686c39d97dcf351bc8c8549"],["p/f370.html","070fe7580fb2995b06b9329057137aae"],["p/f449.html","2d5ccb0fca74840e55ce57d11a9cd51e"],["p/f473.html","9b1eb6d0833a17a0d25fd8e38c3e89d2"],["p/f628.html","33e8f444b097c902a0d4dd1cc733d3a3"],["p/f791.html","a16b8a35a61f47c49b00b3a8cc0e89cc"],["p/f82d.html","19bddc4505063f722676cbecc8d360e0"],["p/f833.html","85df96ced4d023c048b1c7ed7f1f8529"],["p/f93c.html","3746eb2cf4bb238247ae02e096d809d5"],["p/ff05.html","c932823242fd0f3ac7647041516c5c64"],["p/ffc5.html","9a5dd15fc7bcf24be1837a2adf630a58"],["p/ffc6.html","4507995c264af75e3f756722d87194b9"],["page/10/index.html","8b8235b727f0fd096f18894aeec090d8"],["page/11/index.html","10d30cf0e17f8f4c9e39f3c9af278e52"],["page/12/index.html","3fb29dec32e0f41e3fdc823336523027"],["page/13/index.html","9bb8742d1bfd0720831af836cb66122d"],["page/14/index.html","7e0bfc98f088faccd5009c8e4e49fea4"],["page/15/index.html","58f8f826cce9f29ddc54764e2f1615e4"],["page/16/index.html","961d1623e21f0627182f7a02a8470537"],["page/17/index.html","f79b926da302c077bc57aecc3ea8223f"],["page/2/index.html","becc799190e6c23b721057b46662bbd5"],["page/3/index.html","7e7b42c94a8b4bfd371b8e63a014608e"],["page/4/index.html","1f8baec0797862a3141355e0fdf134b0"],["page/5/index.html","0ef0e5d57713dd5aea1b55cfb97a580c"],["page/6/index.html","936896919fb42e4cfa004f08889465c3"],["page/7/index.html","1ea959b5e4712f715ff3b3164cffc4a9"],["page/8/index.html","120d5486a4db5b4ec5002d8f3fc50581"],["page/9/index.html","31939e2e95deb8382ba8a0c826890cd5"],["tags/AI画家/index.html","df5628d41a78eb7c77e6ccd9b665654f"],["tags/Android/index.html","b4f56dfdeeab26481bf21571ad2313e8"],["tags/Effective-TensorFlow/index.html","f7868476fd972324e4bbca5ba18e29ed"],["tags/Effective-TensorFlow/page/2/index.html","9c05ab21c3be45961e80412c3fdc501a"],["tags/Flask/index.html","3befb5bbc46295d17061f4e5e8f050bb"],["tags/Flutter/index.html","85fdd11cbeff8322f92e80086000f5d5"],["tags/Flutter/page/2/index.html","818b18b4d502b54148c10a208c4ec6e2"],["tags/Gateway/index.html","1aa5cc81ecf75f8f1e902b4399f26c08"],["tags/Git/index.html","d752c41af033990135090b5a8de91ecf"],["tags/HashMap/index.html","44ec09d12f3afd3474473627fde6343c"],["tags/Http/index.html","d9f4676691576f194f2d1de57652e3c7"],["tags/Java/index.html","3abd1a271313334867acc48e2dce5d92"],["tags/JavaScript/index.html","356749544ea5d480a410106a6bcf1b1c"],["tags/MQTT/index.html","803c2db8f2c081328028a372e70ea9d9"],["tags/Machine-Learning/index.html","c61b81a4355929dd542199f37c24ffec"],["tags/RPC/index.html","7d3ebfb46f9cd84f2f855ff5e300acf2"],["tags/TensorFlow/index.html","5b0e20b2a19e68821c4381aac5386c60"],["tags/TensorFlow/page/2/index.html","5bb70587b360a193eb61427253d4a713"],["tags/TensorFlow/page/3/index.html","bff6de65035059ce3aeb7df5dc965941"],["tags/docker/index.html","b4d90479259a206b19dacf8489d36897"],["tags/hadoop/index.html","5bb662a6b4b090f5f23ac1496e029ed9"],["tags/hexo/index.html","d13679c67b06c8545f4f8c4e795b95a3"],["tags/index.html","4589e4432c02e1a98858026025f583ce"],["tags/pyenv/index.html","b518a371fa74c60e77f2cc511376eca3"],["tags/python/index.html","7683430aeec34fb2c6fd4b34641f9f0e"],["tags/rocketmq/index.html","89820debe5997bfe27000eaa883b78bd"],["tags/springboot/index.html","20d28d16bbac983bc4a30ff51d6228e0"],["tags/个性化推荐/index.html","9e849524afdc346f3fae306623b1a129"],["tags/二叉树/index.html","67d952c622acdf75f29cd757b839f395"],["tags/云计算/index.html","ca55765f1e23ab4290b4cc924b2e14c5"],["tags/以图搜图/index.html","fd53cdbf57e56e438aa495026f4489c0"],["tags/其他/index.html","bccb45932903d458db0773f5c02ce603"],["tags/其他/page/2/index.html","bf19b446317ef79ea50306e0bb56cf82"],["tags/其他/page/3/index.html","9b41fa0bccb540c2ade5c3e085a53bf5"],["tags/其他/page/4/index.html","984ecbfef67a7ebb839b7bb17555e952"],["tags/其他/page/5/index.html","027542377b9238fbb1d792f323661bda"],["tags/其他翻译/index.html","698864c9525171be58d21428d247a410"],["tags/其他翻译/page/2/index.html","b9319c20e0cc34c053e7c728b951be05"],["tags/区块链/index.html","45e3dec88cfbb6ac3d607ea197b8e2b6"],["tags/卷积神经网络/index.html","e8a04ccb74d6b65823804465aa8a1921"],["tags/少儿编程/index.html","fdb00ac15788e18c44dc252b4ca185a5"],["tags/并查集/index.html","48e5ff65dd160a0d98819cc19e646bb2"],["tags/序列化/index.html","31e3d79c22714593fc4a718cceb822bd"],["tags/微服务/index.html","945d2062555628771aabb4f577114c8d"],["tags/心得/index.html","347e65310a70ba1df0d9ef7103d9c8a5"],["tags/总结/index.html","40e0b493babd3017a87a33206a2c420e"],["tags/掘金翻译计划/index.html","34841930964502863bd264bb1936915c"],["tags/掘金翻译计划/page/2/index.html","79db0c2086930c9bdc153b62adcac3b9"],["tags/掘金翻译计划/page/3/index.html","de20637aada487267cf4446f9269c4ee"],["tags/操作系统/index.html","d4c8a1dc61f30c5dc0b90fe1dd350648"],["tags/数据分析/index.html","2f5fe96e2a436e941ab358f0c6162b82"],["tags/数据可视化/index.html","ffa9ea43f1101f68418cf6de265bbfe7"],["tags/数据库/index.html","e8ce28ce14866d52faaee2b29a565cf7"],["tags/服务器/index.html","1d579b4044a3201b0b6b04f3a3344d35"],["tags/机器学习/index.html","64f43352d2d81dade8436efaf8040d8f"],["tags/消息队列/index.html","9020f3e9e9764197e7abd976ba370ac4"],["tags/算法/index.html","be79548aa069cfeeb5842f571f091300"],["tags/计算机组成原理/index.html","3bd257bb776fda6d20ce209c18e89108"],["tags/计算机网络/index.html","b411a767d9c40e6b7cc31c2e0a5b3d6f"],["tags/读书笔记/index.html","212221d93cfd390d8faea4a76279c9f0"],["tags/进制转换/index.html","f1ee453694b0f7e9d81619fe2a86a4a9"],["tags/问题排查/index.html","6fb6100d7a7c22811a4b48d0276c2d56"],["tags/面经/index.html","252d7171687a53d5b45e46c902043fab"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







