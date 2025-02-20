# issues
1. [ ] individual MERN logos in marquee instead of MERN together
2. [ ] profile picture needs to be better aligned
3. [ ] the little scrolling component at the end can be increased by width
4. [ ] the marquee could go back and forth
5. [ ] about page takes you to that blog introduction i wrote /about should show you that page
6. [X] 404 error page uses same style css and needs to be modified bc it shows 200 OK it should show 404 error in the background and have different font colour. (for now did not link the css stylesheet)
7. [ ] 404 error page background does not move diagonally it moves horizontally.
8. [X] to the public directory add the images needed for the website as well
9. [ ] clean up how the html pastes images, the image address seems overtly complex and redundant
10. [ ] change the website theme colours to the wordpress one you have
11. [ ] buttons in the landing page need to be routed properly since a href is causing alignment issues use javascript onclick itself aong with buttons
12. [ ] site looks best with 80% zoom and not 100% that needs to be fixed
13. [ ] the like button in blogItem1 needs a js counter
14. [ ] need authentication for private APIs like creating new blog, deleting and editing (POST, DELETE, PATCH), only I can access those. The only public API is GET request on /blog that basically gets all blogs, another public one is GET request on /blog/:slug. Another public route is GET request on /about which is also the only request on /about.
15. [ ] to make a little interactive front end for the POST, DELETE, PATCH on /blog on the authenticated user's (me) end we can use, something called react-quill (used here https://www.youtube.com/watch?v=xKs2IZZya7c&t=1673s) to make a rich text editor for us.
16. [ ] consider if I should go ahead with server-side rendering, client-side rendering or next.js. will need to move html and css to another frontend/client folder otherwise and move all backend into server folder.
17. [ ] add slug creation
18. [ ] add selecting a post by ID or by clicking on one of the blogs from the list of blogs that come up at GET request on /blog