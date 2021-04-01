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
 */


