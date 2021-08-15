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

var precacheConfig = [["about/index.html","97abae63281677497fd993a7c2ae050b"],["archives/2021/06/index.html","6ef54dc18e9b3177d3a219576f66c72f"],["archives/2021/06/page/10/index.html","5342fe96c050aa2135b533ca1f8fbfd1"],["archives/2021/06/page/11/index.html","fefb39cc8ffb604cb9b006362329b0d7"],["archives/2021/06/page/12/index.html","0e402ac5d726473b2ab4b04b2001d0a7"],["archives/2021/06/page/13/index.html","2c5f37672fa605dd32c8b4d0226f691a"],["archives/2021/06/page/14/index.html","1e7a0ba15f80703ff359cc6fb8543aaf"],["archives/2021/06/page/15/index.html","57d7bde01193207e2adf2fb12e46d407"],["archives/2021/06/page/16/index.html","9fb2ab32d131461e4b5b8f2e217f5a4f"],["archives/2021/06/page/17/index.html","4ee7a7b85af3747682affca279a2a8a3"],["archives/2021/06/page/2/index.html","a018235f99edb6c2857f67bb6ea2de2e"],["archives/2021/06/page/3/index.html","b7a6358081926df385e718c5c3a60001"],["archives/2021/06/page/4/index.html","2d1b54b4576b34ada7c8db2fa7d142e7"],["archives/2021/06/page/5/index.html","d36f05ee96723cb923226352e453b353"],["archives/2021/06/page/6/index.html","69e96c3ff16b7f6d3272c2a7d4bd1658"],["archives/2021/06/page/7/index.html","c61e087ce4ae05ab2b4c8138853535f2"],["archives/2021/06/page/8/index.html","91b57fd72f1353e88319bd0417b508b9"],["archives/2021/06/page/9/index.html","35b9df816814cc3f570b884b7b2fb67e"],["archives/2021/07/index.html","27d3d8bdda87577412485b1eeab866da"],["archives/2021/08/index.html","a51af346e8dc787cf0c8b170d4647566"],["archives/2021/index.html","7975df9c55e17c6af6c8cb929881d85b"],["archives/2021/page/10/index.html","d849879351565a227056961b7c814d96"],["archives/2021/page/11/index.html","2e138a4d741ee86c6d78d915c925a5ea"],["archives/2021/page/12/index.html","c40d64ba7e6979c5ee3ffe7f317ec5b1"],["archives/2021/page/13/index.html","e9e54901cd06dced0645e4249b879f56"],["archives/2021/page/14/index.html","bbd36c8c8cbb038abc970ad92a7da826"],["archives/2021/page/15/index.html","60a4a5ea7ff8a014934ee497339fc9cc"],["archives/2021/page/16/index.html","fb009ccb5c534e42ace23fe4379cedeb"],["archives/2021/page/17/index.html","4a09c62806eb70041956c5f1fe95e799"],["archives/2021/page/2/index.html","de1397b3a23af5caeb56632aacf669e7"],["archives/2021/page/3/index.html","79d301254ea6fc660c7be3aef75cb54b"],["archives/2021/page/4/index.html","54132a998d48a77644113bbad3de5c64"],["archives/2021/page/5/index.html","36f253db5e4e8fb9182830887403943f"],["archives/2021/page/6/index.html","52622264b7e0df821b59cf109771764f"],["archives/2021/page/7/index.html","51a2de1d23e8032196b244b7a30323ed"],["archives/2021/page/8/index.html","fd89cae4803f953de2eabec1923b3a4a"],["archives/2021/page/9/index.html","0a629aa43004132443b8199a80c73333"],["archives/index.html","ad4999213b60a0f08347f536f1c1bf8d"],["archives/page/10/index.html","acc7e8fed635bebab57dfe2f6118843c"],["archives/page/11/index.html","5be9d9fb7b87bcecdff54d7f40fd768d"],["archives/page/12/index.html","d6432ace1bc7d0cd4af80991ee883aa1"],["archives/page/13/index.html","0016988864525481db2884cf20970289"],["archives/page/14/index.html","c3d80b8b7add192afb370d02c53c3a4d"],["archives/page/15/index.html","58ead0f4858a0818639c967515d23359"],["archives/page/16/index.html","82206a2c1c4e7fb4a0f6ae10c2ec33db"],["archives/page/17/index.html","f832e4ebe2e65c8fbb13746038a97c72"],["archives/page/2/index.html","bd781ff9caeaad39707c6ebf10785da7"],["archives/page/3/index.html","656ed4973928dc1b707ad16bed58c615"],["archives/page/4/index.html","1b5711a0c0d2ea794a9f75440e5a2de9"],["archives/page/5/index.html","9a773255fcf08e2067b817143a045c4d"],["archives/page/6/index.html","01df97215432073994c7dcd918f75535"],["archives/page/7/index.html","9adad331d67e55897d7046e44da1d119"],["archives/page/8/index.html","dfd33d612588e204f8aa73a1e2729472"],["archives/page/9/index.html","749cfecd6f9627a1141c36f086ac76f5"],["books/index.html","1915035e76500f3e9e1ed515c5d1cb22"],["categories/index.html","029a53115fffc6d207a1384e239a33a1"],["categories/外文翻译/index.html","c7becd1f07de93663123356d7b72a3cc"],["categories/外文翻译/page/2/index.html","c2d3e733751083951de58921329cf872"],["categories/外文翻译/page/3/index.html","8efc0d4f5b84eacdef8a9d25cfabdc93"],["categories/外文翻译/page/4/index.html","5be0a241e11bc56c5de5097d35a528b8"],["categories/外文翻译/page/5/index.html","b29a4ff026b0ba623986a469da98791e"],["categories/学习笔记/index.html","5a17c0c9171b2a8d85437d9f9ef049d0"],["categories/学习笔记/page/2/index.html","96905195832708c5cb69eac18816d750"],["categories/实战教学/index.html","c3a8e5bb09a9f2a45d8cd9bde0252730"],["categories/实战教学/page/2/index.html","e114c98b5dde60aa76b2e45c27f14a81"],["categories/实战教学/page/3/index.html","0069624aeaa36e9cdde5664ab755ffe5"],["categories/实战教学/page/4/index.html","c2c6c70b90800586460e5afd392fb699"],["categories/技术科普/index.html","f76c2dded363c507a1b24b815dfcbd84"],["categories/技术科普/page/2/index.html","5c7c0ad950cdc83dcc0ae83a32985f57"],["categories/技术科普/page/3/index.html","19de634a47a3a477a353b56d0b9e44fe"],["categories/来都来了/index.html","455ca0d415491a0ef871ef961537188e"],["categories/来都来了/page/2/index.html","c1029a5680a4461ad65615706eacac5c"],["categories/来都来了/page/3/index.html","3b9b4287d6dee28c78019541a6a688f4"],["categories/来都来了/page/4/index.html","25fc3044a9b39bb2f5f1f70c13e35cfd"],["categories/每周一问/index.html","8ad36b8efe00871016b7495fe9270b6c"],["categories/读书笔记/index.html","ecf1288d8494c3ccf117ec6296d3c17c"],["categories/面试学习/index.html","4d9e7e6f9b1d73f7c1c7531e40d57d6b"],["css/index.css","c7c8ece4439a82dcac39d35b9a154252"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["img/algolia.svg","88450dd56ea1a00ba772424b30b7d34d"],["img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["img/icp.png","6e26aed5ced63bc60524cc736611d39e"],["img/loading.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["index.html","27a0ba2fd892554ea1edab06644f66c3"],["js/main.js","1c7d6eb8f8b1a9e2a06c37906146eb84"],["js/search/algolia.js","e6a9c3f8fa43a7d3421169ea96eef44e"],["js/search/local-search.js","86e7fcbc5aa273e6c3d2c94b0054809b"],["js/tw_cn.js","bd869d5fd54e2fe1f1eeee7c46fa46bc"],["js/utils.js","5720a78dca20fab16f21914ae3ac0757"],["link/index.html","721e0ae43ee5c0378b2e91709a2e15f9"],["movies/index.html","d34144a4e34577c4d64b038871f1aee2"],["p/0.html","a0cc3523adfebda83a9be60040a342c2"],["p/102.html","dc5a42fae11d460399088526e2695ba4"],["p/10d8.html","d1990fec9de62f4450f0239f50e6e2f2"],["p/1109.html","01603962c0c22dd97b1fc644048ae39a"],["p/1229.html","4b761e6087f1e29ec5033f4d7d4399e6"],["p/1282.html","c1b12fc2bbb7cf370041e578b61013a1"],["p/16e3.html","ea797ee4256f22061310274510797de7"],["p/18ed.html","52b700826cc295537cffcfe901ab2fe8"],["p/1aa6.html","8340887606589efc3ca1370d64d2933a"],["p/1acc.html","5da89ffd9b3d5cc05b6e965dad51e41a"],["p/1b55.html","d542c7fff7e6d32b06f90b816ca0ec23"],["p/1daa.html","182b38c70d7c0c60de17c3b35a9402a1"],["p/1f44.html","cf4d78cf26bd4c59ac32352e23a273f9"],["p/23f6.html","115db4fea9a51377087d067fbd777bdd"],["p/257a.html","eefc3db039ef054937490bf13c459067"],["p/27e7.html","ed4fcba4fbed35b2eca6f67b8635d244"],["p/28be.html","052ec22484cf39774a364a3a055d270b"],["p/293a.html","da23a9b18793d3eeb9c84a2b9416f9de"],["p/2c7f.html","174ba7b1dfc708a5f4cd980a08b6304a"],["p/2d8c.html","748dbf29bc49dd4fc05f4ae04d4df097"],["p/2f4d.html","ef15456d108f105bcb99e66b0ff294a3"],["p/31dd.html","fccc222dadab99717dfcb4e975e9980d"],["p/332b.html","ddb76c82a92b0f75c1a6fcc1b61d06ca"],["p/33d6.html","e00c666086738274366ab140ddebce16"],["p/3422.html","fbfe14a1fd4e7437e1f69ebccefc29c4"],["p/349f.html","61856b3be240c275335f1ff17c4c15cd"],["p/354f.html","c1dfaa036c626af93ce05b65fdb0a4f1"],["p/35e3.html","3e8b0f2cd5fc8da3bd1326a4ae2acd20"],["p/373c.html","5154d40807e7c9de994f11d2d1460353"],["p/3bd2.html","0ee8b9a13349d02c9af7adeb5b3cec1b"],["p/3d71.html","fd6c6a21822178a44c06113886728700"],["p/3e02.html","d8e8a47791af98f13d2d3b3612e09e42"],["p/3f5e.html","d4fa43fc77bc77f6dc23281963c0d591"],["p/431c.html","ef739b11b85c7f2af233d496dedd1567"],["p/43d8.html","5887b6847f44b1cfc180ad894da3ec95"],["p/440f.html","0a8e002eb3030f91d27072d49fc32e68"],["p/4670.html","6a8bfd6e6178a3c7bf003c84903bf5cf"],["p/4728.html","9fa5df9aef3e224ed329af85cea70675"],["p/4a31.html","b6ef714755fb4b190de85a4e25e44720"],["p/4a8e.html","ed483a58665fc4a07b95aca8aabe061f"],["p/4ab8.html","88c1cb8a0dff9ae6143557ffc33340a1"],["p/4c3a.html","d2945a47ab5a5433e04c3d4c0b4adf11"],["p/4c8f.html","a2f42aff345fbcd03705f253f8e50adc"],["p/4d94.html","ece628a428679023a9703d8eb6d46944"],["p/4e00.html","c9459b8398bdf2f240d02c5928e3ea97"],["p/4efb.html","d09b4317190e6aebe239a2badb75c362"],["p/4fa2.html","5f14ea5413c59dc8a9d9d6ff4e727432"],["p/5219.html","81d0ee39d40790439f3a5863094b10fe"],["p/56a6.html","c6732a5ec0ed3ab1e0ed635f8c6bc727"],["p/5c5e.html","b416d048e17145a81b1512eda86c4085"],["p/5daa.html","dae0346807755acc425b4b91211a92d5"],["p/5de1.html","41125540be5a4aeb85285bedb60f0816"],["p/5ed4.html","f211382cbaaebecff82e929bd82e4bd6"],["p/6136.html","dbae6f78e711452303b627dd412f56ad"],["p/62cf.html","e13e8a31e15ee3f30527c1e1784b9f3b"],["p/6511.html","a7d3bbf1ff27fafefc6a3c2648421754"],["p/66c6.html","6d3cef9666420fdbfce5ec37d5054e1d"],["p/6804.html","5970eb1fd335ac903711464bc38585b5"],["p/6bb.html","f99dc12eed235c250d7f3a57098653e8"],["p/6ff8.html","795d4123fa078816d3cdd08ab9c13dda"],["p/74e.html","e19d44f68dae70e1217b998f19f13edc"],["p/76d2.html","0c42a3e27990e48db48a0dc4268464d3"],["p/7819.html","81b93dcac737e73199aa4cddc72f2b69"],["p/7839.html","061d219041b6d29c1347cb57f33cbeaf"],["p/797f.html","7390ed3a58e55a9e07e2030de0235279"],["p/7980.html","906b174e3ddd4f897cde4e7146bcf8f1"],["p/7b87.html","5e993d933542642e788fd3fdc43862f6"],["p/7c99.html","4ea469f7e8157f8671c78fdb4898203e"],["p/7d13.html","f6e350d5fcec3e308ff28091afb645e3"],["p/80ee.html","5f87e34e6e97ab7364831734244a06db"],["p/8245.html","4c81271a01d65a61df4d2d770dc90d6a"],["p/82ca.html","5d3005992526a39505583bbb7c16db24"],["p/8486.html","6af25624ee2cb1cec9f7b33372e0dff9"],["p/84ea.html","ff5faefc12a32a5ba884872392a08156"],["p/87a1.html","9e15554ad572a88569bc4591688204fd"],["p/88b6.html","1b7806fcd77e80f4bcc9a24a5c351b54"],["p/8915.html","02b6d4dd23505104adc92f44a29c137f"],["p/89a3.html","ef51110ce5686f2af96ec66d229c8f4b"],["p/8e8e.html","6c7bcd40a14d1b496d28b20317bd2bf2"],["p/91d7.html","7160604fee6a4a2984a1e28523cc0e55"],["p/9234.html","56a3abf9fecde308cb1b06498a3f9787"],["p/94b4.html","0d36a212e1b2d60c618ff495467ad115"],["p/96c9.html","6e39017d72a27a9411fab1bb4ab4e0fb"],["p/96d2.html","fad5ae9b89e2a31f6283f415c080d237"],["p/9793.html","92af047ae74df9213b08b0cd3e0e4148"],["p/98b8.html","77a592dd0df2ea38faf159a63ea429de"],["p/9bcc.html","b8aba8ccfbc29db57dd9d92aa92d4296"],["p/9bdc.html","fb362aae93289af397dfb624372121f4"],["p/9f29.html","0685c02a28a78efe44feb9b2fddad3df"],["p/9f8a.html","94971bbdf16066f249cafb477bec4bc6"],["p/9fa7.html","1d2c987fbf40027d21045f93358b0a4f"],["p/9fb0.html","bb678ba5b70ebef428193f24b76ac419"],["p/a1a7.html","ccc870a8f07cebebd0e633d736dea8d6"],["p/a28d.html","5f488cb7eb310b800805b9093149244a"],["p/a56b.html","a3a271d0cf3c5071f0182d9a945d927f"],["p/a695.html","8846b41716b66cbdb225094e08b11a0c"],["p/a824.html","3b23a70a3d4fafaeea2d893c4c2b510c"],["p/a92c.html","37cf39bd0f68d8d6a865f1c4e4e9dbf1"],["p/a973.html","edafadadcdf1796683a9ae354a1bda5d"],["p/aa30.html","931c3cd4fa50842ec1071e35651a55b3"],["p/aaa8.html","984e9fbb57cfd609af5cb99bd40fd588"],["p/ab06.html","deb086e06772ecb0a89d919d68e354eb"],["p/aca.html","ce7d578ad1649f2dbd6946969239f864"],["p/adf2.html","1010ce77589405d5197dff79c621585c"],["p/af09.html","f8caf7a37179cba72d622f3ad19edf21"],["p/af33.html","016d0ba32974ebfc7e3e9fd4cf07bb9a"],["p/afc.html","e2c7f471f4deb46a1583697e021fe21d"],["p/afc8.html","e04c51bd13a08116e6625858387ff907"],["p/b013.html","a19440f197f2544ec170407a78c00c0d"],["p/b2bf.html","b7cf959becbffd91b59fbe1056e55c03"],["p/b392.html","a483ca70b3e30d0643a11300f7399459"],["p/b3ec.html","69d75606139936b5130cb7c4096a0c80"],["p/b66d.html","bb1ce3b23e9cbe5ae8d52130592c6e9a"],["p/ba89.html","f0b81af9bed45b5d659c10393c5fcc3f"],["p/bc8a.html","c6d74e5d36ae882d8f0803b1088d0587"],["p/bd3d.html","6c1de8bdafaadfa80e86767b2ed06a40"],["p/c0e2.html","36ad4262a114dbdad3173628951383d8"],["p/c226.html","fc119e002b6faafe17d5a0e281e8b9ad"],["p/c346.html","538bad92bf75a400252873e83ccb8037"],["p/c8ed.html","82f6c33351e8db73ac18d69a2ead6078"],["p/ca50.html","d301ce737ea5cd8f08c957917ef5779c"],["p/cb44.html","4a29a67da3fd2d91a72de9704effef52"],["p/cbb1.html","a69b9cdef6b71f9410f8ca1259045ab0"],["p/cd72.html","2ce3df5159ed9e96ffab8646065ee72c"],["p/cf73.html","ffac37e72d31de0ceb507d5742e04038"],["p/d04f.html","3d81542f4edaa13ab96cdb736e5d795a"],["p/d340.html","61ecf54dfba4621a5aa4ad087ba8dd75"],["p/d412.html","858e6ce0bbc63b0682d81d82c7bcf090"],["p/d67.html","040601763f399fcc4ed73d22c6dd3fd4"],["p/d6b4.html","b8d274229c08d1bf01aa31ebd75628e6"],["p/d74b.html","ea62c3c3bcb984495a1d9a51711deb67"],["p/d81e.html","e44e9c03c36ce025a545b69801a8907c"],["p/d8d0.html","0f2094b496e4e0eb0e5fb5281027866e"],["p/dbb1.html","5d848e4e42191d7960d950ad1f283516"],["p/dbd2.html","886c31c9b894dd01546ace1ebc908300"],["p/dfc1.html","e3085a05111c1a44af11dbe1c711f99b"],["p/dff4.html","4480f7d81b2f40e726046e1c88ab03c6"],["p/e01e.html","e80be3106a2ef87b198b00e51cb0731d"],["p/e0a1.html","3fc7000b74edc57665cf7e9533887e8f"],["p/e0c9.html","74a0ece90337020333396924e9736a5b"],["p/e25d.html","1f96e289b26561d668f9d7767caa6dac"],["p/e32c.html","71cb97c70f3ca8c549ebc0ee20180d56"],["p/e376.html","ed4859a117d8f6fd7b03e40591c41cd9"],["p/e593.html","d8caa7ba4ab342bfe0b2242fb4f37a53"],["p/e64d.html","79857f937a17dc666137fd82a0e92fc1"],["p/e834.html","99c86ae04ae5254d7d5e54ffb485e497"],["p/e87f.html","8493aeb8d8ee40ac5cc055ded043f052"],["p/e8f2.html","426c4c1198d2d83897357d66be0049d2"],["p/ec16.html","e635a8d5414b86cd911bb18b070ef10c"],["p/ec8b.html","89cc8fb1e110939c2e921524aad8dd3a"],["p/ed06.html","cd03f0efb91847501a1c42e25d5ea953"],["p/ee77.html","d5de8452b6b3e120f0f6710c54dd8747"],["p/efd4.html","c493cc20fdeba343e281ef124ef126c1"],["p/f04a.html","bd5ba3d3bef0742513f9064ac52ba144"],["p/f226.html","0c4197ae060acca13fe02f831c1fd153"],["p/f25e.html","6b430fcfdfa64b2aeaec0c034ed95c52"],["p/f2b.html","0e9d5b5561f97be72ca073b18ad21552"],["p/f370.html","dbe674e4e417e5e256650c130ca3c51a"],["p/f449.html","17ff9342a80a5896e88445518d8501ea"],["p/f473.html","2108f9941d67fb16825a7fbcd5de6f54"],["p/f628.html","2c2bc191b3b00558d3a86599dc7adfa5"],["p/f791.html","88b300507cb7da42d01a6254a606cc98"],["p/f82d.html","891b9470bf78a977afc0dedd56678096"],["p/f833.html","d87900e1fc6407472dacb55a4de7b823"],["p/f93c.html","d57a95ae096bb69bdc1611081bd8c01b"],["p/ff05.html","43c756e4466cde003cf59dfc5ce19531"],["p/ffc5.html","0c45d8300d8b31e4a8e931e66f36dc89"],["p/ffc6.html","cf1270f49aff01d6ac9bd9253ad8ae04"],["page/10/index.html","b13697dfc70bd14109841872fef07540"],["page/11/index.html","3e48d7df3fed6230ebccb2252c3688fb"],["page/12/index.html","f1edd52c90fcfd7fe734ffa68ed0f713"],["page/13/index.html","9ed71fe7d71be1f15554921f4bd7a66f"],["page/14/index.html","032db75f1c863d712fd1fd2b6766db09"],["page/15/index.html","a681df4e2bee96cbdac8b8fc334e2dd0"],["page/16/index.html","beb610ee976d52b8cbc58b6b1d3e5e42"],["page/17/index.html","d208b49492ce19f5edd31cb29105e209"],["page/2/index.html","137a547b7e341502101d554648bac9ea"],["page/3/index.html","a644be98ef08398c83e482b7920d046e"],["page/4/index.html","5f3413bc66d9f822c8c110f8ef248cd5"],["page/5/index.html","c8d2875a7de2f7b8972034ec9290c8eb"],["page/6/index.html","ee4cd747aabf47942b2d2da70e83adee"],["page/7/index.html","6d928928e4f7f2bd47c51372c9a02917"],["page/8/index.html","fc172994c6f3a9049365c5cd4a1bfc0b"],["page/9/index.html","f13cce99a54bbd155f3e10aaf0e980f8"],["tags/AI画家/index.html","48a4670bd199f2ce02848b58d4c11628"],["tags/Android/index.html","dcb1db03c8c327c02a3b8302a37db353"],["tags/Effective-TensorFlow/index.html","a352bd186e2b304b30c38dd5653715ff"],["tags/Effective-TensorFlow/page/2/index.html","f9ad3e7e684278dca6ee71a481399cfb"],["tags/Flask/index.html","3ac34533f0da2f395a17713f1fe207db"],["tags/Flutter/index.html","0442205735eb5f222882323065cf9b14"],["tags/Flutter/page/2/index.html","a95b9113d9b880a27a1d4e88983db1dd"],["tags/Gateway/index.html","4db0b4fbada998874fc272f0be7a3c28"],["tags/Git/index.html","4c0f8455ff920650d4b108da85c893f1"],["tags/HashMap/index.html","02e565af62a621eb9b5ff6099d22600f"],["tags/Http/index.html","c8aa6558cab3dfd09d18b3e9230bb10d"],["tags/Java/index.html","d7108768956af0111edf914064863ab7"],["tags/JavaScript/index.html","1d70b259dc0f521ab7269c103c917203"],["tags/MQTT/index.html","6525452edd6435144d6cc1a65ed1fcdf"],["tags/Machine-Learning/index.html","9e07e1ebebf85624505ec43ae5e55458"],["tags/RPC/index.html","8796ce328e547e187fb0a6883ef6374b"],["tags/Redis/index.html","27ade8d370988308f2d91ec4b61d4878"],["tags/TensorFlow/index.html","ca6d470e6a60e31bde397c3a4314e75e"],["tags/TensorFlow/page/2/index.html","2e40698aa5f1837ec399ee0548e32415"],["tags/TensorFlow/page/3/index.html","8ad4f206003b14b920b3fcb8f253fbd5"],["tags/docker/index.html","4c055c77654e7fe8f2c9d5afb62d4da0"],["tags/hadoop/index.html","10db036c0befcf0a1cde40dad4dea2b5"],["tags/hexo/index.html","135701d1f764cec9dc7c40103c98f6a6"],["tags/index.html","64f5c8456825a06eb0f29923fe5ab97c"],["tags/pyenv/index.html","57f0f59d4805977f530709069645683d"],["tags/python/index.html","10cceb2a7c4ddb1b7ca0b95fce7a6354"],["tags/rocketmq/index.html","4d65a4233c3a85fce1d11bfb54d9f999"],["tags/springboot/index.html","6341082b6989e735e46b7a569f3e88fc"],["tags/个性化推荐/index.html","b58a1146284cae5f2e5ff7d86b1263ce"],["tags/二叉树/index.html","07e378d6a74ec823f0c963550c5c241b"],["tags/云计算/index.html","429547bbc1b5d65faee4881c73316a07"],["tags/以图搜图/index.html","0c1b0fe23e2dcd7f62fad966d638db89"],["tags/其他/index.html","e401e720e20746649685e2d1897168af"],["tags/其他/page/2/index.html","2af584f07a5123a4ebc8256b38a05e97"],["tags/其他/page/3/index.html","952fa2fc0c943c0654ed0808c3fb7f12"],["tags/其他/page/4/index.html","54ee6bfeb98326738c8d0a4f38b2acd4"],["tags/其他/page/5/index.html","01be87362c0b9be60e908ab50e6305a5"],["tags/其他翻译/index.html","b0c7a329517cfb0336a7fff9e10e65dd"],["tags/其他翻译/page/2/index.html","ff3bd325059feb303cea46c52b1c36e7"],["tags/区块链/index.html","11077214864d2fb2523ac8616b7839ba"],["tags/卷积神经网络/index.html","720db7b429437a51ad12bee6365b0ce0"],["tags/少儿编程/index.html","115ebd274f91f1f9bb9a3f39b858bb30"],["tags/并查集/index.html","416e0cc2abdfc1bfb58b7a9a521ccc34"],["tags/序列化/index.html","128d97e524a29e1a3d70e7908d4a8f57"],["tags/微服务/index.html","a59f38de159cc28a067e3e71b363b697"],["tags/心得/index.html","5d6965d290890c9b3de9c4db665fe8ba"],["tags/总结/index.html","5bd93786b6eea043d45f5b5cddfd0c7f"],["tags/掘金翻译计划/index.html","a1b1f6fbb0b0ddb197179a03a1922e4e"],["tags/掘金翻译计划/page/2/index.html","81fe296f7bda61c2b82657c73f92c6bb"],["tags/掘金翻译计划/page/3/index.html","a795178a2694b91551ecd86b1024b56a"],["tags/操作系统/index.html","1ff9d00cf5cdbcea9ea706cad41320d7"],["tags/数据分析/index.html","554dca82bfe354765d3630d75ba2a929"],["tags/数据可视化/index.html","9e1f7c28b9bd225f7a05af25e7d36b20"],["tags/数据库/index.html","d5fd0382df569105c970f0ebd6967f94"],["tags/服务器/index.html","5078400da42514e6c2ae3b7d902f3edf"],["tags/机器学习/index.html","8b7addce242b8c210d6eb407aa698da9"],["tags/消息队列/index.html","9d4ba8eb62b746f0b394c3557269e6df"],["tags/算法/index.html","0047aaa6f4e64eb5e4fc1f96ee2c635b"],["tags/计算机组成原理/index.html","d3631a53fb113e645dd5ffc57594e9de"],["tags/计算机网络/index.html","a1f58d7715b6ec07d055e25905c5d1b2"],["tags/读书笔记/index.html","0dc27a9cd8b305c9ee121897abe149a1"],["tags/进制转换/index.html","72811aca65a2dec2cf4e3b0a41684272"],["tags/问题排查/index.html","e32c881576643c81d84a89666eb444a2"],["tags/面经/index.html","d3a16172920071723a043ca391f9c7e9"]];
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







