# Building

We use webpack as our compiler with plugins for typescript, esnext, etc. To build, run: `npm run build`. 

### Analyzing the bundle
Keeping our files small is very important, especially for users that have slow internet. The less we send, the faster and better. Make sure to analyze your bundles by running `npm run analyze:client`. This will open a new tab with the different file chuncks and the modules within them. Additionally, we have test checks to make sure our bundles don't increase beyond a certain size. 

### Building server and client
When you run `npm run build`, we build both the server and client builds. Because this is an isomorphic app, we use the same files to run on the server and client for SEO purposes. Our server builds will not contain code that is specific to our client build, and vice versa. The entry files are:
```
/src/client/index.ts
/src/server/index.ts
```