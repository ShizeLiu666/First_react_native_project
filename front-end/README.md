# Fast Food App - Frontend

---

## 🚀 启动项目

```bash
cd /Users/liushize/Desktop/fast_food/front-end
npx expo start
```

### 停止项目

只需要按 **Ctrl + C** 就够了！

不需要手动 kill 进程。Ctrl + C 会自动停止 Expo 和 Metro Bundler，清理所有相关进程。

---

## 🔧 常见问题解决方案

### 问题 1: Expo 启动卡在 "Starting project"

**症状**: 运行 `npx expo start` 后卡在 "Starting project at..." 不动

**解决方案**（按顺序尝试）:

#### 方法 1: 清理缓存（最常见）
```bash
# 清理 Expo 缓存
npx expo start --clear
```

#### 方法 2: 清理端口占用
```bash
# 查找占用 8081 端口的进程
lsof -ti:8081

# 杀掉占用端口的进程
lsof -ti:8081 | xargs kill -9
```

#### 方法 3: 深度清理缓存
```bash
# 清理 Expo 缓存目录
rm -rf .expo

# 清理 Metro bundler 缓存
rm -rf node_modules/.cache

# 如果安装了 watchman
watchman watch-del-all

# 重新启动
npx expo start --clear
```

#### 方法 4: 重装依赖（终极解决方案）
如果上述方法都不行，说明 `node_modules` 可能损坏：

```bash
# 完全删除 node_modules 和 lock 文件
rm -rf node_modules
rm package-lock.json

# 重新安装所有依赖
npm install

# 启动项目
npx expo start
```

**⚠️ 注意**: 不要手动创建 `postcss.config.js` 文件，NativeWind v4 不需要！

---

### 问题 2: 端口被占用

```bash
# 查看占用端口的进程
lsof -ti:8081,19000,19001,19002

# 批量清理 Expo 相关端口
lsof -ti:8081,19000,19001,19002 | xargs kill -9
```

---

### 问题 3: 调试 Expo 启动问题

如果不确定问题在哪里，启用调试模式：

```bash
EXPO_DEBUG=true npx expo start --clear
```

这会显示详细的启动日志，帮助定位问题。

---

## 💡 重要提醒

### 使用正确的 Node 版本

**记住要用 Node 20！**

每次打开新终端时，确保使用正确的 Node 版本：

```bash
nvm use 20
node --version  # 应该显示 v20.x.x
```

或者设置默认版本（推荐）：

```bash
nvm alias default 20
```

---

## 📋 快速参考

| 命令 | 用途 |
|------|------|
| `npx expo start` | 启动开发服务器 |
| `npx expo start --clear` | 清理缓存后启动 |
| `Ctrl + C` | 停止 Expo 服务器 |
| `lsof -ti:8081 \| xargs kill -9` | 强制清理端口 |
| `rm -rf node_modules && npm install` | 重装依赖 |
| `EXPO_DEBUG=true npx expo start` | 调试模式启动 |

---

## 🆘 仍然无法解决？

1. 检查是否使用了正确的 Node 版本 (`node --version`)
2. 确保没有多个 Expo 进程在运行 (`ps aux | grep expo`)
3. 检查是否有防火墙或安全软件阻止端口
4. 查看完整错误日志（使用 `EXPO_DEBUG=true`）
