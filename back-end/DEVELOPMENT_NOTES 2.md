# Fast Food Backend 开发笔记

## 📚 技术栈

### 核心框架
- **Spring Boot**: 3.3.2
- **Java**: 17
- **构建工具**: Maven

### 数据层
- **ORM**: Spring Data JPA (Hibernate)
- **数据库**: MySQL 8.0
- **数据库方言**: MySQL8Dialect

### 安全认证
- **安全框架**: Spring Security
- **认证方式**: JWT (JSON Web Token)
- **JWT 库**: jjwt 0.11.5 (api, impl, jackson)
- **密码加密**: BCrypt
- **会话管理**: Stateless (无状态)

### API 文档
- **文档工具**: Swagger (SpringDoc OpenAPI 2.6.0)
- **访问路径**: `/swagger-ui.html`

### 工具库
- **Lombok**: 简化 POJO 开发
- **Hutool**: 5.8.16 (Java 工具集)
- **Validation**: Spring Boot Starter Validation

---

## 🏗️ 项目架构

### 分层架构
```
Controller (控制层)
    ↓
Service (业务层)
    ↓
Repository (数据访问层)
    ↓
Database (数据库)
```

### 包结构
```
com.fastfood.backend/
├── config/              # 配置类
│   ├── SecurityConfig          # Spring Security 配置
│   ├── SwaggerConfig           # API 文档配置
│   ├── JwtAuthenticationFilter # JWT 拦截器
│   └── WebConfig               # Web 配置 (CORS)
├── controller/          # REST 控制器
├── service/            # 业务逻辑层
├── dao/                # 数据访问层 (Entity + Repository)
├── dto/                # 数据传输对象
├── request/            # 请求参数封装
├── response/           # 响应格式封装
├── util/               # 工具类
│   └── JwtUtil                 # JWT 工具
└── global/             # 全局组件
    └── GlobalExceptionHandler  # 全局异常处理
```

---

## 🔐 安全架构

### JWT 认证流程
1. **用户登录** → 验证用户名/密码
2. **生成 Token** → JwtUtil.generateToken()
3. **返回 Token** → 前端保存
4. **请求携带 Token** → Header: `Authorization: Bearer <token>`
5. **拦截器验证** → JwtAuthenticationFilter
6. **解析用户信息** → 设置 SecurityContext
7. **访问受保护资源**

### Security 配置要点
- **CSRF**: 禁用 (前后端分离架构)
- **Session**: STATELESS (无状态)
- **公开端点**: `/api/auth/**`, `/swagger-ui/**`
- **过滤器链**: JwtAuthenticationFilter → UsernamePasswordAuthenticationFilter

### 密码加密
- **算法**: BCrypt
- **强度**: 默认 10 轮
- **使用**: `PasswordEncoder.encode(rawPassword)`

---

## 📡 统一响应格式

### Response 结构
```json
{
  "code": 200,
  "message": "Success",
  "data": { ... }
}
```

### 常用方法
- `Response.success(data)` - 成功返回数据
- `Response.error(message)` - 错误返回消息
- `Response.custom(code, message, data)` - 自定义响应

---

## 🛠️ 核心配置类详解

### 1. SecurityConfig.java
**功能**: Spring Security 安全配置
**关键技术**:
- `@EnableWebSecurity` - 启用 Web 安全
- `@EnableMethodSecurity` - 启用方法级安全
- `SecurityFilterChain` - 配置安全过滤链
- `PasswordEncoder` - BCrypt 密码编码器
- `AuthenticationManager` - 认证管理器

**配置要点**:
```java
- CSRF 禁用
- 公开端点: 登录/注册/Swagger
- 会话策略: STATELESS
- 添加 JWT 过滤器
```

### 2. JwtAuthenticationFilter.java
**功能**: JWT 请求拦截与验证
**继承**: `OncePerRequestFilter`
**流程**:
1. 从 Header 提取 `Authorization`
2. 解析 Bearer Token
3. 验证 Token 有效性
4. 提取用户信息
5. 设置 SecurityContext

### 3. SwaggerConfig.java
**功能**: API 文档配置
**特性**:
- 支持 JWT Bearer 认证测试
- 分组管理 API (v1)
- 自动生成接口文档

### 4. WebConfig.java
**功能**: Web 层配置
**CORS 配置**:
- 允许所有来源 (生产环境需修改)
- 支持方法: GET, POST, PUT, DELETE, OPTIONS
- 允许所有 Header

---

## 🔧 工具类详解

### JwtUtil.java
**核心方法**:

| 方法 | 功能 |
|------|------|
| `generateToken(username)` | 生成 JWT Token |
| `validateToken(token)` | 验证 Token 有效性 |
| `getUsernameFromToken(token)` | 从 Token 提取用户名 |
| `getExpirationDateFromToken(token)` | 获取过期时间 |

**技术要点**:
- 签名算法: HS256
- 密钥来源: `application.properties` (jwt.secret)
- 有效期: 可配置 (默认 1 个月)

---

## 🚨 全局异常处理

### GlobalExceptionHandler.java
**注解**: `@RestControllerAdvice`

**处理的异常**:

| 异常类型 | HTTP 状态 | 说明 |
|---------|----------|------|
| `MethodArgumentNotValidException` | 400 | 参数验证失败 |
| `IllegalArgumentException` | 400 | 非法参数 |
| `RuntimeException` | 500 | 运行时异常 |
| `Exception` | 500 | 其他异常 |

---

## 🗄️ 数据库配置

### application.properties 配置
```properties
# 数据库连接
spring.datasource.url=jdbc:mysql://localhost:3306/fastfood
spring.datasource.username=root
spring.datasource.password=123456

# JPA 配置
spring.jpa.hibernate.ddl-auto=update  # 自动更新表结构
spring.jpa.show-sql=true              # 显示 SQL
spring.jpa.properties.hibernate.format_sql=true  # 格式化 SQL
```

### DDL-AUTO 策略
- `update`: 更新表结构 (开发环境)
- `validate`: 仅验证不修改 (生产环境推荐)
- `create`: 每次启动重建表
- `create-drop`: 关闭时删除表

---

## 📝 开发流程 (标准模块开发)

### Step 1: 创建 Entity (实体类)
```java
@Entity
@Table(name = "table_name")
@Data
public class EntityName {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // 其他字段...
}
```

**关键注解**:
- `@Entity` - JPA 实体
- `@Table` - 指定表名
- `@Id` - 主键
- `@GeneratedValue` - 自增策略
- `@Column` - 列属性

### Step 2: 创建 Repository (数据访问层)
```java
public interface EntityRepository extends JpaRepository<Entity, Long> {
    // 自定义查询方法
    Optional<Entity> findByField(String field);
}
```

**JpaRepository 提供**:
- `save()`, `findById()`, `findAll()`, `deleteById()`
- 支持方法名查询
- 支持 `@Query` 自定义 SQL

### Step 3: 创建 Request/DTO (请求/响应对象)
```java
@Data
public class EntityRequest {
    @NotBlank(message = "字段不能为空")
    private String field;
}
```

**验证注解**:
- `@NotNull`, `@NotBlank`, `@NotEmpty`
- `@Size`, `@Min`, `@Max`
- `@Email`, `@Pattern`

### Step 4: 创建 Service (业务层)
```java
@Service
@Transactional
public class EntityService {
    @Autowired
    private EntityRepository repository;

    public Response<?> businessMethod() {
        // 业务逻辑
    }
}
```

**关键注解**:
- `@Service` - 标记服务层
- `@Transactional` - 事务管理
- `@Autowired` - 依赖注入

### Step 5: 创建 Controller (控制层)
```java
@RestController
@RequestMapping("/api/entity")
@Tag(name = "模块名称")
public class EntityController {

    @Autowired
    private EntityService service;

    @PostMapping("/action")
    @Operation(summary = "接口描述")
    public Response<?> action(@RequestBody @Valid Request request) {
        return service.businessMethod();
    }
}
```

**关键注解**:
- `@RestController` - REST 控制器
- `@RequestMapping` - 路由前缀
- `@PostMapping`, `@GetMapping`, etc. - HTTP 方法
- `@RequestBody` - 请求体绑定
- `@Valid` - 参数验证
- `@Tag`, `@Operation` - Swagger 文档

---

## 🎯 开发规范

### 命名规范
- **Entity**: `User`, `Product` (单数, 首字母大写)
- **Repository**: `UserRepository`
- **Service**: `UserService`
- **Controller**: `UserController`
- **Request**: `LoginRequest`, `RegisterRequest`
- **DTO**: `UserDTO`

### 返回值规范
- 所有 Controller 方法返回 `Response<T>`
- Service 层可以抛出异常, 由全局异常处理器捕获

### 事务管理
- Service 层方法添加 `@Transactional`
- 只读操作使用 `@Transactional(readOnly = true)`

---

## 🔍 面试要点

### 1. 项目架构
- **分层架构**: Controller-Service-Repository 三层架构
- **前后端分离**: RESTful API + JWT 无状态认证
- **统一响应**: 封装 Response 对象
- **全局异常**: 统一异常处理机制

### 2. 安全性
- **JWT 认证**: 无状态, 可扩展, 支持分布式
- **密码加密**: BCrypt 单向加密, 防止彩虹表攻击
- **拦截器**: 自定义 Filter 验证 Token
- **CORS**: 跨域资源共享配置

### 3. 技术亮点
- **Spring Security**: 方法级安全控制
- **JPA**: ORM 框架, 自动生成 SQL
- **Swagger**: 自动化 API 文档, 支持在线测试
- **参数验证**: JSR-303 Bean Validation
- **异常处理**: `@RestControllerAdvice` 统一处理

### 4. 性能优化
- **数据库连接池**: HikariCP (Spring Boot 默认)
- **懒加载**: JPA 关联查询优化
- **索引**: 数据库字段索引优化
- **缓存**: (可扩展 Redis)

### 5. 可扩展性
- **模块化设计**: 清晰的包结构
- **配置外部化**: application.properties
- **依赖注入**: Spring IoC 容器管理
- **接口隔离**: 易于单元测试和 Mock

---

## 📌 常见问题

### Q1: JWT Token 存储在哪里?
A: 前端通常存储在 `localStorage` 或 `sessionStorage`, 每次请求在 Header 中携带

### Q2: 如何刷新 Token?
A: 实现 Refresh Token 机制, 或在 Token 即将过期时自动续期

### Q3: 为什么禁用 CSRF?
A: 前后端分离使用 JWT 无状态认证, 不依赖 Cookie/Session, 不需要 CSRF 保护

### Q4: 如何实现权限控制?
A: 使用 `@PreAuthorize("hasRole('ADMIN')")` 方法级权限, 或在 JWT 中存储角色信息

### Q5: JPA 的 ddl-auto=update 安全吗?
A: 开发环境可用, 生产环境建议使用 `validate` 或数据库迁移工具 (Flyway/Liquibase)

---

## 🚀 下一步开发

1. **用户模块**: User Entity + 注册/登录功能
2. **商品模块**: Product Entity + CRUD 操作
3. **订单模块**: Order Entity + 订单流程
4. **支付集成**: 第三方支付 API
5. **文件上传**: 图片上传 (商品图片)
6. **搜索功能**: JPA Specification 动态查询
7. **缓存优化**: Redis 集成
8. **消息队列**: RabbitMQ/Kafka (订单处理)

---

**文档版本**: v1.0
**最后更新**: 2025-10-18
**作者**: Fast Food Team
