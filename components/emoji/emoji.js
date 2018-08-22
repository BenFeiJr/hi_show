Component({
    data: {
        _emojiMap: {
            100: '[微笑]', 101: '[撇嘴]', 102: '[色]', 103: '[发呆]', 104: '[得意]',
            105: '[流泪]', 106: '[害羞]', 107: '[闭嘴]', 108: '[睡]', 109: '[大哭]',
            110: '[尴尬]', 111: '[发怒]', 112: '[调皮]', 113: '[呲牙]', 114: '[惊讶]',

            115: '[难过]', 116: '[酷]', 117: '[冷汗]', 118: '[抓狂]', 119: '[吐]',
            120: '[偷笑]', 121: '[愉快]', 122: '[白眼]', 123: '[傲慢]', 124: '[饥饿]',
            125: '[困]', 126: '[惊恐]', 127: '[流汗]', 128: '[憨笑]', 129: '[悠闲]',

            130: '[奋斗]', 131: '[咒骂]', 132: '[疑问]', 133: '[嘘]', 134: '[晕]',
            135: '[疯了]', 136: '[衰]', 137: '[骷髅]', 138: '[敲打]', 139: '[再见]',
            140: '[擦汗]', 141: '[抠鼻]', 142: '[鼓掌]', 143: '[糗大了]', 144: '[坏笑]',

            145: '[左哼哼]', 146: '[右哼哼]', 147: '[哈欠]', 148: '[鄙视]', 149: '[委屈]',
            150: '[快哭了]', 151: '[阴险]', 152: '[亲亲]', 153: '[吓]', 154: '[可怜]',
            155: '[菜刀]', 156: '[西瓜]', 157: '[啤酒]', 158: '[篮球]', 159: '[乒乓]',

            160: '[咖啡]', 161: '[饭]', 162: '[猪头]', 163: '[玫瑰]', 164: '[凋谢]',
            165: '[嘴唇]', 166: '[爱心]', 167: '[心碎]', 168: '[蛋糕]', 169: '[闪电]',
            170: '[炸弹]', 171: '[刀]', 172: '[足球]', 173: '[瓢虫]', 174: '[便便]',

            175: '[月亮]', 176: '[太阳]', 177: '[礼物]', 178: '[拥抱]', 179: '[强]',
            180: '[弱]', 181: '[握手]', 182: '[胜利]', 183: '[抱拳]', 184: '[勾引]',
            185: '[拳头]', 186: '[差劲]', 187: '[爱你]', 188: '[NO]', 189: '[OK]',

            190: '[爱情]', 191: '[飞吻]', 192: '[跳跳]', 193: '[发抖]', 194: '[怄火]',
            195: '[转圈]', 196: '[磕头]', 197: '[回头]', 198: '[跳绳]', 199: '[投降]'
        },
        _emojiList: []
    },
    properties: {
        show: {
            type: Boolean,
            value: false,
            observer: function (newVal, oldVal) {
                console.log(2)
                this.setData({
                    show: newVal
                });
            }
        }
    },
    attached: function () {
        const emojiList = this._emojiMapToList();
        this.setData({
            _emojiList: emojiList
        });
    },
    methods: {
        _emojiMapToList: function () {
            return Object.keys(this.data._emojiMap).map((item) => {
                return {
                    id: item,
                    url: `./images/${item}.gif`,
                    txt: this.data._emojiMap[item],
                    json: JSON.stringify({
                        id: item,
                        url: `./images/${item}.gif`,
                        txt: this.data._emojiMap[item]
                    })
                };
            });
        },
        emojiParser: function () {
            const parse = (str) => {
                const emojiList = this._emojiMapToList();

                return str.replace(/\[[^\[\]]*]/g, (match) => {
                    let html = '';

                    for (const item of emojiList) {
                        if (match === item.txt) {
                            // TODO: 路径不好写
                            html += `<image src="${item.url}" />`;
                        }
                    }

                    return html === '' ? match : html;
                });
            };

            return {
                parse: parse
            };
        },
        _handleEmojiTap: function (e) {
            this.triggerEvent('emojiTap', {
                emoji: JSON.parse(e.target.dataset.emoji || '{}')
            });

            console.log(this.emojiParser().parse('[微笑]'));
            console.log(this.emojiParser().parse('[微笑][微笑]'));
            console.log(this.emojiParser().parse('[微笑][流泪][微笑]'));
            console.log(this.emojiParser().parse('[微笑]我是你，[微笑][微笑]，你是我[微笑][流泪]'));
            console.log(this.emojiParser().parse('我是你，[微笑][微笑]，你是我[微笑][流泪]'));
        }
    }
});
