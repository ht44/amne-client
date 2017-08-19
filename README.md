# Amne challenge app client

### Prompt: Build a simple React app that accepts two addresses as input and outputs a list of real estate agencies within 10 miles of either address. The list of agencies should be sorted, in ascending order, by the total (sum) distance between each agency and the two addresses. You may find it helpful to use the Google Maps & Google Places APIs. You may limit the scope of your solution to Austin, TX.

[http://amne-app.s3-website-us-west-2.amazonaws.com/](http://amne-app.s3-website-us-west-2.amazonaws.com/)

First of all I apologize that there are no automated tests. I wanted to go above and beyond with the challenge and decided to get as much functionality done as possible, as it is a very small and manageable application.

The search is not limited to Austin. It will bias outward from downtown Austin, but you can search anywhere in the U.S.

Integrating third-party DOM APIs with React is always interesting; if you see a lot of React 'refs', they're necessary in this case for the lifecycle management of Google Maps instances.

To more efficiently get the details necessary for linking to the agencies websites, I also developed a Node.js / Express microservice for handling batch requests to the Google Maps Web Service API. If I had done this on the client, using the Google Maps JavaScript API, I would have had to throttle my requests to avoid surpassing my rate limit, resulting in a slower load time. The server-side API allows 50 requests-per-second, which was more than enough for my purposes.

The service is accepting cross-origin POST requests at http://amne-micro.us-west-2.elasticbeanstalk.com/places if you want to try it out. Source code at https://github.com/ht44/amne-microservice.

It was an extra step, but it made a lot of difference in the end.
