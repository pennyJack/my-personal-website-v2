---
title: 5 reasons why Digital Marketers should know JavaScript
date: '2020-10-20T06:30:00.000Z'
template: 'post'
draft: false
slug: 'five-reasons-why-digital-marketers-should-know-javascript'
category: 'Coding'
tags:
  - 'Coding'
  - 'JavaScript'
  - 'Tag Management'
description: 'Discusses why all Digital Marketers should have at least some programming experience and why JavaScript might be the right choice as the first language.'
socialImage: '/media/five-reasons-dm-should-know-JS/example-code.jpg'
---

[![Example Code](/media/five-reasons-dm-should-know-JS/example-code.jpg)](/media/five-reasons-dm-should-know-JS/example-code.jpg)

I’ve started out learning about Web Technologies and Web Development more seriously at the beginning of 2018. I was fortunate to receive a Google scholarship to participate in a paid course from Udacity, the [Front End Web Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011). It was a great experience accompanied by hands-on projects, where our instructors introduced us to everything necessary in modern front-end development. Some of those skills I learned back then have helped me already numerous times throughout my career, and I’m still working on improving them.

Having at least some web development skills is **more the exception than the norm** in digital marketing. There are a lot of different opinions about whether digital marketers need to know how to program. I agree that not everybody needs to have solid coding skills, but there are many compelling reasons why you should get some experience.

## Why JavaScript?

JavaScript is the language of the web due to its popularity, flexibility, and ease of use. On top, you can find JavaScript everywhere these days, [not just in the browser anymore](https://dev.to/somedood/nodejs-breaking-javascript-out-of-the-browser-since-2009-53cn).

One of my favorite articles answering the question, “[Which programming language should I learn first](https://www.freecodecamp.org/news/what-programming-language-should-i-learn-first-19a33b0a467d/),” is from Quincy Larson, founder of [freeCodeCamp](https://www.freecodecamp.org/). I read this post when I was starting my coding journey. The answer to that question remains “JavaScript,” although freeCodeCamp added Python to their curriculum since it’s quite popular among Data Scientists.

Without further ado, here are my **5 top reasons** for learning to code as a Digital Marketer:

1. Tag Implementation
2. Automating workflows
3. Build your own tools
4. Understanding
5. Advance your career

## 1. Tag Implementation

[![Google Tag Manager logo](/media/five-reasons-dm-should-know-JS/google-tag-manager_logo.png)](/media/five-reasons-dm-should-know-JS/google-tag-manager_logo.png)

Extracting insights from data and acting upon them is at the very center of the [data-driven marketing](https://www.demandjump.com/blog/what-is-data-driven-marketing#:~:text=Data%2Ddriven%20marketing%20is%20a,'%20motivations%2C%20preferences%20and%20behaviors.) approach. Without making data the core of your efforts, you are going to waste time and money.

To derive valuable insights from your online activities or (re-)engage with your visitors, you need to **collect data** from your web assets, such as your website or mobile app. It’s typically done by embedding third party technology, like analytics software (e.g., Google Analytics) or marketing tools (e.g., Facebook Pixel).

Most things are relatively easy to implement via a user-friendly web interface of a [tag management system](https://tealium.com/resource/fundamentals/what-is-tag-management/). There are a few to choose from, but [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/) is arguably the most popular, not least because it’s free to use.

However, things get tricky very fast if you need something more custom, don’t have a tag manager to rely on, or worst case, something breaks or doesn’t work as expected.

That’s where digital marketers who know JavaScript shine. Instead of searching on Google for a solution that might resemble your problem, you can quickly code it yourself. Seeking for the proper fix can be both frustrating and very time-consuming.

Another common scenario is adapting something in your website’s source code, for instance, to change the underlying [data layer](https://support.google.com/tagmanager/answer/6164391?hl=en). In the case of a regular website, it might not be too hard to do it yourself, but have you ever tried to change something within a single page application built with a modern front-end library like [React](https://reactjs.org/)? That might not be so simple anymore.

The list goes on. I’ve encountered plenty of situations where coding already helped me a great deal to get the job done.

## 2. Automating workflows

[![Google Apps Script logo](/media/five-reasons-dm-should-know-JS/google-apps-script_logo.png)](/media/five-reasons-dm-should-know-JS/google-apps-script_logo.png)

One of the easiest ways to automate tedious tasks with code is by using [Google Apps Script](https://developers.google.com/apps-script).

Apps Script is a scripting platform that helps you extend [Google Workspace](https://workspace.google.com/) products (formerly G Suite). What’s best, it’s relatively easy to pick up if you already know JavaScript.

Building custom solutions using Apps Script is something I’d recommend trying out as early as possible in your coding adventure. It’s well documented and great for practicing. You don’t have to worry about other things like HTML, CSS, or [tooling](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Introducing_complete_toolchain). Google provides you with a code editor right in your browser, and your scripts run on Google's servers. It’s incredible how much you can do with just a few lines of JavaScript. Get started with [building your first custom functions and menu items](https://developers.google.com/apps-script/quickstart/custom-functions).

I’ve already built some simple scripts with it, like filtering keywords in Google Sheets, automatically evaluating the contents of a Google form, fetching a report from an API, processing its content, and visualizing it.

Yet, automating workflows is not limited to just writing scripts in Apps Script. Using [NodeJS](https://en.wikipedia.org/wiki/Node.js), you can come up with your own logic entirely from scratch, host it on a server and make it available to anyone who wants to use it. For instance, I just helped a colleague streamline her reporting needs by automatically fetching reports every hour over an API and pushing it onto an FTP file server for further processing.

Best of all, you don’t have to maintain a server anymore. Leveraging modern cloud infrastructure, you can focus on your code and just use out-of-the-box solutions like [Google Cloud Functions](https://cloud.google.com/functions). Deploying your backend logic has never been easier.

## 3. Build your own tools

[![Google Cloud logo](/media/five-reasons-dm-should-know-JS/google-cloud_logo.png)](/media/five-reasons-dm-should-know-JS/google-cloud_logo.png)

Ever had a problem that you couldn’t find a proper tool to solve it?

While we experimented using a privacy-friendly analytics tool for our products, we couldn’t attribute certain user-defined events to our marketing partners beyond the landing page. Long story short, I built a [simple script](https://github.com/andreWibbeke/conversion_wrapper), allowing us to attribute those conversions anywhere on a client’s website.

Another cool thing to explore is [browser extensions](https://developer.chrome.com/extensions). Again, with just some snippets of code, you can build custom tools that might make your or your colleagues live a little easier.

Last but not least, cloud infrastructure like [Google Cloud](https://cloud.google.com/) offers a plethora of opportunities to create something. Though I just started, I’m already hooked. Using simplistic tools, I’ve built a click- and impression-tracker, which we can now apply to hunt down tracking issues (which we see a lot).

Check out Google’s [Codelabs](https://codelabs.developers.google.com/) to get some inspiration on what’s possible with Google Cloud.

Given some time and patience, you can build almost anything. You’re not even bound to Digital Marketing. The resources are available at your fingertips and often cost very little or are entirely free of charge.

## 4. Understanding

[![Hacker by night](/media/five-reasons-dm-should-know-JS/understanding-code.jpg)](/media/five-reasons-dm-should-know-JS/understanding-code.jpg)

Knowing JavaScript, you **begin to grasp what’s going on behind the curtain**, how tools work, what tracking means, and how to solve technical challenges best.

You are getting better at evaluating the capabilities and limits of marketing technologies and won’t fall so easily for some sales representatives’ promises anymore.

It’s also helpful when talking to your IT department. You can articulate your needs more accurately and might already know how much resources your project will consume or if it’s feasible at all.

## 5. Advance your career

[![Tieing a tie](/media/five-reasons-dm-should-know-JS/advance-career.jpg)](/media/five-reasons-dm-should-know-JS/advance-career.jpg)

Lastly, the need for people with technical abilities is not going to decline anytime soon. Especially those who know how to write software and to [exploit the cloud](https://cloudacademy.com/blog/what-exactly-is-a-cloud-architect-and-how-do-you-become-one/) are in high demand.

More and more companies are willing to invest a larger portion of their budget in new (marketing) technologies. After all, without the right people to manage those technologies, they won’t add any value.

## Where can I learn to code?

There are dozens of options, most of which are pretty decent choices. It’s mostly just a matter of personal taste and learning style. [Codecademy](https://www.codecademy.com/catalog/language/javascript) (paid) and [freeCodeCamp](https://www.freecodecamp.org/) (free) are two options I can wholeheartedly recommend.

For more resources, check out my article about my top [10 essential JavaScript learning resources every technical Marketer should know](ten-essential-javascript-learning-resources-every-technical-marketer-should-know).

That’s it, folks. I hope you enjoyed the article. Thanks for reading!

In case you liked the article and want to read more about it, give me a **thumbs up** in the comment section below.

<hr>

Something missing, or you want to ask something? **Leave a comment below!**
