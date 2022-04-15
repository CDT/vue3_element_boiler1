<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">{{ $config.system_title }}</div>
            <el-form :model="param" :rules="rules" ref="loginForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password"
                        @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : admin/86915998cdt</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import { login } from '../api'

export default {
    setup() {
        const router = useRouter()
        const param = reactive({
            username: "300803",
            password: "123456",
        })

        const rules = {
            username: [
                { required: true, message: "请输入用户名", trigger: "blur" },
            ],
            password: [
                { required: true, message: "请输入密码", trigger: "blur" }
            ]
        }
        const loginForm = ref(null)
        const submitForm = () => {
            loginForm.value.validate((valid) => {
                if (valid) {
                    login(param).then(resp => {
                        ElMessage.success("登录成功")
                        localStorage.setItem("ms_username", param.username)
                        localStorage.setItem("ms_role", "normal") // TODO 暂无权限控制，写死普通权限
                        localStorage.setItem('access_token', resp.data.token)
                        router.push("/")
                    }).catch(e => {
                        if (e) {
                            const errorMessage = (e.response && e.response.data.message) || e.message
                            ElMessage.error(errorMessage)
                            return false
                        }
                    })
                } else {
                    return false
                }
            })
        }

        const store = useStore()
        store.commit("clearTags")

        return {
            param,
            rules,
            loginForm,
            submitForm,
        }
    }
}
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: grey;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>