# KASTA Cloud Spring Boot 架构简要指南

## 📋 技术栈

- **Spring Boot**: 3.3.2
- **Java**: 17
- **数据库**: MySQL 8.0 + JPA
- **安全**: Spring Security + JWT (jjwt 0.11.5)
- **文档**: Swagger (SpringDoc OpenAPI 2.6.0)
- **工具**: Lombok, Hutool

---

## 📁 项目结构

```
com.kasta.cloud/
├── config/              # 配置类
│   ├── SecurityConfig.java       # Spring Security + JWT
│   ├── SwaggerConfig.java        # Swagger 配置
│   ├── JwtAuthenticationFilter.java
│   └── WebConfig.java            # CORS 等
├── controller/          # API 控制器
├── service/            # 业务逻辑
├── dao/                # Entity + Repository
├── dto/                # 数据传输对象
├── request/            # 请求参数
├── response/           # 统一响应格式
├── util/               # 工具类 (JwtUtil)
└── global/             # 全局异常处理
```

**分层架构**: `Controller → Service → Repository`

---

## ⚙️ 核心配置

### 1. pom.xml 主要依赖

```xml
<dependencies>
    <!-- Web + JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- Security + JWT -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.11.5</version>
    </dependency>
    
    <!-- Swagger -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.6.0</version>
    </dependency>
    
    <!-- MySQL -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
    </dependency>
    
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

### 2. application.properties

```properties
# 应用配置
spring.application.name=cloud
server.port=8080

# 数据库
spring.datasource.url=jdbc:mysql://localhost:3306/kasta?serverTimezone=GMT%2B8
spring.datasource.username=root
spring.datasource.password=123456

# JWT
jwt.secret=your-secret-key
jwt.token-validity=2626560  # 1个月（秒）

# Swagger
springdoc.api-docs.path=/v3/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
```

### 3. SwaggerConfig.java

```java
@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .addSecurityItem(new SecurityRequirement().addList("bearerToken"))
            .components(new Components()
                .addSecuritySchemes("bearerToken",
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                )
            );
    }
    
    @Bean
    public GroupedOpenApi api() {
        return GroupedOpenApi.builder()
            .group("v1")
            .pathsToMatch("/api/**")
            .build();
    }
}
```

**访问地址**: http://localhost:8080/swagger-ui.html

### 4. SecurityConfig.java 核心配置

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/user/login", "/api/user/register").permitAll()
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
```

### 5. 统一响应格式 Response.java

```java
@Data
@AllArgsConstructor
public class Response<T> {
    private Integer code;
    private String message;
    private T data;
    
    public static <T> Response<T> success(T data) {
        return new Response<>(200, "Success", data);
    }
    
    public static <T> Response<T> error(String message) {
        return new Response<>(500, message, null);
    }
}
```

---

## 🚀 如何应用到新项目

### 第 1 步：复制以下配置类
- `config/SecurityConfig.java`
- `config/SwaggerConfig.java`
- `config/JwtAuthenticationFilter.java`
- `response/Response.java`
- `util/JwtUtil.java`
- `global/GlobalExceptionHandler.java`

### 第 2 步：添加依赖到 pom.xml
复制上面的依赖配置

### 第 3 步：配置 application.properties
修改数据库连接、JWT 密钥等配置

### 第 4 步：按模块开发
```
1. 创建 Entity (@Entity + @Table)
2. 创建 Repository (继承 JpaRepository)
3. 创建 Request/DTO (数据对象)
4. 创建 Service (@Service + @Transactional)
5. 创建 Controller (@RestController + Swagger 注解)
```

---

## 📝 开发示例

```java
// 1. Entity
@Entity
@Table(name = "user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
}

// 2. Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

// 3. Controller
@RestController
@RequestMapping("/api/user")
@Tag(name = "用户管理")
public class UserController {
    
    @PostMapping("/login")
    @Operation(summary = "用户登录")
    public Response<String> login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}
```

---

## 🎯 核心要点

1. **三层架构**: Controller → Service → Repository
2. **JWT 认证**: 请求头携带 `Authorization: Bearer token`
3. **Swagger**: 自动生成 API 文档，支持 JWT 测试
4. **统一响应**: 所有接口返回 `Response<T>` 格式
5. **全局异常**: 通过 `@RestControllerAdvice` 统一处理

---

**文档版本**: v1.0 (简化版)  
**最后更新**: 2025-10-18
