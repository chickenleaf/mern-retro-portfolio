# URLs
1. '/'
2. '/blog' : GET, POST, PATCH, DELETE
3. gets all posts, creates a new post, updates, deletes posts
4. need authentication ones for privating the POST, PATCH and DELETE requets on /blog, it has to be something like POST, PATCH, DELETE on /admin/blog only GET on /blog should be public.


```
mern-retro-portfolio
├─ README.md
├─ config
│  ├─ allowedOrigins.js
│  ├─ corsOptions.js
│  └─ dbConn.js
├─ controllers
├─ issue-tracker.md
├─ middleware
│  ├─ errorHandler.js
│  └─ logger.js
├─ models
│  ├─ Blog.js
│  └─ Subscriber.js
├─ package-lock.json
├─ package.json
├─ public
│  ├─ css
│  │  ├─ about_style.css
│  │  ├─ blog_list_style.css
│  │  ├─ blog_style.css
│  │  └─ style.css
│  └─ images
│     ├─ bytes.jpg
│     ├─ floppy.jpg
│     ├─ floppy2.jpg
│     ├─ pic.jpeg
│     ├─ pic.png
│     ├─ pic1.png
│     └─ tech-stack
│        ├─ JavaScript-logo.png
│        ├─ cpp-logo.png
│        ├─ docker-logo.png
│        ├─ expressjs-logo.png
│        ├─ influxdb-logo.png
│        ├─ kubernetes-logo.png
│        ├─ mongodb-logo.png
│        ├─ mysql-logo.png
│        ├─ nginx-logo.png
│        ├─ nodejs-logo.png
│        ├─ postgresql-logo.png
│        ├─ postman-logo.png
│        ├─ python-logo.jpeg
│        ├─ questdb-logo.png
│        ├─ reactjs-logo.png
│        ├─ rust-logo.png
│        └─ sql-logo.png
├─ routes
│  ├─ blogRoutes.js
│  └─ root.js
├─ server.js
└─ views
   ├─ 404.html
   ├─ about_page.html
   ├─ blog_list.html
   ├─ each_blog.html
   └─ index.html

```