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

var precacheConfig = [["about/index.html","2d9c873e8201b4c8550b70058122d770"],["archives/2021/06/index.html","2950bfd0cf0fc069841e6bd5d26149ca"],["archives/2021/06/page/10/index.html","d01c72f9b803cb15a2622eac1c35aa03"],["archives/2021/06/page/11/index.html","cf26c59eb3ae1a112b400eb8968cd157"],["archives/2021/06/page/12/index.html","a733147567aad5dbb7f646c9fefaeb1d"],["archives/2021/06/page/13/index.html","5d8b00c0d597023af7163affde48d2cc"],["archives/2021/06/page/14/index.html","da8c971ec0b36822a723092f81751db3"],["archives/2021/06/page/15/index.html","9683fa823a3ba014d23cf33162b3bad6"],["archives/2021/06/page/16/index.html","e75c383e754a2ebbbc54ec9627f7c820"],["archives/2021/06/page/17/index.html","6275d348c43534e2dd0b7288ee8ecb01"],["archives/2021/06/page/2/index.html","ac84d74d1556974bac7cbe9087aaf579"],["archives/2021/06/page/3/index.html","4425fe41353f38a6adc8630718ede402"],["archives/2021/06/page/4/index.html","905a6bdfab978ec69a00874e4125fa55"],["archives/2021/06/page/5/index.html","6bbc1135b55831dcc81787614e0aa777"],["archives/2021/06/page/6/index.html","da7d44d43070fc576ff27ce0cdf1297a"],["archives/2021/06/page/7/index.html","d318bbcf513e9d0164c028671de86100"],["archives/2021/06/page/8/index.html","93f0efffbf71f34d00e4eaa51336de2d"],["archives/2021/06/page/9/index.html","c1c71efd06a755c4af2a733bf877b1c6"],["archives/2021/07/index.html","5ef3b057e3f9d0c3be3f2c1e9b17fb39"],["archives/2021/08/index.html","901f4b2edd983cbbbd1dec8ca4c40066"],["archives/2021/index.html","ab0fe0a281b0a3139ebcc71efa7c49f6"],["archives/2021/page/10/index.html","20d373ae67d631f1fbd8f1b0cfcef808"],["archives/2021/page/11/index.html","df735631478f7996d0b3a873aaa8464d"],["archives/2021/page/12/index.html","2f2ccb878e776b267a54735cd1e7ae6c"],["archives/2021/page/13/index.html","ef4b86bf41cc5b1c15e34b18425dc1e2"],["archives/2021/page/14/index.html","59e9570c11fa010c1839a2a79e133d01"],["archives/2021/page/15/index.html","67e410fcc0f22564bde09fbc233f5ec0"],["archives/2021/page/16/index.html","b4eb757d34f0104817c6c0791b0b3929"],["archives/2021/page/17/index.html","dcb89ae0ab33f8feb48e49b14aab6496"],["archives/2021/page/2/index.html","55d0fd9a0d15de09a4936fbbb92e05e5"],["archives/2021/page/3/index.html","182e90987d765394d7513a21f557c3ce"],["archives/2021/page/4/index.html","72ef1be6978e0479f753f563f4ec784d"],["archives/2021/page/5/index.html","d7925c2bfcd260c90e02b47045966539"],["archives/2021/page/6/index.html","87d31785267213a0f3f04a4ad1a7e37c"],["archives/2021/page/7/index.html","e112c42794cdee7eef335fc10c9dea4f"],["archives/2021/page/8/index.html","0b00fd6ae686c2fab3c6b95f9676d1cb"],["archives/2021/page/9/index.html","56ceb4ed14c84115bfd238a26fd441dd"],["archives/index.html","7a15a2f39f2a631cad75a917fae754c3"],["archives/page/10/index.html","21eab7c082c25d4870a4f966e5a044fe"],["archives/page/11/index.html","44cf11639641a7e6038ffae5fed65dc9"],["archives/page/12/index.html","28892d0b6805fdfd1225362f2d912e03"],["archives/page/13/index.html","9f4b43a09e1d6b51b2f5b57be9628e41"],["archives/page/14/index.html","f5d38861ea79fe916d0722015e4a4ef9"],["archives/page/15/index.html","83870b0c1b31eb1d8262e6f75af5d378"],["archives/page/16/index.html","de44c5e11eb22802b55cbbae8ef3eaff"],["archives/page/17/index.html","913d4fd75c0f9cbc5b428666244ccc70"],["archives/page/2/index.html","27c1defd28fd440508de629a848c5df3"],["archives/page/3/index.html","6af44889b7f9605593d29b33a081b1cb"],["archives/page/4/index.html","27c615d9e549b2643f627085c639d4d2"],["archives/page/5/index.html","53159909d82b29f921a23b6cae3c4638"],["archives/page/6/index.html","9b17e8da869cafc60fd016770258a3db"],["archives/page/7/index.html","66c9fa9f71f177350a990ce0872d2643"],["archives/page/8/index.html","ec36d9ac79ae000f99c643f8d2388511"],["archives/page/9/index.html","84974653535802bf182f697f6feb3a4f"],["books/index.html","97ecc74632e08ab548d5b3ca42686ab3"],["categories/index.html","e7a783e9ba0b4d68d46bf7e6da3d1ba0"],["categories/外文翻译/index.html","fa3c650f5e58420d9abab5b272dd06b3"],["categories/外文翻译/page/2/index.html","225a9dfe6c501e36f79e33084922892b"],["categories/外文翻译/page/3/index.html","14f76e3ab0fb29dd758521769019437b"],["categories/外文翻译/page/4/index.html","f01b570679f274ec3b2a77792c8f7b01"],["categories/外文翻译/page/5/index.html","78df5af5ed25b3a2aebeea365d734b5c"],["categories/学习笔记/index.html","85d2a7105a149fe130d21101a17e8500"],["categories/学习笔记/page/2/index.html","e913cf29da646d7bf05069cea43c8bbe"],["categories/实战教学/index.html","eb9056adf45b78d2babe9f201e05d3f3"],["categories/实战教学/page/2/index.html","ad73ffe612683c7ec638127755e698a8"],["categories/实战教学/page/3/index.html","1b870bd1c8580bcc598dd26cbd71ff9c"],["categories/实战教学/page/4/index.html","add3f3623a2aa90180a74977f9387ff4"],["categories/技术科普/index.html","7fda36460b48c2329051d0a0e96cafef"],["categories/技术科普/page/2/index.html","2340a6a05156ee32c44204c6373c11c6"],["categories/技术科普/page/3/index.html","064a26a4f917a23532044d110ef24598"],["categories/来都来了/index.html","728e2ff2ae292e70f2abe105f7681982"],["categories/来都来了/page/2/index.html","cff88f929c5bb9ba349384038295d228"],["categories/来都来了/page/3/index.html","f9179eaa6cbc276b933166218777011c"],["categories/来都来了/page/4/index.html","c50d9e683ec33421a6500939fdc1818e"],["categories/每周一问/index.html","5200e179841c579797305d8353ee1d7e"],["categories/读书笔记/index.html","67a587e3e1741ffabe195dc598d18ceb"],["categories/面试学习/index.html","530a759ef2eb683aa8b6665ac601a71b"],["css/index.css","c7c8ece4439a82dcac39d35b9a154252"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["img/algolia.svg","88450dd56ea1a00ba772424b30b7d34d"],["img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["img/icp.png","6e26aed5ced63bc60524cc736611d39e"],["img/loading.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["index.html","841777ffffdb55514643a953408e9507"],["js/main.js","1c7d6eb8f8b1a9e2a06c37906146eb84"],["js/search/algolia.js","e6a9c3f8fa43a7d3421169ea96eef44e"],["js/search/local-search.js","86e7fcbc5aa273e6c3d2c94b0054809b"],["js/tw_cn.js","bd869d5fd54e2fe1f1eeee7c46fa46bc"],["js/utils.js","5720a78dca20fab16f21914ae3ac0757"],["link/index.html","035e271cda659f6b5be465758e5eb966"],["movies/index.html","b62e2976b7bf35c06cb2a4841aa7df2c"],["p/0.html","605ea8864512ae2e4846e46d3208d227"],["p/102.html","37d6e9129bb40cdac76fcefa26487edb"],["p/1109.html","4f8095b0578236db9004e06ec4d6b8ed"],["p/1229.html","8c69e3e546ef1766e1a753d68a0fbd7a"],["p/1282.html","e9d2521492755ba814aae944eca8a09f"],["p/16e3.html","c9db37545d56785bf3fc32ba5de64a44"],["p/18ed.html","8da3db621be412aef25636280433429b"],["p/1aa6.html","08b53ebf2c60cf29a93597521f89da35"],["p/1acc.html","5af6a7d702cf9f30db1f9472353a8c0d"],["p/1b55.html","555f86df83a4f526b77e4f45bfac1863"],["p/1daa.html","68c5453d04fb27afed7309d0efd2ef73"],["p/1f44.html","afdb445a27b6bdcad559d2993f5db780"],["p/23f6.html","d96015925fe64e6a5e56c2251ad06b3c"],["p/257a.html","88caf67b9909b22f1f929d55fb4048ac"],["p/27e7.html","6b87e38443ad65ed678ffba2b233fb16"],["p/28be.html","ba42479db404bd6a30661d15edc14549"],["p/293a.html","e57a2cacb42962586a4ee52dc68776d9"],["p/2c7f.html","6404a94695eb1845308c02c7c07d2895"],["p/2d8c.html","a6c5f36ddf52584af7b0cddc640d63dc"],["p/2f4d.html","953a90159cda8f85984f5d2183dfa1b2"],["p/31dd.html","e275fd536ea738ba060e0ee5214904e6"],["p/332b.html","373818783db07aefe5176b3407d9cf3c"],["p/33d6.html","6f19fc69f95505f70ac02e51b6f69766"],["p/3422.html","8033473926241e4d9f38e32e440ca6c6"],["p/349f.html","fa345c2a13bc8deb9904b277949b3214"],["p/354f.html","87e81073d685da314d7cd7b538d9033e"],["p/35e3.html","c207711065c04d02b70255f8b1579de0"],["p/373c.html","e22f3e478c1a41217e06668eb451b2b3"],["p/3bd2.html","387690786fa2f830e551543b4b92dc5a"],["p/3d71.html","83da374907f170fd4cd877e313f0042e"],["p/3e02.html","afbf933770f09fa67d225ef9b5573a17"],["p/3f5e.html","0b7227664ba920c10a46f5733848050d"],["p/431c.html","e34b351466bd8bd4054328dfb7dbb99a"],["p/43d8.html","5f8ccbda8bad149d5ad8811f988609c2"],["p/440f.html","101ad3207b4e39442babfdab90038ac7"],["p/4670.html","9676696c1cc230e2f154520114596eda"],["p/4728.html","5047301a9ff97f3074e4f3033a57baf2"],["p/4a31.html","e8bb1a0bc186135cb4054466ddfa5c3f"],["p/4a8e.html","6b47e4b61f297bcb2a5e03a5f2b38e30"],["p/4ab8.html","ad467310e27f0f944440976be5ac2f71"],["p/4c3a.html","45d862e1d6fbb4f3fd3ef515aa9ef4ba"],["p/4c8f.html","0182c263b90108fd0122f05f69634339"],["p/4d94.html","4cc3356a84ea479debe83ec01d3a424f"],["p/4e00.html","a92476bd4748057d8c691c2155f945c2"],["p/4efb.html","2a9277d4428496c138f131b3980546db"],["p/4fa2.html","ab1f1ca842f8a561d883fb54d241c837"],["p/5219.html","5508c355d471fd02dd12e5fc7a3bae62"],["p/5c5e.html","8abbb0c3fbb9098a79a99a559517aff8"],["p/5daa.html","dc97545a13485c948f2d17ec42fa56ae"],["p/5de1.html","c9fd36c1a88dfb15e3b8d4e46adf2db1"],["p/5ed4.html","52519665f61a387e6c4d5a7c72cac0e4"],["p/6136.html","917ca62bdfcbc92a044b92fcf8c80df4"],["p/62cf.html","a9d9a0873f68eebf18b87efad4d0025d"],["p/6511.html","c6a5c833c8b8a6bb0441b8b49b97a672"],["p/66c6.html","ab4e00e021e04bf55892e306028ad3b6"],["p/6804.html","0b9c5c1af57dcc2488454a90d7781875"],["p/6bb.html","fa00dd3c125b10ab06563c25ea007f13"],["p/6ff8.html","7cd6efea8bfac65fcb6f5be0a5d239de"],["p/74e.html","09285de784d7b823b3b73c61387ba9f9"],["p/76d2.html","029202526cc084a31e8b10e5e50b8027"],["p/7819.html","0ad09b55fc352fc5a683bbc89814048a"],["p/7839.html","792b17386ef47f52fddc119384dd83bd"],["p/797f.html","e97876d73e07aa01251b40ab189d069c"],["p/7980.html","2c6398abdbd37345443e47a1d6696f3c"],["p/7b87.html","3a7f747dc2ddb207abb3cda0715d4098"],["p/7c99.html","01ff53c7ccfac48513b562a8550b4d10"],["p/7d13.html","201977e8f7d52154c08211c1af562450"],["p/80ee.html","115fa733d73ab7dd01321f7be6bc0491"],["p/8245.html","e9621a2c64aad65a344a1bb20e97c64f"],["p/82ca.html","fe018e72976d2ba0fb89fb1893929304"],["p/8486.html","3ae6115f2985b5480e77b0f4c2e62a25"],["p/84ea.html","67fb2ff04aa544f179f08a3154703bec"],["p/87a1.html","f461052486db882a020c8942af9986ee"],["p/88b6.html","41690cf3fefcac5f95d3cb4be0e9ee37"],["p/8915.html","1df214114ba5ae8780145871c118f7d2"],["p/89a3.html","456220abf7f09d89f5859342ffedf209"],["p/8e8e.html","7ae436e3e53ad35a8ae0fbfba3f74fc1"],["p/91d7.html","37c5cbc86b0d27b8bc284e3f1d029f93"],["p/9234.html","c233ad7a6b4c316eb83b3e2ca0ca7a70"],["p/94b4.html","8ea6f8314927aef0ec7e6c747ea86212"],["p/96c9.html","94fe064e690ee316b1d323eac9f801e6"],["p/96d2.html","b7a95cf7ac40c62a366614990dfd9fd2"],["p/9793.html","20791e00e25684eb8516ccac1934c816"],["p/98b8.html","15b22b09a83e020a3cd8837dc09a2146"],["p/9bcc.html","4907cd11cb5dfe676e932fe584747955"],["p/9bdc.html","ff3ff84a1335f69356be2f91ea8b8ba1"],["p/9f29.html","392482f886799a04706b42144e70b250"],["p/9f8a.html","bbaf47b5560782e335a8094b13b8f27f"],["p/9fa7.html","773a29ba0ca1e9ce3ff4c5ed40722403"],["p/9fb0.html","697ce22fd2bdc94e3dc8f061b03511ef"],["p/a1a7.html","bb54ed59e4793dddd396765d6b59a1dc"],["p/a28d.html","977a45e0a95c58f108e4150f04748033"],["p/a56b.html","cf6847723a22775d1b605c2803e89116"],["p/a695.html","81ace1aa71211354310ceae705f64320"],["p/a824.html","26a2a71be3430dd870cdae282fbc7a14"],["p/a92c.html","01628e343fe9fcd46985394f1335e2af"],["p/a973.html","a19157e6adb8e645795d4215801c878b"],["p/aa30.html","ca0c216ebfeaf54bdb97df0a79ba6f80"],["p/aaa8.html","3495dcf4de2cc5d81fff5c262e2d57a9"],["p/ab06.html","b431360d86a1977c93fd5e9d83fc882c"],["p/aca.html","473e8d84d7f4150f803bc8a1737851cf"],["p/adf2.html","2c6f2a5bf599a42df7b57dd037697b14"],["p/af09.html","10a150f5483538eb20b6df4f7bd4c41b"],["p/af33.html","1485128791e3dc25b22d6e45d5e28bf6"],["p/afc.html","851fb5ce0d3165c0d893382773e370a4"],["p/afc8.html","3fd64925ab6f0fd2657d04a850691068"],["p/b013.html","685a2c4aa29aa3e126fe919792a48e12"],["p/b2bf.html","66f3099c53ed5b96d41639cef241d74a"],["p/b392.html","2410627884c2d549d64e0a47d5edc104"],["p/b3ec.html","bf8a08a447ec6114ba861a05df99cc03"],["p/b66d.html","a19bc47372bb72cc172201a2cf12127c"],["p/ba89.html","df7a0f3eeb25f06f2243aec18aa3bb35"],["p/bc8a.html","04d3c7aef9e8b0b31a39a8efd0e97c1f"],["p/bd3d.html","19ad749bbedb18f662d4be01f1407bea"],["p/c0e2.html","5ea193b4563349271ce966ef3b94884f"],["p/c226.html","9f21c524428557493dfb734b164aa54d"],["p/c346.html","35f6cf78a30de8a38cfcd791e4ce5686"],["p/c8ed.html","45f702ff5df530936746bfbdc61d4ef4"],["p/ca50.html","5f669fd8a1d5302c786acbdd3fd9b7be"],["p/cb44.html","7a2ff74f34c9eb27ea8db728a6082b7f"],["p/cbb1.html","07079fbac23ab8365afc42b650f3e6fe"],["p/cd72.html","cc469eb3f3fb2a546f7d249230989cac"],["p/cf73.html","3ae7299286fb70760313cc575430d381"],["p/d04f.html","e10636d0fbe9fe4dbe53a275fbae3150"],["p/d340.html","9bad58b3cda3ba9bf062cd7e6666b3b1"],["p/d412.html","d5794f46ccdd4e9717b5de161b7ca4ba"],["p/d67.html","9d7716b63b8537c1427b1086ef94874b"],["p/d6b4.html","e044d8e8525973035cd33f1a7744fc7d"],["p/d74b.html","f1a7fe6f57c7af480c0469afb5dda666"],["p/d81e.html","64bef3b7524c6e9b10186f84481b4d2b"],["p/d8d0.html","1e7c49798f36db5ddbdc114670988f94"],["p/dbb1.html","dbb7bddab7481a2ca0e1e9937ae8eb2a"],["p/dbd2.html","5c8ee7415836e944df0c4544b1984c2e"],["p/dfc1.html","c926db0737fe7b6208c4b84852392ab6"],["p/dff4.html","4a91242bc1d17a29fee9321fa1500243"],["p/e01e.html","73276df2a370e55cff128e6532ede80e"],["p/e0a1.html","60a6fd9487aace901e4864046c97069d"],["p/e0c9.html","f3163d3c80c5ac7538b4af80b365f4df"],["p/e25d.html","99ac121045f0a3ab1ea0d5486c527523"],["p/e32c.html","5d7fe25b2f5236a365fbdaae26b1b0df"],["p/e376.html","7b62f96bd9b7b5246fb221129b23cc4e"],["p/e593.html","f2c5029c6743793c61a0268bec1f15f0"],["p/e64d.html","eebcc5ebdec54a9c50fb363a1d530161"],["p/e834.html","e297482f6748a17e4ddccb50e3583422"],["p/e87f.html","c61d0809aaaaaf6fac9f640ac54299d2"],["p/ec16.html","082417d2d9e2d52ae903735404c49fa1"],["p/ec8b.html","bb274f9a15ae7596e73221a17adcdebf"],["p/ed06.html","16d2f9970c100523604087dca3cbcf7c"],["p/ee77.html","1d853d3783fc994d2511bc315842baa9"],["p/efd4.html","99364a0bfa2f02c241dd3b11f917f2f7"],["p/f04a.html","615ab8ea40f422d0579a69dee7cae78c"],["p/f226.html","695953063125fb5a15ed203ec83eb11e"],["p/f25e.html","25fd0cd363205b886ad31979d2eaa7b5"],["p/f2b.html","6550dd84448ffafa5acee426fb7aba73"],["p/f370.html","47565c2f5ddd6719a17ac2c1a68abf97"],["p/f449.html","e1d345bc1e1a33755740e99f7f76091f"],["p/f473.html","19c295973f31b5ed778eea6c0c21b748"],["p/f628.html","fe8899d2eed9bf1d3d9e015b3acfabbe"],["p/f791.html","d9d8b289c8578dd62b903fc441d8a6ac"],["p/f82d.html","fe1f72d016ff329deb098e7cb4e37c85"],["p/f833.html","64e5648f71314191bf5d488e2973d6f1"],["p/f93c.html","c1b4077b9e3616c01fe10f32583bf465"],["p/ff05.html","0af6558e177f83e1f73753baf7371292"],["p/ffc5.html","ba9f1c45f9ffc2288b5cfa31d079533f"],["p/ffc6.html","9f1f7e28ba997ff853d370642070f560"],["page/10/index.html","7167cc6c19f5611d1920b83698f29897"],["page/11/index.html","e03147a0333064968bc5b3a0c7f29812"],["page/12/index.html","0a83f125019c8e1472e5a8c36c83d76d"],["page/13/index.html","f9c7ef10f47789a4103f47552a8e8a20"],["page/14/index.html","9d38edd3406466cfbd3751a78ea50783"],["page/15/index.html","5ee75f6ce582ad0eff55dc83ff2ae2e6"],["page/16/index.html","cbd68207a60ab260d6f11de7693d897d"],["page/17/index.html","c17ba646f3d12e4175c09fd33db27486"],["page/2/index.html","f7c594ad9062399bda404b183060eed7"],["page/3/index.html","60e35f117fb67ffd39e57b184fafa6e7"],["page/4/index.html","c35a70651bc0ccfd39a86a10d863d7d1"],["page/5/index.html","41cb929f35ead6a0adbc70f1fc9cc3f7"],["page/6/index.html","16b7fe165bdade81f0303a1ca4a30e0e"],["page/7/index.html","45a778b4c929ebd1601adf8f64527fbb"],["page/8/index.html","b0d343aa5c3fddc4b4a3cf995eb1c382"],["page/9/index.html","faa362b81668a2f205a7be3d4b0cc02c"],["tags/AI画家/index.html","6070644e3b2523bb7da138d7c2698a01"],["tags/Android/index.html","4dcc8b49e0f9bf10240844f0c78b231c"],["tags/Effective-TensorFlow/index.html","5e72e2da76e37c77ba0c8c4e9929fd04"],["tags/Effective-TensorFlow/page/2/index.html","76cd3b469bb922b6492f88eab52491a6"],["tags/Flask/index.html","7ea6c2003b0f031d3a266ae56e1167da"],["tags/Flutter/index.html","9ef3247dc1610e6d7d62140d818b4b92"],["tags/Flutter/page/2/index.html","8fc240f2767ea6448de913975985c790"],["tags/Gateway/index.html","90b8b7c60a92056dceb25d7402fbba8c"],["tags/Git/index.html","7131f348c9b791f000589c8a2e01161d"],["tags/HashMap/index.html","685f0d38e573ef319534f85b57948051"],["tags/Http/index.html","26868255470688a2b74f9d0ff68a5faf"],["tags/Java/index.html","f017ce3024fa15b0ae4795ff769ae0a9"],["tags/JavaScript/index.html","b59f3f15a9d2b51932f2613f1a351c9a"],["tags/MQTT/index.html","18ad0e516bcdebec4d28651269ccb33f"],["tags/Machine-Learning/index.html","d35916f7b5393c9f3e16725802f98475"],["tags/RPC/index.html","ab07a1260cfdd7773fd53c6e960257c9"],["tags/TensorFlow/index.html","8fd8eab80a5de40f02451b2bf64d6d1d"],["tags/TensorFlow/page/2/index.html","e3fa7599a79e9490ce43748ef42e4e49"],["tags/TensorFlow/page/3/index.html","d988a993c8b64d77cbd15bf0b7d6a306"],["tags/docker/index.html","570938a1a4ed4d14edf51e37fb614c6b"],["tags/hadoop/index.html","2deba5c92353d875e5bf49c3d2f97f4f"],["tags/hexo/index.html","edef9951062f6f4504b6fc6329d1a044"],["tags/index.html","a56cb82a905b441b6295c1834b0458ef"],["tags/pyenv/index.html","608e8544fd158098144c91dd862611c3"],["tags/python/index.html","788bea1d9abcebb80e78566918f6cfdf"],["tags/rocketmq/index.html","e6a8f1941adb28a12153115a5590e88c"],["tags/springboot/index.html","e534fc3d8cebb5a92be1bc32fbb56e0c"],["tags/个性化推荐/index.html","c011055193705a2d72939aa0fa5f18b3"],["tags/二叉树/index.html","b1e4d49c4fc1f566e69497d5791cc0f9"],["tags/云计算/index.html","348cac53e936631775db93b108104a71"],["tags/以图搜图/index.html","efd08a07968ba3f49a170bb3c26ab544"],["tags/其他/index.html","18e89f2e2b628f6c50a8b7f273d91b8c"],["tags/其他/page/2/index.html","55d81e50c8d121a4fadc15d409655334"],["tags/其他/page/3/index.html","6e0da4c1a793ae07e27e472daaca039d"],["tags/其他/page/4/index.html","abbdf3e5e4ae84a423ae518a934b9726"],["tags/其他/page/5/index.html","3fe2aec716571167247ba6e02b8a3749"],["tags/其他翻译/index.html","a8891eae64fb6f503c13b0a1216d8eb0"],["tags/其他翻译/page/2/index.html","d0ef544900aeef71741e16afcc34bddb"],["tags/区块链/index.html","1ff731a5a91fca2e9d52bfb4bb945368"],["tags/卷积神经网络/index.html","511ad50145698046bce5b7f1f3ae536c"],["tags/少儿编程/index.html","e6ab6a3a35e99cbc1df6e74d6c1cea30"],["tags/并查集/index.html","578a75e16014695cebea30f3c8b6342c"],["tags/微服务/index.html","c8319f544173cade77234a1c148ff00b"],["tags/心得/index.html","8d8e0cdc29657e24c1f2776a7a8e7b31"],["tags/总结/index.html","4d54fd7b698709459e2851f857bf60a8"],["tags/掘金翻译计划/index.html","7d27dc030f4c368b112d5d63a9eaf5b4"],["tags/掘金翻译计划/page/2/index.html","86f0be8527dad54781a64a7c7542c24a"],["tags/掘金翻译计划/page/3/index.html","cd831e52bc217d9bf4f3949219520815"],["tags/操作系统/index.html","60868a912966a762c6a48d20a2f12e3d"],["tags/数据分析/index.html","66414e080c468037ed3e28e2bec7ed5f"],["tags/数据可视化/index.html","f13ed506b5975996c8bd1f8b74076020"],["tags/数据库/index.html","f5a288cd6899b78e220fdc7387e8dfd3"],["tags/服务器/index.html","d1fb6a5c053f78c60b69faf9c084ca5f"],["tags/机器学习/index.html","22486c458242dbc9ed6fc568a7fb7100"],["tags/消息队列/index.html","fd90e8cb658d59b400a69072138693c7"],["tags/算法/index.html","8fc0b4402d94164493c913927708f432"],["tags/计算机组成原理/index.html","935d47b4130fdc09d4d0347f01924369"],["tags/计算机网络/index.html","26ef01e0eb4df2fd9849613d412ae377"],["tags/读书笔记/index.html","e55fcdc08018f9c3ad6d0a39b80a9e45"],["tags/进制转换/index.html","10d18af2b17d2cecc51ed4f5f397c93a"],["tags/问题排查/index.html","cde44a44c44020ab33a4ba7698870eb5"],["tags/面经/index.html","6b0f3ddcb32f88c203ef134e2367dd90"]];
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







