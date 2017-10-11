//
// ─── WELCOME TO REFLECTJS ───────────────────────────────────────────────────────
// Reflect JS is a template syntax builder that parses everything in browser
// It is a lightweight version of the popular Angular/Vue/React
// This library is still in development and not production worthy
//


$(function () {


    function init() {

    }

    function destructure() {
        var one = ["foo", "bar", "baz"];

        var [foo, bar, baz] = one;

        console.log(foo, bar, baz);
    }

    function arrows() {
        var items = [1, 2, 3, 4];

        items.map(thing => console.log(thing));
    }

    function proxy(obj) {
        var proxy = new Proxy(obj, {});
    }

    function literal() {}

    class person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        get both() {
            return this.age;
        }

    }

    var user = new person(2, 3);
    user.set('name', 'blake');
});