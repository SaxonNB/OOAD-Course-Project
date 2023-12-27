<template>
    <div>
        <vue-editor v-model="content" />
        <input type="file" @change="handleFileUpload" />
        <button @click="uploadImage">上传图片</button>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            content: '',
            selectedFile: null,
        };
    },
    methods: {
        handleFileUpload(event) {
            this.selectedFile = event.target.files[0];
        },
        async uploadImage() {
            if (!this.selectedFile) {
                alert('请先选择图片');
                return;
            }

            try {
                // 创建一个 FormData 对象
                const formData = new FormData();
                formData.append('image', this.selectedFile);

                // 发送 POST 请求到后端
                const response = await axios.post('/api/upload', formData);

                // 获取上传成功后的图片 URL
                const imageUrl = response.data.imageUrl;

                // 将图片插入到编辑器中
                this.content += `<img src="${imageUrl}" alt="Uploaded Image" />`;

                // 清空选择的文件
                this.selectedFile = null;
            } catch (error) {
                console.error('图片上传失败:', error);
            }
        },
    },
};
</script>
  