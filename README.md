# URL Shortener Microservice

这个repository是用来完成freecodecamp的一个叫做“URL Shortener Microservic”的api project，更多细节请访问：

<https://www.freecodecamp.cn/challenges/url-shortener-microservice>

### User Stories

1. 用户在浏览器输入该地址时，把一个合法的 URL 作为参数，返回一个 JSON 格式的段地址；

2. 如果用户输入的是一个无效的 URL 地址（不符合 http://www.example.com 格式）作为参数，则返回错误；

3. 如果用户输入前边生成的短地址，则会重定向到相应的合法地址。

### Example Input

    <https://fcc-url-shortener-ms-liy.herokuapp.com/new/https://www.google.com>
    
或

    <https://fcc-url-shortener-ms-liy.herokuapp.com/59cc754cd27ae075ba9dad82>

### Example Output

    {
        "original_url": "https://www.google.com",
        "short_url": "https://fcc-liy-url-shortener-ms.herokuapp.com/59cc754cd27ae075ba9dad82"
    }
