import { init, h } from 'snabbdom'

import styleModule from 'snabbdom/modules/style'
import classModule from 'snabbdom/modules/class'
import eventListenersModule from 'snabbdom/modules/eventlisteners'
import propsModule from 'snabbdom/modules/props'

let patch = init([
  classModule,
  eventListenersModule,
  styleModule,
  propsModule
])

let vnode;

let nextKey = 11;
let margin = 10;
let sortBy = 'rank';
let totalHeight = 0;
let data = [
  { rank: 1, title: '穆赫兰道', desc: '深夜的穆赫兰道发生一桩车祸，女子丽塔(劳拉·赫利 Laura Harring 饰)在车祸中失了忆。她跌跌撞撞来到一个公寓里藏身。', elmHeight: 0 },
  { rank: 2, title: '花样年华', desc: '1960年代的香港，报馆编辑周慕云(梁朝伟 饰)与太太搬进一间住户多是上海人的公寓，和某家日资公司的贸易代表陈先生与太太苏丽珍(张曼玉饰)成了邻居。因为发现各自在外工作的配偶背着他们有了婚外情，周慕云和苏丽珍开始见面商讨未来可能发生的事情以及相应对策。', elmHeight: 0 },
  { rank: 3, title: '血色将至', desc: '1898年，银矿工丹尼尔•普莱恩惟尤(丹尼尔•戴•刘易斯 Daniel Day Lewis饰)因井下作业事故摔断了腿，但他因祸得福了解到秘密的石油信息。他利用哑童HW(狄龙•弗雷泽尔 Dillon Freasier饰)欺骗乡民赢得了石油地盘，从此飞黄腾达。但是，成为石油大亨的他并不快乐，HW对他的怨恨与日俱增，他唯一认亲的兄弟居然也是冒牌货。传教士伊莱•桑迪不过是个借宗教蛊惑人心的小人。在一次采矿事故中，丹尼尔的工人不幸丧生。正当他希望伊莱(保罗•达诺Paul Dano 饰)施以援手时，对方羞辱了他，两人从此开始明争暗斗……', elmHeight: 0 },
  { rank: 4, title: '千与千寻', desc: '千寻和爸爸妈妈一同驱车前往新家，在郊外的小路上不慎进入了神秘的隧道——他们去到了另外一个诡异世界—一个中世纪的小镇。远处飘来食物的香味，爸爸妈妈大快朵颐，孰料之后变成了猪!这时小镇上渐渐来了许多样子古怪、半透明的人。', elmHeight: 0 },
  { rank: 5, title: '少年时代', desc: '本片讲述一个男孩从6岁到18岁的成长历程，导演理查德·林克莱特花了12年时间来完成这部作品。它仔细描画了孩子的成长过程，及其父母亲各个方面的变化，可以让观众细致入微地体会岁月流逝的痕迹。为了不打扰主演艾拉·萨尔蒙的正常生活，拍摄均在他暑假期间的简短时间内完成。', elmHeight: 0 },
  { rank: 6, title: '暖暖内含光', desc: '内向沉稳的约尔•巴瑞斯(金•凯瑞 饰)在一次聚会中认识了率真随性的克莱门汀•克罗斯基(凯特•温丝莱特饰)，二人成为情侣。和普通的情侣一样，他们的日子也在甜蜜和争吵中度过。', elmHeight: 0 },
  { rank: 7, title: '生命之树', desc: '故事发生在20世纪50年代的美国中西部，通过讲述一个典型的美国家庭故事表达了创作者对生命的看法。主人公是一名叫杰克(亨特·迈奎肯 HunterMcCracken 饰)的11岁男孩，他是家里三兄弟中的一个，父亲(布拉德·皮特 Brad Pitt 饰)严厉而粗暴，母亲(杰西卡·查斯坦JessicaChastain 饰)温柔却又无所作为，哥哥的死令他的家庭发生了改变。成年后的杰克(西恩·潘 Sean Penn饰)生活得不顺利，当他思考自己的人生轨迹时重新面对了自己的记忆，开始站在不同的角度看待他的父母、家庭、童年，最后终于原谅了父亲，并且对生命和生活还有信仰有了更深的理解。', elmHeight: 0 },
  { rank: 8, title: '一一', desc: '　NJ(吴念真)是个很有原则的生意人，同妻子敏敏(金燕玲)、女儿婷婷(李凯莉)、儿子洋洋(张杨洋)以及外婆住在台北某所普通公寓里。小舅子的一场麻烦婚礼过后，因为外婆突然中风昏迷，他迎来更加混乱的日子。', elmHeight: 0 },
  { rank: 9, title: '一次别离', desc: '纳德(佩曼•莫阿迪 Peyman Moadi 饰)与西敏(蕾拉•哈塔米 Leila Hatami 饰)是一对夫妻，他们的女儿叫特梅(萨日娜•法哈蒂Sarina Farhadi饰)。西敏希望一家三口移居国外，但是纳德坚决反对，原因是纳德的父亲患有老年痴呆症需要照顾。两人为此对薄公堂，准备离婚，但是法院驳回了她的请求。西敏赌气回了娘家。西敏走后，纳德分身乏术，聘请了一位护工瑞茨(萨瑞•巴亚特Sareh Bayat饰)照顾父亲。但是，父亲如厕问题始终困扰瑞茨，依《古兰经》教义，她感到禁忌重重。瑞茨的女儿陪伴在她左右，也令她分神。几个回合下来，纳德某次回家发现，父亲被绑在床上，出离愤怒的他推倒了瑞茨。没想到怀孕的瑞茨竟然流产，瑞茨丈夫怒不可遏将纳德告上了法庭，他们各执一词，然而真相却出人意料……', elmHeight: 0 },
  { rank: 10, title: '老无所依', desc: '美国德克萨斯州乡村，老牛仔Moss(Josh Brolin饰)在猎杀羚羊时发现几具尸体，几包海洛因和200万现金。Moss决定将毒品和现金占为己有，想以此改变自己的生活，谁知却遭到冷血杀手Chigurh(JavierBardem 饰)的跟踪和追杀，陷入了逃亡的险境。', elmHeight: 0 },
];

function view (data) {
  return h('div#app', [
    h('h1', 'BBC评选21世纪最伟大的电影top10'),
    h('div', [
      h('a.btn.add', { on: { click: add } }, '新增'),
      '排序： ',
      h('span.btn-group', [
        h('a.btn.rank', { class: { active: sortBy === 'rank' }, on: { click: [changeSort, 'rank'] } }, '序号'),
        h('a.btn.title', { class: { active: sortBy === 'title' }, on: { click: [changeSort, 'title'] } }, '标题'),
        h('a.btn.desc', { class: { active: sortBy === 'desc' }, on: { click: [changeSort, 'desc'] } }, '简介'),
      ]),
    ]),
    h('div.list', { style: { height: totalHeight + 'px' } }, data.map(movieView)),
  ]);
}

function movieView (movie) {
  return h('div.row', {
    key: movie.rank,
    style: {
      opacity: '0',
      transform: 'translate(-200px)',
      delayed: { transform: `translateY(${movie.offset}px)`, opacity: '1' },
      remove: { opacity: '0', transform: `translateY(${movie.offset}px) translateX(200px)` }
    },
    hook: { insert: (vnode) => { movie.elmHeight = vnode.elm.offsetHeight; } },
  }, [
    h('div', { style: { fontWeight: 'bold' } }, movie.rank),
    h('div', movie.title),
    h('div', movie.desc),
    h('div.btn.rm-btn', { on: { click: [remove, movie] } }, 'x'),
  ]);
}

function layout () {
  data = data.reduce((acc, m) => {
    let last = acc[acc.length - 1];
    m.offset = last ? last.offset + last.elmHeight + margin : margin;
    return acc.concat(m);
  }, []);
  totalHeight = data[data.length - 1].offset + data[data.length - 1].elmHeight;
  vnode = patch(vnode, view(data));
}

function add () {
  let n = data[Math.floor(Math.random() * 10)];
  data = [{ rank: nextKey++, title: n.title, desc: n.desc, elmHeight: 0 }].concat(data);
  vnode = patch(vnode, view(data));
  layout();
}

function remove (movie) {
  data = data.filter((m) => { return m !== movie; });
  layout();
}

function changeSort (prop) {
  sortBy = prop;
  data.sort((a, b) => {
    if (a[prop] > b[prop]) {
      return 1;
    }
    if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  });
  layout();
}

let container = document.getElementById('app');
vnode = patch(container, view(data));
layout();