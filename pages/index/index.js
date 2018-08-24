Page({
    data: {
        isShowEmoji: false
    },
    onLoad: function () {
    },
    handleEmojiTap: function (e) {
        console.log(e);
    },
    handleChatEmojiBtnTap: function (e) {
        this.setData({
            isShowEmoji: !this.data.isShowEmoji
        });
    }
});
