/* 1-01 - Tooling and Starter Files Setup:
dependencies listed in package.json are needed for BUILDING the app and dev dependencies are needed for developing the app.

Fun fact: If you get like: 140 vulnerabilities, it's probably 1 little small vulnerability that is USED in 140 different
of the packages and therefore they ALL will have to be updated.

2-02 - The Tech Stack Explained:
Apollo-client: In order to QUERY all of the items that we want, in order to create charges and charge the credit card and ... ,
we need a way to interface with our graphQL API and to load-in the data, provide loading states, provide error states and also we need
sth that is gonna be able to cache the data, so we're not unnecessarily fetching that from the network and that's what apollo-client will do
for us. So we're gonna integrate that pretty tightly with our app, anytime we want to either FETCH data or PUSH data to our actual server.

Styled comps(a css in js framework) is a great way to do scope css in react. So we're gonna write bunch of reusable styles.
Being able to create reusable styles that are scoped meaning that if we make changes to the css of a cart and we accidently have a className
that is the same somewhere ELSE on the page, that's not going to be affected.

The main benefit of styled comps is it's gonna teach you the ideas of writing css in react apps and more importantly how to write modular
scope css components that can be reused.

KeystoneJS is a framework that gives us a headless CMS which a headless CMS allows you to login to your CMS and there you can create all
of our different data types like cart items and actual items and allows us to upload photos. In other words, it's a nice interface that
allows us to manage our data.

Instead of us having like a keystone theme or sth like that which you might be used to in wordpress land, it will actually give us a graphQL API
that will allow us to write queries.
So again, keystone is gonna provide us a graphQL API based on CRUD operations in our CMS and then apollo will make the queries from/to keystone
and put the data into our nextjs app. So apollo is sort of the person in the middle that goes and fetches the data and then injects it into our
react app.
Keystonejs is written in node and all of our resolvers will be written in js, under the hood it uses either mongodb which we'll be using in this
course, but you can also hook it up to postgres or prisma. It doesn't matter what db you use because the code that we write for keystone will be
figured out under the hood, so you can hook it up to any DB.

3-03 - An intro to Next:
.gitkeep is for when you want to put an empty folder in git.

In pages directory, create index.js and notice we used lowercase i in there. Normally when you create comps in react you would use capital for
first character and that's because that denotes them as reusable comps, but in this case, it's just a page and that index.js would be very
similar to how html works(index.html) and then what you do in each of your pages is you export a react function and that will be what shows up on the
page.

So we name the react comps functions or classes with a starting capital character, but the filenames for pages should be in lowercase.

The start command is nextjs(next start -p ...) for run it on production that goes on your server.

The pages in nextjs do file-system based routing but react-router is config based where we have a react router COMPONENT.

In function for a page in nextjs, instead of exporting an anonymous function, we should name that for debugging purposes so if we have debugging
errors, it's actually named. So that name of function is great for debugging.

There are snippets that you can get to when you create a new page in nextjs or other stuff in react, by typing the abbreviation and hit tab,
it will create some code. The extension for vscode is named: ES7 react/redux... snippets.

Next.js is server rendered, so if you go to a nextjs website and click on view page source(not true in development mode, but true in production mode),
you would see all of the html for the rendered out production version of that and then what happens is that, react will come and rehydrated on the
frontend and this is good for SEO and also will be rendered out if someone has JS turned off or if someone scripts the page and google crawls it.
So that's the server rendered aspect of JS and then when it gets to the client which is the browser, react will pick it up from there or nextjs will
pick it up from there and then make it a react application.

4-04 - Creating a Page Layout Component:
In Nextjs, a page is the highest you can get. But where is for example the <!DOCTYPE ...> or <html> or or <head> or <meta> or <body> ... ?
Everything inside of the page, just get dumped into the <body> and if you want control either over like a layout comp that go shows up on EVERY page or
you want control over stuff that shows UPPER than those pages, like <body> or <head> ... , well, that's this lesson about.

Let's start by very simplest, for example, how do I get sth like the nav to show up on every single page?
You might think, let's make a Page comp in the components folder. Now if we want that Page comp to show up on EVERY SINGLE PAGE, how do we do that?
You might think, let's go to our index page and let's start using that Page comp like <Page>...</Page> (you notice we're using capital P in Page, because
that's reusable in react).
By doing that, you get an error(red dots) under <Page> that says: Page is not defined and also is showing up in browser. That red dots if because of
ESLint config. The author also included the settings of eslint in package.json , so for you to get it up and running, you need to install the vscode
eslint plugin, it probably is working already, That's happening because, you can go to wesbos/eslint-config repo(you can also google for
No-sweat eslint and prettier setup).

Now why is that happening?
Because we haven't imported that Page comp. So import Page in index.js file.

For vscode auto-import, go to where it throws error for not importing sth and hit ctrl+space bar and usually the right one is the one with
square cubes which that's purpule or that blue one with [] and if you click on the desired import, it figured out, because we already called it
Page, therefore it knows: 'oh, I can auto-import that in from there'.
Also we get another red-line error because our settings is setup to use single quotes, vscode auto-import it with double quotes, but once we save,
that red-line error turns over, the reason why that happen is because both the eslint and prettier that would run in that config I mentioned, will
auto-fix it for us.

Now we have a Page comp and we're wrapping each of our nextJS pages in it.

Currently if you put any elements inside <Page>, those elements don't render, but if you look at react devtools you can see that the child of our Page
comp is the things that you actually put inside(nest) Page, but they aren't rendering, because we need to render props.children of Page comp.
So in order to render out the children(the elements that are nested inside <Page>) that we pass to our Page comp, go to Page comp file and render:
{props.children} .
Now if you do this, you get a red-line error under {props.children} , that says: Must use destructuring props. Children is missing in props.
We must use destructuring assignment.
So what normally happens is, instead of just passing props and referencing all the children(props.children), you destructure that props ARGUMENT into the
ACTUAL props that you need and the way that works is, instead of just passing props variable to the comp that need it, you DESTRUCTURE it and
because props is an object, we destructure it using {} not [] .
EX) So instead of:
export default function Page(props) {
    return {props.children}
}

we say:
export default function Page({children}) {
    return {children}
}

Another example:
index.js:

...
return (
    <Page cool="heck yeah">
    ...
    </Page>
);

In Page.js file we can destructure that cool prop which was passed to Page component.
Page.js :
export default function Page({children, cool}) {
    return
    ...
    {cool}
}

Currently, we again get some errors under the children and cool props in the example above which says: cool is missing in props validation-eslint
(react/prop-types).
That's not an error, but if you want to do prop types, at the end of the Page comp file you can say for example:
EX)
Page.propTypes = {
    cool: PropTypes.string;
    children: PropTypes.arrayOf(PropTypes.node) // this will throw error in places that you just have 1 element and you're passing just that 1 element
                                                // to props.children, so we need to fix it.
    children: PropTypes.oneOf([
        PropTypes.arrayOf(PropTypes.node)
    ])
};

In the second value for children property, we're saying: One of an array of nodes(PropTypes.arrayOf(PropTypes.node)) OR(comma for second element
of array) PropTypes.node (a single element). So this will allow us to EITHER(because of oneOf() which takes an array of PropTypes) take a single
node(PropTypes.node) or an array of nodes. But then you could pass a number, as children property in props of Page comp, it just gets a little
confusing, because children prop COULD be anything. So instead we can say: children: PropTypes.any . So that's a good case of any, because it
literally could be anything.

Do I have to wrap EVERY SINGLE page file that I make in that Page comp? Is there not some sort of global layout that I can wrap the entire thing in
that global thing? So anytime a page gets created in nextjs, we have to wrap all of it in that Page comp?
There are 2 SPECIAL files in Nextjs that will allow us to get access both to the everything inside the <body> as well as you can go a little bit
higher than that and get everything in the <head> of the document.
So let's do the first one which is our _app component. So go to pages directory and create: _app.js .

Learn: Very little things in nextjs are special and the only special things are:
 1) You MUST have a pages directory which is your pages in it.
 2) If you want to control anything a little higher(in the document tree) than the Page component(which is a comp that wraps our pages), you must
 do it in _app.js file and for more higher, _document.js (custom document).

Now what you do in _app.js file, is to actually return <Page> comp and then we render out any children that are passed down.
But remember: Nextjs in _app.js is a little bit different than other pages or components, because you might think for rendering the children elements
you can simply again destructure that children prop in () of the function of _app and then in the retunring jsx, say: {children} . NOOO!
It's a little bit different, because the prop of AppComponent is: Component and pageProps. So in _app.js instead of children prop we use
<Component /> comp.
After doing that you can get rid of those <Page> wrappers in each of your page files. You may also want to kill and rerun the dev script, if you
see that your page in browser doesn't look the same as before in browser. After re-running that command, refresh the browser. So that's one of the
few situations where you DO need to kill your dev command and start it again, because we're doing a foundational thing(in this case, we added some
elements in _app and remove those duplicated elements in our pages, because they're now in one centralized place, so we needed to re-run the command)
and that may changed in recent versions of react(or nextjs?).
So now, by using _app.js and put elements we want on every single page to be rendered, we no longer need to wrap every single page in that <Page>
comp, because it's done being on globally in our _app.js . So remove those <Page> in your page files.
Also when you're doing this refactoring, you need to pay attention to:
Note: If you do want to return multiple elements that are adjacent to each other, we can wrap it react fragments which those fragments do nothing in
our case.

We also want to make a CUSTOM document. We'll be modifying our app and our document as we get more into data loading. But for now we want to make a
custom document layout, so create _document.js in pages directory and in there, that's one of the few places where we will be using a class in our code.
The tutor guesses there's no api for function based of custom document in nextjs.
Currently, nextjs doesn't have apis for hooks or anything like that.

In _document.jsx, we don't need <Head> for now, so you can comment it out, we'll back for that for styled components.(<html> and <head> tags are
custom in nextjs, so we need to import them from next/document but body tag isn't custom.)

The stuff that we imported from 'next/document'; is just boilerplate that nextjs usually talks away for themselves, but the reason why we do that
is because we need access to be able to do custom html attrs as well as we need the ability to stick our css inside of the <head> .

The things we added in _document.js won't change anything except the fact that we should see a lang attr show up on our html tag(for now) which
in before, didn't exist, until we added it. If it didn't show up, probably you need to kill the dev comand and re-run it or just refresh the browser.

Let's create a nav on our Page comp.*/
/* 5-05 - Creating our Header and Nav Components:
Inside Page comp we're likely gonna have a Header comp and a nav comp and footer and anything else that needs to show up on every single
page. So create Header comp. When you have <header> it means it's a html tag but <Header> would be a comp tag. With wes bos eslint configs,
if you save the file, it would put () around the jsx and move the first and last element to a new line. The format with () and first
and last elements on a new line is better. Now include Header comp in Page comp.

In vscode and in it's built-in emmet expand abbreviation and that will expand the for example: Header to <Header></Header> tag, by highlighting
that Header text and hit tab. In wes bos prettier, if nothing is INSIDE of a tag and you hit save, it will change it from an open close tab, to
a self closing tag, so from: <Header></Header> to <Header /> . But make sure if you have sth like <div> </div> which hasn't anything inside it
but we also DON'T want it to be a self closing tag after save, therefore, put sth inside it to avoid that behavior of prettier, which otherwise
would make it to <div /> .

By hitting ctrl+space, in vscode, it will auto import that thing your cursor is currently on it.
Currently if you use emmet inside jsx to produce elements, like: div.bar then hit tab, it will use className instead of class(which is valid), but
in near future that will be able to say class instead of className.

How do you link from page to page in nextjs?
You might think you can do a: <a href="/..."></a>, but it has the regular old link and that's refreshing the page every time you click on it.
Nextjs uses a combination of html5 push state which is changing the url, as well as the ability to trigger and re-render pages when that url
has changed. So we use nextjs <Link href=""> tag. Previously in nextjs we also HAD TO put an anchor link inside of a <Link> tag, but that's not
true anymore UNLESS you have nested elements inlin the <Link> and not just text, so if you have just text for INSIDE a Link element, you don't need
to nest that anchor tag, otherwise, it's needed(we will run to this in future).

In vscode, you can highlight(select) some lines and then hit cmd + shift + l to put a cursor on every single line.

In vscode, for making the first letter of a word or just making a character, uppercase, when you're highlighting the CHARACTER that you want to make
it uppercase, you can go to cmd pallete and write: upp and hit enter.

We imported Nav in Header comp instead of Page, because well that nav is part of Header and we know that Header itself is imported into the Page.

Anytime that you want to link to sth that is PART OF your website, you use the Nextjs's <Link> tag, but anytime you want to link to sth that is
OUTSIDE of your site, you use a regular <a href=""> anchor link.

6.06 - An Intro to Styled Components and CSS:
There's all kind of different ways that you can write css in react project, you could literally add classes to elements and then pop file
in there(or do the same thing with sass), you can use utility framework or we can write our css via scoped css and the package we're gonna be
using is styled comps. But the ideas behind styled comps is relevant in all react base and even angular ... base scoped css.
The idea behind styled comps or css-in-js is that you define all of your css IN comps as well and that have some benefits:
1) We're gonna be able to scope our css really easy
2) You can use JS values inside of css. So if you have a variable that is part of your state or any par tof your react app, you can
use that variable INSIDE of your css.

For example for styling an <h1>..</h1>, instead of applying classes to things(in this case, <h1> element) and going ELSEWHERE(some OTHER files),
we're gonna create an h1 COMPONENT with the styles that are already attached to it and then that will immediately scope all of the styles
to that <h1> tag. So in Header comp, create a variable named Logo. For styled.... , don't use "" or '' , just backticks. For example when you
have styled.h1`` , styled.h1 is a tagged template literal and it's kind of running a function called styled.h1 .

Then what we do to APPLY that css is that we're gonna go to where we have used our <h1> and we're gonna replace the <h1> with our new component
that we just made(in this case, the Logo comp). Now that <Logo> comp is still being rendered as <h1> tag but it's got that kind of random class
attached to it and that class has whatever styles we write for that <h1> .

Now let's make the <Logo> to actually encompose the entire thing, so instead of having:
<Link>
    <Logo>...</Logo>
</Link>

we would have Logo comp to wrap the <Link> . So the <Link> would be INSIDE the <Logo> and this will translate to an <h1> with an <a> inside of it.
So by doing this, now we don't have to go and add a very specific classNames to elements and also be careful to not accidently ALSO apply to some
other elements.

The top level styled comps will be applied DIRECTLY to that styled comp(so styled.h1 will be applied directly to <h1>) and then you can also have
the desendent selectors INSIDE each of styled comps.

In vscode, you can write: z2 for z-index: 2; . So write z2 and then open command pallete and write expand abbreviation. If you don't have
keyboard shortcut hooked up to that emmet expand abbr(like ^ E shortcut), you can do it in vscode settings.

If that Logo comp(styled comp) was to be reused in other portions of website, then what we would do is we would drop that Logo styled comp, into
it's own file or it's own comp. So you can see the styled comps that we have in styles folder.

For example if you have a Form styled component, instead of using a regular <form> tag, we can use a styled comp <Form> tag and it still takes or
accepts all of the regular attrs and props that you used to send to a <form> tag, why?
Because we used styled.form`` and in here, form is the native html <form> element.

Some people say ALWAYS put your styled comps in a separate file, but the wes's approaching way is at first, he just defines the styles IN
the component file where he used that styled comp and then as he finds EITHER it's(that styled comp) getting too big in that one comp(regular comp),
or he needs to reuse that style in 6 or 7 or even 2 different places in the website, then we would move it to it's own file and in that file, export
it and where we need it, import it like a regular comp.

Let's make another styled comp for <header> in Header comp. Wes, usually likes to put 'styles' text on the end of name of styled comp, so that it
notes to us that it's a STYLED comp and not a regular react comp.
Now replace the native <header> tag with the <HeaderStyles> styled component.
So with styled comps, we don't change the markup but we do change which css is being apply to it.
When you have:
EX)
const HeaderStyles = styled.header`
  .bar {

  }
`;

in .bar there, you're defining the css or styles for the .bar class INSIDE of HeaderStyles styled component.

Learn: In css or sass, when you have: var(--black, black) it means use the variable --black or fallback to regular css black color.

Styled comps does have the ability to do like theme variables, but with native css variables(var(--<variable>) wes hasn't found need for that
specific thing(theme variables of styled comps). Therefore we just use native css variables.

For now we don't style for responsiveness, we'll come back for it.

Currently we have a problem and that is when you reload the page, in the BEGINNING, it doesn't have any styles but after a brief moment, the
styles are applied to the page(flicker, where you get an un-styled page for just a second), we're gonna look at how to fix that with SSR.*/
/* 7.07 - Global Styles, Typography and Layout Styles:
We're gonna use scope styles(in contrast to GLOBAL styles) in 90% of our app, sometimes you do want global styles and the reason behind that is
sometimes you want to lay on a base before you go a head and build your website, so some basic stuff like colors and fonts and sizing of
items, that all needs to happen globally, so you're not left re-defining the same font-size a hundred times throughout your app.
In order to do that, use createGlobalStyle`` api inside of styled comps and then we simply just inject that into our app. We can do that via
Page.js and there, let's create some global styles. So: const GlobalStyles = ...; and inside backticks of createGlobalStyle``, we just
put any styles that we wanna be globally applied. So first, let's setup some variables.
You can set css variables on html tag or :root , you can literally set them anywhere, wes always put them on html.
Important: The benefit of putting them on :root {} is that you could reuse that css inside a stand alone svg element.
So because of this, I put them in :root, but wes put them in html selector.
I intentailly wrote:  --gray: var(--grey); because that way if you accidentally typed the wrong gray variable it would just back up to the right
one which is grey, also I did this little trick with lightGrey.
--bs is abbreviation of box-shadow. Why?
Because every time you add a box-shadow to sth, if you change it slightly different than other used box-shadows, your app would start to look
like funcky and you don't know why. Also remember to don't put that box-shadow value inside quotes like it's a string, it's not a string,
it's a css property so don't put quotes around it's value.

Now you can remove the fallback values of black variable(where you have: var(--black, black);) in Header file, but you can keep them as well,
that doesn't hurt.

In order to use globalStyles which you assigned it to a variable, you can go to Page comp and inject that globalStyles, I did it above <Header /> which
for doing that we use: <GlobalStyles />

That was our first set of global styles. Now we need some fonts too. For that, write this template for @font-face first and I did it above the
GlobalStyles in Page comp:
@font-face {
    font-family: '';
    src: url();
}
and then put your own values there.

Almost always in js land when you building a websites you're not referencing just static files, but in the case of your fonts, we WILL be doing that
and you can see that they are stuck in public/static folder, so do that in src prop of @font-face .

Now that you specified your font, you need to use it or set it, on body tag. So select body tag and use font-family property there and for it's
value write:
body {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
}

That's a good font stack. We try to use that --apple-system first and then right in the beginning, put the NEW font that we just set earlier which is
'radnika_next'.

Now let's do some reset. Now you could import normalize.css or you can write a couple resets yourself. So go to html tag and set some rests which are:
box-sizing: border-box;
Then another reset is to grab: *, *::before, *::after then set their box-sizing to inherit.
Wes used one colon for before and after pseudo element which is for css2 not css3, so I used 2 colons instead. Then there you say:
box-sizing: inherit; and that's how we make sure when we add padding and border to an element it takes away from the size instead of growing
it and that's how you get a lot of those weird horizontal scroll bugs. So to avoid that we set the box-sizing of all elements and all of
pseudo elements to inherit, in order to inherit the box-sizing of html tag.
Another reset is to go to body tag and set padding and margin to 0 and set a default font-size and line-height there.

Then we can style all of our links by using 'a' element selector.

Important: You also have to select your button(it's better to select all buttons with button element selector) and apply the font-family
 to it, because for whatever reason setting a font(font-family) on the body, does NOT also apply to buttons, which is odd, therefore
 we have to put that whole font-family stack that we set on body, ALSO on the button selector.

That was all of our global styles and they've been injected into our Page comp.

Now we want to style whatever is wrapped around {children} in Page component, so we can constraint them with, and I call that: innerStyles. So
create a styled component for that called innerStyles. Now put your {children} in Page component, INSIDE <InnerStyles> styled component.

So now, in Page component, we got our <GlobalStyles /> styled comp, then <Header /> and then the <InnerStyles /> which is where all of the
content that goes there. */
/* 8.08 - Visualizing Route Changes:
We need a package called nprogress. So go to _app.js file and first thing we need to do is to import the styles for nprogress and also
remember that nprogress package also ships all the styles for you, so you can import it from 'nprogress/styles.css'. But in future, we need
to swap to our OWN styles. So you can write a TODO in above that import statement to swap that nprogress styles with our own styles.

After doing that, that would immediately break and the error says: 'Error was not caught TypeError: Cannot read property 'parentNode' of null' OR
sth like(for wes was this): Error was not caught TypeError: can't access property "parentNode", anchorElement is null. If it broke for you,
the reason behind that is because we haven't un-comment that <Head />. So we should write it and not comment it at the first place, that was the
wes's mistake!!! So put the <Head /> in _document in the first place(from the beginning of writing code).

After doing that, we have still another error(actually an error) which says:
Warning: Prop `className` did not match. Server: "sc-dlfnbm bjPHvD" Client: "sc-bdfBwQ bEVSek", don't worry about that, we're gonna
fix that in the next lesson.

Then write: import NProgress from 'ngprogress' in the _app file and put it on top of: import Page from '../components/....'; .
NProgress itself has couple of methods, it can start, can set to a certain amount with .set() and ... . So we're gonna start() it as soon as
a link starts and finish it when the page transition is done. So go to _app and we need to import the Router from nextjs so that we can hook
into a couple events that they have and put it on top of: import Page from ... .

Important: Put import statements of installed packages, ON TOP OF import statements of your OWN components and ..., in your files, like what I
 did in _app file.

In Router.events.on(); , the first arg you pass to .on() is the event that you want to listen and the second arg is a function that would be
executed when that event which we're listening to, happens.

Now let's swap the default NProgress styles with our OWN custom ngprogress css which is inside components/styles folder and it's not really a
component, it's just a .css file.

Initially wes bos had that nprogress.css file in the public/static folder, but it's better to import into our app. So get rid of that
default import of nprogress css.

Very rarely we do need to hook into the nextjs's Router, unless we want to either listen for events or programmatically change the page.

That was how we implement NProgress in nextjs.

9.09 - Fixing Styled Components Flicker on Server Render:
*/

