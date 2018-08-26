import newWx from '../../components/newWx/newWx';

Component({
    data: {
        showTimeCheckList: [
            {
                id: 11,
                label: '￥8',
                value: '10秒',
                checked: true
            },
            {
                id: 12,
                label: '￥24',
                value: '30秒',
                checked: false
            },
            {
                id: 13,
                label: '￥48',
                value: '60秒',
                checked: false
            },
            {
                id: 14,
                label: '￥144',
                value: '180秒',
                checked: false
            }
        ],
        showImageList: [
            {
                id: Date.now(),
                localPath: 'https://pic3.40017.cn/line/admin/2015/06/06/14/UiyHfC_568x_02.jpg',
                serverPath: ''
            }
        ],
        maxSelectedShowImageLength: 1,
        showUploadImageBtn: true
    },
    properties: {
    },
    attached: function () {
    },
    methods: {
        setShowTimeCheck: function () {},
        handleShowTimeCheckTap: function (event) {
            const checkedId = event.currentTarget.dataset.id || 0;

            this.data.showTimeCheckList.forEach((item) => {
                item.checked = false;
                
                if (item.id === checkedId) {
                    item.checked = true;
                }
            });

            this.setData({
                showTimeCheckList: this.data.showTimeCheckList
            });
        },
        chooseImage: function () {
            newWx.chooseImage({
                count: 1
            }).then((res) => {
                const imageId = Date.now();

                this.data.showImageList.push({
                    id: imageId,
                    uploadState: '上传中...',
                    disabled: true,
                    file: null,
                    localPath: res.tempFilePaths[0],
                    serverPath: ''
                });

                this.setData({
                    showImageList: this.data.showImageList
                });

                this.updateShowUploadImageBtn();

                // 上传图片
                this.uploadImage();
            });
        },
        updateShowImageList: function (id, key, value) {
            const item = this.data.showImageList.find((item) => {
                return id === item.id;
            });

            if (item == null) { return; }

            item[key] = value;

            this.setData({
                showImageList: this.data.showImageList
            });
        },
        uploadImage: function () {
            this.upload.then(() => {
                this.updateShowImageList(imageId, 'disabled', true);
                this.updateShowImageList(imageId, 'uploadState', '');
            }).error(() => {
                this.updateShowImageList(imageId, 'disabled', false);
                this.updateShowImageList(imageId, 'uploadState', '上传失败，点击重新上传');
            });
        },
        reUploadImage: function (event) {
            const imageId = event.currentTarget.dataset.id || 0;
            const imageItem = this.data.showImageList.find((item) => {
                return item.id === imageId;
            });

            this.uploadImage();
        },
        deleteImage: function (event) {
            const imageId = event.currentTarget.dataset.id || 0;
            const imageItemIndex = this.data.showImageList.findIndex((item) => {
                return item.id === imageId;
            });

            this.data.showImageList.splice(imageItemIndex, 1);

            this.setData({
                showImageList: this.data.showImageList
            });

            this.updateShowUploadImageBtn();
        },
        updateShowUploadImageBtn: function () {
            const max = this.data.maxSelectedShowImageLength;
            const curr = this.data.showImageList.length;
            
            this.setData({
                showUploadImageBtn: curr < max
            });
        }
    }
});
