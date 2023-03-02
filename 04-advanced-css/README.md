# Advanced CSS: Frameworks and Animations

[Link to video.](https://www.youtube.com/watch?v=akvVfxi_h94)

## Overview/Table of Contents

We'll be taking a *very brief* tour of CSS Animations, and talk about what you can use them for. This set of notes will also contain a brief overview of how to use CSS frameworks and a tour of some popular ones.

- [Advanced CSS: Frameworks and Animations](#advanced-css-frameworks-and-animations)
  - [Overview/Table of Contents](#overviewtable-of-contents)
  - [The Basics](#the-basics)
    - [An Aside: Animation vs. Transition](#an-aside-animation-vs-transition)
  - [How the Pros Do It](#how-the-pros-do-it)
    - [JS \& CSS](#js--css)
    - [The After Effects Pipeline](#the-after-effects-pipeline)
  - [How to Import a CSS Framework](#how-to-import-a-css-framework)
  - [Bootstrap: a primer](#bootstrap-a-primer)
    - [an aside on jQuery](#an-aside-on-jquery)
    - [bootstrap tl;dr](#bootstrap-tldr)
  - [Bulma: a primer](#bulma-a-primer)
    - [bulma tl;dr](#bulma-tldr)
  - [Tailwind: a primer](#tailwind-a-primer)
    - [tailwind tl;dr](#tailwind-tldr)
  - [Some Other Frameworks \& Tools](#some-other-frameworks--tools)
  - [Final Thoughts](#final-thoughts)

## The Basics

The core of CSS Animations has to do with a concept called a "keyframe". As a fun aside, Matt first learned this when he started learning programming with *Adobe Flash*, which is now essentially defunct software.

Right, back to the point. A [Key Frame](https://en.wikipedia.org/wiki/Key_frame) is a term from film-making and animation that defines a rough set of points for a smooth transition. These are manually picked by a human; but, each frame in-between is automatically filled-in by a computer (or historically, other people). If you pick the right algorithm, you can define lots of animations with only a few lines of code!

In CSS, we can set keyframes for objects with certain property values; the browser's CSS engine will handle everything in-between. Let's look at a dead-simple example (you can view all of these in `animations.html` in this folder):

```css
@keyframes redToBlue {
    from {
        background-color: red;
    }
    to {
        background-color: blue;
    }
}

#simple-square {
    width: 250px;
    height: 250px;
    animation-name: redToBlue;
    animation-duration: 5s;
    background-color: black;
}
```

```html
<div id="simple-square"></div>
```

![animation of square changing from red -> blue -> black](images/simple-color.gif)

Wow, we just dropped a lot on you there. Some notes:

* first, we used the `@keyframes` directive, or "rule". This is a little different than all of the other CSS properties that we've used so far!
* we've named our set of keyframes (i.e. our animation) `redToBlue`
* within `redToBlue`, there are two "objects": `from` and `to`. with these two objects, CSS engines will automatically shift from `from` to `to` automatically!
* in `#simple-square`, we define two animation-related properties: `animation-name`, which we fill in with the name of our animation (`redToBlue`), and the duration via `animation-duration`, which is 5 seconds.
* now, let's examine the behaviour! it goes from a solid red, fading through purple, into solid blue over 5 seconds. **then, the animation stops, and it goes back to the default background color, black**. this is important behaviour!

Hopefully, this made sense at a top-level! If it didn't, no worries - while this is a short lecture/workshop/video/note, we'll link some resources where you can explore more (and... other ways you can do animations).

You can animate many different properties, with more control over timing! Let's take a look at a only slightly-more complex animation:

```css
@keyframes heartbeat {
    0% {
        transform: scale(0.75);
    }

    25% {
        transform: scale(1);
    }

    50% {
        transform: scale(0.75);
    }

    75% {
        transform: scale(1);
    }

    100% {
        transform: scale(0.75);
    }
}

.animated-heartbeat {
    animation-name: heartbeat;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    font-size: 100px;
    display: inline-block;
}
```

```html
<span class="animated-heartbeat">❤️</span>
```

![animation of an emoji heart "beating"](images/heartbeat.gif)

Hopefully, you can infer some of the new features that we've just used - generally, we think that CSS does a solid job of naming things. But, just to be clear:

* note that, instead of using `from` and `to`, we set percentage breakpoints for our animation. you can think of `from` and `to` being special cases of `0%` and `100%`
* the CSS property we changed is `transform`, which we haven't encountered before. [CSS Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transforms/Using_CSS_transforms) are a feature of CSS that, well, let you transform elements - scale, move, rotate, shear, etc.! In this case, as you can see, we're using `scale` - which scales the size of our element!
* Transforms need to be box-positioned, which is why we used `display:inline-block`.
* We added one more animation option to our new class, `animation-iteration-count` - this governs how many times an animation runs before stopping. The default value is `1`, and it accepts any number; however, the `infinite` keyword makes it run forever, which is exactly how much we love you.

In general, there are many, many useful ways you can control animations in CSS. Here are a few other keywords with brief explanations of what they do:

* [`animation-timing-function`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function): what function do you use to fill in the frames in between the keyframes? You could distribute theme evenly, or use a [cubic-bezier curve](https://cubic-bezier.com/)
* [`animation-delay`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay): when should your animation start?
* [`animation-direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction): should your animation play forward, backward, or alternate (on multiple iterations)
* [`animation-fill-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode) what happens to the element before and after the animation? this has to do with **the square turning black in our first example**
* [`animation-play-state`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state) should the animation continue playing, or pause itself? useful to control your animations with Javascript

And, there's a short-form, [`animation`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation), that makes your life easier.

This is only enough to dip your toes in CSS animations, but we wanted to show you what is *possible*. If this is the kind of thing that interests you, definitely read more - sinking one or two hours into CSS animations can make you an absolute pro!

We'll leave you with one final relatively simple example, which combines a few of the other topics that we covered (peep that `position: absolute`!) and one we haven't (but you can [read up on it](https://developer.mozilla.org/en-US/docs/Web/CSS/::after)):

```css
.underline-expand {
    font-family: "Arial";
    font-size: 50px;
    display: inline-block;
    position: relative;

    animation-name: text-whiten;
    animation-duration: 0.5s;
    animation-delay: 2.5s;
    animation-fill-mode: both;
}

.underline-expand:after {
    animation-name: underline;
    animation-duration: 1.5s;
    animation-delay: 1s;
    animation-fill-mode: both;

    content: "";
    display: block;
    background-color: #333333;

    z-index: -1;
    position: absolute;
    bottom:  -10px;
    left: -5px;
}
```

```html
<span class="underline-expand">hey there!</span>
```

![animation of an underline expanding under text, then filling the background](images/hey-there.gif)

### An Aside: Animation vs. Transition

Animations have a sister feature called [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions). Functionally, transitions are basically animations that can only change from one state to another, or in other words, as if they had only have two keyframes: `from` and `to`. They do have a slightly different syntax, the types of CSS properties that you're allowed to transition is slightly different, and if your element is *transitionable*, using a transition is probably better for performance. They're most commonly used for hover effects, and, well, page transitions.

We won't really delve into the difference too much, but it's something to keep in mind! You'll likely stumble across lots of code that uses the `transition` keyword, and now you know what that does!

## How the Pros Do It

Pros use keyframes too! But sometimes, there are easier ways to do things.

One is to rely on other people. [Animate.css](https://animate.style/) is one such example, a pure CSS framework that implements animations just like how we did! But, instead of fiddling around with bezier curves, delays, or tiny details, they do it for you. How convenient!

But... what happens when your animations get very complex? For example, look at this animation (courtesy of [Julian Garnier](https://codepen.io/juliangarnier/pen/LMrRNW))

![julian garnier's anime.js demo, concentric circles lighting up on a sphere](images/anime-js-sphere.gif)

or this one ([a demo for Lottie](https://airbnb.io/lottie/#/), by Airbnb)

![a playful animation of the letters "Lottie" being animated](images/lottie-splash.gif)

Okay, clearly, this would be pain to do by hand. So, how do the pros do it?

### JS & CSS

One way to create complex animations is to programatically control them with Javascript. Our favourite, by far, is [anime.js](https://animejs.com/) (the JS library used for the sphere animation). This is one of the most insane open-source web projects out there, with almost limitless potential. It's *so cool*.

There are also React bindings for it as well, so you can use anime in your React apps! Awesome!

Another (much less complex) option is [Micron.js](https://webkul.github.io/micron/) is a lightweight "micro-interaction" library that uses JS & CSS animations to create small but pleasing interactions. This is great for button hover effects, little notification alerts, and small text transitions.

One great visual tool that we've heard of (though haven't personally used) is [Keyframes.app](https://keyframes.app/), which provides a UI on top of the types of interactions that these libraries provide. If you enjoy using tools like iMovie, this might be it for you!

### The After Effects Pipeline

Sometimes, anime.js still isn't enough to cut it. Maybe you want to draw a custom scene, use shaders, or any sort of VFX.

This is where [Adobe After Effects](https://www.adobe.com/products/aftereffects.html), the industry standard for motion graphics and visual effects work, comes in.

But, how can you render a video made in After Effects efficiently? The short answer is, you don't - videos are large file formats that are hard to size. However, Airbnb has come up with a creative (and open-source) solution: write a library (called [Lottie](https://airbnb.io/lottie/#/)) that converts After Effects animations directly into CSS. Lottie is usable on both websites and mobile apps, and it allows you to create some truly stunning visuals.

The learning curve for this is huge. You need to learn (and ... purchase) After Effects, which in and of itself is no small task (it's literally people's jobs). Then, you need to create animations tailored for each of your platforms, which often involves different aspect ratios, auto-scaling, and color-correction.

But when you do it well? Damn, it'll look good.

## How to Import a CSS Framework

If you read one thing in this document, it should be this. How would you import any CSS framework?

The answer is exactly like how you'd import your own CSS file. Simply create a `<link>` tag, and point it at the library file!

You have two options:

* host the framework yourself
* use a CDN (content delivery network) <- usually better

Hosting the framework yourself is exactly what you might imagine.

```html
<html>
    <head>
        <link rel="stylesheet" href="/PATH/TO/YOUR/FRAMEWORK">
    </head>
    ...
```

Just download the file, plop it in a folder, and put the path in your `<link>`. Simple enough!

Okay, but why is a CDN better? A **Content Delivery Network** is a fancy term that really means somebody else put lots of effort to *deliver* your *content* very quickly. We won't go into too many details, but basically, the CSS framework is stored somewhere else - when a user boots up your page, their computer makes a request to the CDN to pick up a copy of the framework.

This has two key benefits:

1. The CDN will probably load faster than whatever webserver your app is on - it's designed to!
2. If other websites the user visited **use the same resource**, it will be already cached in their browser, and **a network request doesn't even need to be made!**

That second point is huge, especially for very very common frameworks like Bootstrap or Font Awesome. Chances are, your user has visited another site that uses those very same libraries. If you use the same CDN (and there are typically only a handful or a single recommended one), everybody wins!

The nice thing is that using a CDN is easy as pie.

```html
<!-- this example is taken from the Bootstrap documentation -->
<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
    crossorigin="anonymous">
```

Okay, so it looks like you plop a URL into `href` (just like what we'd do for a `<a>` tag). But what about the `integrity` and `crossorigin` properties?

* the `integrity` property contains a SHA-384 checksum, which is a fancy computer algorithm that people use to make sure that the file wasn't changed. Since we don't control stackpath.bootstrapcdn.com, we have no idea what the file actually is - maybe it's a virus! So, the writers of Bootstrap give us a way to check the *integrity* of a file - if the hash of the file doesn't match the checksum, the file isn't loaded. This property is *optional*, but you should use it when you can!
* the `crossorigin` property has to do with something called [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), which is an acronym that no web developer likes. The link will explain it better than we ever can, but the gist of the story is that we need to be nice to people that we borrow resources from (you really should read the link). In some cases (especially with API calls), **CORS is mandatory**. So if the docs tell you to use it, please use it.

Long story short? Follow the documentation!

## Bootstrap: a primer

The first CSS framework we'll talk about is [Bootstrap](https://getbootstrap.com/). Bootstrap is an open-source project that [started as an internal CSS framework at Twitter](https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework)), in an attempt to standardize the site's look and feel - and over the next 8+ years, Bootstrap completely changed the web development game.

Bootstrap's big sell is that it provides a large set of CSS classes to create "components", or pre-made complex layout elements. Take a look at [this example of a classic "pricing page"](https://getbootstrap.com/docs/4.5/examples/pricing/):

![Screenshot of Bootstrap's Pricing Page Example](bs-pricing-example.png)

This page is entirely built with Bootstrap. It includes several components:

* a responsive [navigation bar](https://getbootstrap.com/docs/4.5/components/navbar/) with alignment and buttons
* a super-sized [display heading](https://getbootstrap.com/docs/4.5/content/typography/)
* a [row](https://getbootstrap.com/docs/4.5/layout/grid/) of [cards](https://getbootstrap.com/docs/4.5/components/card/) with [buttons](https://getbootstrap.com/docs/4.5/components/buttons/)
* a footer with a responsive grid system

Yet, this example has no custom CSS (other than Bootstrap), and all of the HTML content spans only 100 lines. That's insane, given the number of components that this page has! Take a look at *just how easy* it is to make a card with Bootstrap:

```html
<!-- taken from the above example; no extra CSS! -->
<div class="card mb-4 shadow-sm">
    <div class="card-header">
    <h4 class="my-0 font-weight-normal">Free</h4>
    </div>
    <div class="card-body">
        <h1 class="card-title pricing-card-title">
            $0 <small class="text-muted">/ mo</small>
        </h1>
        <ul class="list-unstyled mt-3 mb-4">
            <li>10 users included</li>
            <li>2 GB of storage</li>
            <li>Email support</li>
            <li>Help center access</li>
        </ul>
        <button type="button" class="btn btn-lg btn-block btn-outline-primary">
            Sign up for free
        </button>
    </div>
</div>
```

There are other benefits to Bootstrap too. It has a very convenient flexbox-based grid system, many convenient layout utilities (e.g. vertically centering something, which is notoriously frustrating), a solid set of form controls, and a pre-defined set of colours. Many of its components have interactivity baked-in, so you don't even need to write that much Javascript! And, they're releasing their own [icon set](https://icons.getbootstrap.com/)!

![GIF of Bootstrap's Carousel Page Example](bs-carousel-example.gif)

Bootstrap also does a lot of important **good web development practices by default**:

* it places mobile-responsiveness as a priority, building it in to their components so you don't have to!
* it tests strongly for web accessibility (e.g. contrast, screen-reader friendliness), which is important in making the internet more inclusive!
* it handles different browsers gracefully, with fallbacks, vendored prefixes, and polyfills (if you don't know what those mean, don't worry about it).

Finally, Bootstrap is easily customizable. It's built with [SASS](https://sass-lang.com/), which means that you can easily change colors and other parameters, remove components, or add your own features easily!

All of these things means that *tons* and *tons* of websites use Bootstrap. Sometimes, this is a great thing - it means there's a vibrant community around it, with easily-extensible themes and plugins, great documentation, and quick turnaround on bugfixes and new features.

On the downside, it means that your website ... won't look that unique. For some cases, that's ok - not every website needs to be sexy and flashy! But, if you are looking to make your website stand out, the default Bootstrap template is not enough.

The other downside of Bootstrap is that it's **big**. As in, the file size is really big. You need to load in their CSS, their JS, and their JS dependencies (as of v4, jQuery and Popper). That's **a lot of code!** And if you don't use it, all it'll do is slow down your page load, which is not what you want.

At the end of the day, Bootstrap is a great resource, and definitely something you should take for a spin at least once. Then, you can decide if you enjoy using it or not!

### an aside on jQuery

One of Bootstrap's dependencies is [jQuery](https://jquery.com/), a Javascript library. jQuery provides a set of utility functions that make it easier to manipulate the DOM, control events, and make HTTP requests.

jQuery *used* to be really important, as it provided a uniform API across a set of browsers that all implemented JS differently (e.g. Firefox, Chrome, Opera, IE, Edge, Safari, etc.). To do that, it needed to be big - which was an alright price to pay if it meant a kick-ass website.

However, browsers have recently gotten much better at standardizing Javascript (e.g. `fetch` is now standard), which makes jQuery's biggest sell... not that big of a sell anymore. These days, new websites tend to not be made with jQuery, and instead, rely on vanilla JS. In fact, Bootstrap is moving away from jQuery for its `v5`.

So, what does this mean? You might see lots of StackOverflow questions that say "use jQuery", and that might've been the answer 5 years ago, but that shouldn't be the answer anymore. In other words, *you probably don't need jQuery*. **Especially if you're writing a React app.**

(unless you're using Bootstrap `v < 4`. then you have to use it)

### bootstrap tl;dr

* Bootstrap is probably the **most popular CSS framework**. That means there's lots of examples, themes, and StackOverflow questions on how to use it!
* Bootstrap is a huge project! Specifically, it has many **custom components**, its own **icon set**, and custom (but mandatory) **Javascript tools** (among other distinct features).
* Because Bootstrap is so big, you **need to import many large files**.
* Bootstrap is easily customizable with **SASS**.
* There are lots of libraries that add-on to Bootstrap, or implement Bootstrap in React/Angular/Vue/etc.
* Since *so many people use Bootstrap*, the default theme doesn't look very unique.
* Bootstrap has a veteran release time behind it. You'll rarely find bugs, they cover lots of accessibility use cases, and when needed, they iterate and bugfix quickly.

## Bulma: a primer

[Bulma](https://bulma.io/) is another popular open-source CSS framework, originally made by [Jeremy Thomas](https://jgthms.com/). Similar to Bootstrap, it provides a set of CSS utilities, a convenient grid system, and pre-defined components to make your life easier. It's customizable with SASS, and lets you selectively import what you need.

Here's an example of a quick web-app I made with Bulma:

![Screenshot of Angery Reacts, built with Bulma](bulma-example.png)

How does Bulma compare to Bootstrap? There are a few core differences:

1. Bulma is **smaller and lighter** than Bootstrap. It has less utilities and components than Bootstrap (e.g. no [Carousel](https://getbootstrap.com/docs/4.5/components/carousel/), [List Group](https://getbootstrap.com/docs/4.5/components/list-group/), or [Toasts](https://getbootstrap.com/docs/4.5/components/toasts/)).
2. Bulma has **no Javascript**. That means that you don't need jQuery, but it also means that you need to code things like a [modal popping up](https://getbootstrap.com/docs/4.5/components/modal/) yourself!
3. Bulma is mostly maintained by one person, rather than a large team of contributors. This means that it's slower to receive updates and bugfixes. In fact, it hasn't even reached `v1` yet!

Which one you'll need can depend on your project! If you know your app is going to be dead-simple, and you won't need any complex components or JS plugins, then something like Bulma is probably more suited for your application. If you know you're going to be building many complex views, choosing Bootstrap can save you lots of time.

But, at the end of the day, it really is up to you. The only people who say "never use X" or "always use X" in the realm of CSS frameworks are people who aren't worth listening to.

### bulma tl;dr

* Bulma is another **wildly popular CSS framework**, which means that there's a solid community (including plugins) for it!
* Unlike Bootstrap, Bulma is **CSS only**: you aren't importing jQuery, Popper, or a custom JS file.
* Bulma is also lighter than Bootstrap: it has less out-of-the-box components (like a carousel), which can be good or bad!
* Bulma is also easily customizable with **SASS**.
* Bulma is open-source, but is still primarily developed by one person - that makes it slower to update than Bootstrap.

## Tailwind: a primer

[Tailwind](https://tailwindcss.com/) is a CSS framework with an entirely different approach. Instead of providing you with pre-made components, Tailwind is *just utilities*. You combine the utilities to create components, exactly how you want them.

This is what a [card](https://tailwindcss.com/components/cards/) might look like in Tailwind:

```html
<div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
  </div>
</div>
```

![Screenshot of a Tailwind Card](tailwind-card.png)

The end result is pretty similar in design language to the cards that we saw in Bulma and Bootstrap, but the way we got there was really different!

Tailwind, frankly speaking, is not exactly beginner friendly: you need a strong grasp of CSS fundamentals like `padding`, `margin`, `display`, `overflow`, `background`, etc. That being said, being really good with Tailwind is like being really good with Emacs - there aren't many people who do it, and they're scarily good with it.

Tailwind has other trickle-down benefits: it's a lot lighter than Bootstrap and Bulma (since there are no components, at all!), and it's significantly more customizable. Migrating between versions is dead simple, as is using it with other libraries.

### tailwind tl;dr

* Tailwind does not have components: it is **utility-first** and **utility-only**
* Tailwind is **extremely flexible** and **customizable**
* Tailwind has a very *steep* learning curve

## Some Other Frameworks & Tools

Here are some other cool things you can look into if you're interested:

* [Font Awesome](https://fontawesome.com/) is probably the web's most popular standalone icon framework! It has a free and a paid tier (the latter has more icons and styles)
* [Material Design](https://material.io/design) is Google's design framework, and they have pre-built components, icons, and design layouts made just for you!
* [Tachyons](http://tachyons.io/) is a cool CSS framework that also supports CSS variables with a simple plugin!
* [Semantic UI](https://semantic-ui.com/) is another very popular Bootstrap-like CSS & JS component framework.
* [Water.css](https://watercss.kognise.dev/) is a CSS framework that only modifies element tags (it introduces no classes). It's very useful when you're making generated HTML content.
* [instagram.css](https://github.com/picturepan2/instagram.css) implements Instagram filters in CSS.
* [loaders.css](https://connoratherton.com/loaders) is one fun collection of CSS loading animations
* [Highlight.js](https://github.com/highlightjs/highlight.js) is a JS framework that can help you do automatic syntax highlighting with CSS classes! To use it, you don't need much JS knowledge, so have no fear!
* [Using CSS Animations (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)
* [CSS Animations (W3Schools)](https://www.w3schools.com/css/css3_animations.asp)
* [Using CSS Transforms (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transforms/Using_CSS_transforms)
* [Using CSS Transitions (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)

## Final Thoughts

At the end of the day, there is no *right* or *wrong* CSS framework! The one that you pick is a combination of the needs of your project, the design language of the framework, and personal preference. You also can choose not to use one at all - that's what we do for the Teach LA website! You should use whatever tool system and setup *makes sense for you*.
