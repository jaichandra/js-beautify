/*
    AUTO-GENERATED. DO NOT MODIFY.
    Script: test/generate-tests.js
    Template: test/data/html/node.mustache
    Data: test/data/html/tests.js
*/
/*jshint unused:false */

function run_html_tests(test_obj, Urlencoded, js_beautify, html_beautify, css_beautify)
{

    var default_opts = {
        indent_size: 4,
        indent_char: ' ',
        preserve_newlines: true,
        jslint_happy: false,
        keep_array_indentation: false,
        brace_style: 'collapse',
        space_before_conditional: true,
        break_chained_methods: false,
        selector_separator: '\n',
        end_with_newline: false
    };
    var opts;

    default_opts.indent_size = 4;
    default_opts.indent_char = ' ';
    default_opts.indent_with_tabs = false;
    default_opts.preserve_newlines = true;
    default_opts.jslint_happy = false;
    default_opts.keep_array_indentation = false;
    default_opts.brace_style = 'collapse';
    default_opts.extra_liners = ['html', 'head', '/html'];

    function reset_options()
    {
        opts = JSON.parse(JSON.stringify(default_opts));
    }

    function test_html_beautifier(input)
    {
        return html_beautify(input, opts);
    }

    var sanitytest;

    // test the input on beautifier with the current flag settings
    // does not check the indentation / surroundings as bt() does
    function test_fragment(input, expected)
    {
        expected = expected || expected === '' ? expected : input;
        sanitytest.expect(input, expected);
        // if the expected is different from input, run it again
        // expected output should be unchanged when run twice.
        if (expected !== input) {
            sanitytest.expect(expected, expected);
        }

        // Everywhere we do newlines, they should be replaced with opts.eol
        opts.eol = '\r\n';
        expected = expected.replace(/[\n]/g, '\r\n');
        sanitytest.expect(input, expected);
        input = input.replace(/[\n]/g, '\r\n');
        sanitytest.expect(input, expected);
        opts.eol = '\n';
    }

    // test html
    function bth(input, expectation)
    {
        var wrapped_input, wrapped_expectation, field_input, field_expectation;

        expectation = expectation || expectation === '' ? expectation : input;
        sanitytest.test_function(test_html_beautifier, 'html_beautify');
        test_fragment(input, expectation);

        if (opts.indent_size === 4 && input) {
            wrapped_input = '<div>\n' + input.replace(/^(.+)$/mg, '    $1') + '\n    <span>inline</span>\n</div>';
            wrapped_expectation = '<div>\n' + expectation.replace(/^(.+)$/mg, '    $1') + '\n    <span>inline</span>\n</div>';
            test_fragment(wrapped_input, wrapped_expectation);
        }
    }

    function unicode_char(value) {
        return String.fromCharCode(value);
    }

    function beautifier_tests()
    {
        sanitytest = test_obj;

        reset_options();
        //============================================================
        bth('');


        reset_options();
        //============================================================
        // Handle inline and block elements differently - ()
        test_fragment(
            '<body><h1>Block</h1></body>',
            '<body>\n' +
            '    <h1>Block</h1>\n' +
            '</body>');
        test_fragment('<body><i>Inline</i></body>');


        reset_options();
        //============================================================
        // End With Newline - (eof = "\n")
        opts.end_with_newline = true;
        test_fragment('', '\n');
        test_fragment('<div></div>', '<div></div>\n');
        test_fragment('\n');

        // End With Newline - (eof = "")
        opts.end_with_newline = false;
        test_fragment('');
        test_fragment('<div></div>');
        test_fragment('\n', '');


        reset_options();
        //============================================================
        // Custom Extra Liners (empty) - ()
        opts.extra_liners = [];
        test_fragment('<html><head><meta></head><body><div><p>x</p></div></body></html>', '<html>\n<head>\n    <meta>\n</head>\n<body>\n    <div>\n        <p>x</p>\n    </div>\n</body>\n</html>');


        reset_options();
        //============================================================
        // Custom Extra Liners (default) - ()
        opts.extra_liners = null;
        test_fragment('<html><head></head><body></body></html>', '<html>\n\n<head></head>\n\n<body></body>\n\n</html>');


        reset_options();
        //============================================================
        // Custom Extra Liners (p, string) - ()
        opts.extra_liners = 'p,/p';
        test_fragment('<html><head><meta></head><body><div><p>x</p></div></body></html>', '<html>\n<head>\n    <meta>\n</head>\n<body>\n    <div>\n\n        <p>x\n\n        </p>\n    </div>\n</body>\n</html>');


        reset_options();
        //============================================================
        // Custom Extra Liners (p) - ()
        opts.extra_liners = ['p', '/p'];
        test_fragment('<html><head><meta></head><body><div><p>x</p></div></body></html>', '<html>\n<head>\n    <meta>\n</head>\n<body>\n    <div>\n\n        <p>x\n\n        </p>\n    </div>\n</body>\n</html>');


        reset_options();
        //============================================================
        // Tests for script and style types (issue 453, 821
        bth(
            '<script type="text/unknown"><div></div></script>',
            '<script type="text/unknown">\n' +
            '    <div></div>\n' +
            '</script>');
        bth(
            '<script type="text/javascript"><div></div></script>',
            '<script type="text/javascript">\n' +
            '    < div > < /div>\n' +
            '</script>');
        bth(
            '<script><div></div></script>',
            '<script>\n' +
            '    < div > < /div>\n' +
            '</script>');
        bth(
            '<script>var foo = "bar";</script>',
            '<script>\n' +
            '    var foo = "bar";\n' +
            '</script>');
        bth(
            '<script type="text/javascript">var foo = "bar";</script>',
            '<script type="text/javascript">\n' +
            '    var foo = "bar";\n' +
            '</script>');
        bth(
            '<script type="application/javascript">var foo = "bar";</script>',
            '<script type="application/javascript">\n' +
            '    var foo = "bar";\n' +
            '</script>');
        bth(
            '<script type="application/javascript;version=1.8">var foo = "bar";</script>',
            '<script type="application/javascript;version=1.8">\n' +
            '    var foo = "bar";\n' +
            '</script>');
        bth(
            '<script type="application/x-javascript">var foo = "bar";</script>',
            '<script type="application/x-javascript">\n' +
            '    var foo = "bar";\n' +
            '</script>');
        bth(
            '<script type="application/ecmascript">var foo = "bar";</script>',
            '<script type="application/ecmascript">\n' +
            '    var foo = "bar";\n' +
            '</script>');
        bth(
            '<script type="dojo/aspect">this.domNode.style.display="none";</script>',
            '<script type="dojo/aspect">\n' +
            '    this.domNode.style.display = "none";\n' +
            '</script>');
        bth(
            '<script type="dojo/method">this.domNode.style.display="none";</script>',
            '<script type="dojo/method">\n' +
            '    this.domNode.style.display = "none";\n' +
            '</script>');
        bth(
            '<script type="text/javascript1.5">var foo = "bar";</script>',
            '<script type="text/javascript1.5">\n' +
            '    var foo = "bar";\n' +
            '</script>');
        bth(
            '<script type="application/json">{"foo":"bar"}</script>',
            '<script type="application/json">\n' +
            '    {\n' +
            '        "foo": "bar"\n' +
            '    }\n' +
            '</script>');
        bth(
            '<script type="application/ld+json">{"foo":"bar"}</script>',
            '<script type="application/ld+json">\n' +
            '    {\n' +
            '        "foo": "bar"\n' +
            '    }\n' +
            '</script>');
        bth(
            '<style type="text/unknown"><tag></tag></style>',
            '<style type="text/unknown">\n' +
            '    <tag></tag>\n' +
            '</style>');
        bth(
            '<style type="text/css"><tag></tag></style>',
            '<style type="text/css">\n' +
            '    <tag></tag>\n' +
            '</style>');
        bth(
            '<style><tag></tag></style>',
            '<style>\n' +
            '    <tag></tag>\n' +
            '</style>');
        bth(
            '<style>.selector {font-size:12px;}</style>',
            '<style>\n' +
            '    .selector {\n' +
            '        font-size: 12px;\n' +
            '    }\n' +
            '</style>');
        bth(
            '<style type="text/css">.selector {font-size:12px;}</style>',
            '<style type="text/css">\n' +
            '    .selector {\n' +
            '        font-size: 12px;\n' +
            '    }\n' +
            '</style>');


        reset_options();
        //============================================================
        // Attribute Wrap - (indent_attr = "\n    ", indent_over80 = "\n    ")
        opts.wrap_attributes = 'force';
        test_fragment('<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>', '<div attr0\n    attr1="123"\n    data-attr2="hello    t here">This is some text</div>');
        test_fragment('<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>', '<div lookatthissuperduperlongattributenamewhoahcrazy0="true"\n    attr0\n    attr1="123"\n    data-attr2="hello    t here"\n    heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment('<img attr0 attr1="123" data-attr2="hello    t here"/>', '<img attr0\n    attr1="123"\n    data-attr2="hello    t here" />');
        test_fragment('<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>', '<?xml version="1.0" encoding="UTF-8" ?>\n<root attr1="foo"\n    attr2="bar" />');
        test_fragment('<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">', '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n    rel="stylesheet"\n    type="text/css">');

        // Attribute Wrap - (indent_attr = "\n    ", indent_over80 = "\n    ")
        opts.wrap_attributes = 'force';
        opts.wrap_line_length = 80;
        test_fragment('<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>', '<div attr0\n    attr1="123"\n    data-attr2="hello    t here">This is some text</div>');
        test_fragment('<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>', '<div lookatthissuperduperlongattributenamewhoahcrazy0="true"\n    attr0\n    attr1="123"\n    data-attr2="hello    t here"\n    heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment('<img attr0 attr1="123" data-attr2="hello    t here"/>', '<img attr0\n    attr1="123"\n    data-attr2="hello    t here" />');
        test_fragment('<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>', '<?xml version="1.0" encoding="UTF-8" ?>\n<root attr1="foo"\n    attr2="bar" />');
        test_fragment('<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">', '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n    rel="stylesheet"\n    type="text/css">');

        // Attribute Wrap - (indent_attr = "\n        ", indent_over80 = "\n        ")
        opts.wrap_attributes = 'force';
        opts.wrap_attributes_indent_size = 8;
        test_fragment('<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>', '<div attr0\n        attr1="123"\n        data-attr2="hello    t here">This is some text</div>');
        test_fragment('<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>', '<div lookatthissuperduperlongattributenamewhoahcrazy0="true"\n        attr0\n        attr1="123"\n        data-attr2="hello    t here"\n        heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment('<img attr0 attr1="123" data-attr2="hello    t here"/>', '<img attr0\n        attr1="123"\n        data-attr2="hello    t here" />');
        test_fragment('<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>', '<?xml version="1.0" encoding="UTF-8" ?>\n<root attr1="foo"\n        attr2="bar" />');
        test_fragment('<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">', '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n        rel="stylesheet"\n        type="text/css">');

        // Attribute Wrap - (indent_attr = " ", indent_over80 = "\n")
        opts.wrap_attributes = 'auto';
        opts.wrap_line_length = 80;
        opts.wrap_attributes_indent_size = 0;
        test_fragment('<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>');
        test_fragment('<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>', '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here"\nheymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment('<img attr0 attr1="123" data-attr2="hello    t here"/>', '<img attr0 attr1="123" data-attr2="hello    t here" />');
        test_fragment('<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>', '<?xml version="1.0" encoding="UTF-8" ?>\n<root attr1="foo" attr2="bar" />');
        test_fragment('<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">', '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\nrel="stylesheet" type="text/css">');

        // Attribute Wrap - (indent_attr = " ", indent_over80 = "\n    ")
        opts.wrap_attributes = 'auto';
        opts.wrap_line_length = 80;
        opts.wrap_attributes_indent_size = 4;
        test_fragment('<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>');
        test_fragment('<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>', '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here"\n    heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment('<img attr0 attr1="123" data-attr2="hello    t here"/>', '<img attr0 attr1="123" data-attr2="hello    t here" />');
        test_fragment('<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>', '<?xml version="1.0" encoding="UTF-8" ?>\n<root attr1="foo" attr2="bar" />');
        test_fragment('<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">', '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n    rel="stylesheet" type="text/css">');

        // Attribute Wrap - (indent_attr = " ", indent_over80 = " ")
        opts.wrap_attributes = 'auto';
        opts.wrap_line_length = 0;
        test_fragment('<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>');
        test_fragment('<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment('<img attr0 attr1="123" data-attr2="hello    t here"/>', '<img attr0 attr1="123" data-attr2="hello    t here" />');
        test_fragment('<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>', '<?xml version="1.0" encoding="UTF-8" ?>\n<root attr1="foo" attr2="bar" />');
        test_fragment('<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">');

        // Attribute Wrap - (indent_attr = "\n     ", indent_attr_faligned = " ", indent_over80 = "\n     ")
        opts.wrap_attributes = 'force-aligned';
        test_fragment('<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>', '<div attr0\n     attr1="123"\n     data-attr2="hello    t here">This is some text</div>');
        test_fragment('<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>', '<div lookatthissuperduperlongattributenamewhoahcrazy0="true"\n     attr0\n     attr1="123"\n     data-attr2="hello    t here"\n     heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment('<img attr0 attr1="123" data-attr2="hello    t here"/>', '<img attr0\n     attr1="123"\n     data-attr2="hello    t here" />');
        test_fragment('<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>', '<?xml version="1.0" encoding="UTF-8" ?>\n<root attr1="foo"\n      attr2="bar" />');
        test_fragment('<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">', '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n      rel="stylesheet"\n      type="text/css">');

        // Attribute Wrap - (indent_attr = "\n     ", indent_attr_faligned = " ", indent_over80 = "\n     ")
        opts.wrap_attributes = 'force-aligned';
        opts.wrap_line_length = 80;
        test_fragment('<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>', '<div attr0\n     attr1="123"\n     data-attr2="hello    t here">This is some text</div>');
        test_fragment('<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>', '<div lookatthissuperduperlongattributenamewhoahcrazy0="true"\n     attr0\n     attr1="123"\n     data-attr2="hello    t here"\n     heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment('<img attr0 attr1="123" data-attr2="hello    t here"/>', '<img attr0\n     attr1="123"\n     data-attr2="hello    t here" />');
        test_fragment('<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>', '<?xml version="1.0" encoding="UTF-8" ?>\n<root attr1="foo"\n      attr2="bar" />');
        test_fragment('<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">', '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n      rel="stylesheet"\n      type="text/css">');

        // Attribute Wrap - (indent_attr = "\n     ", indent_attr_faligned = " ", indent_over80 = "\n     ")
        opts.wrap_attributes = 'force-aligned';
        opts.wrap_attributes_indent_size = 8;
        test_fragment('<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>', '<div attr0\n     attr1="123"\n     data-attr2="hello    t here">This is some text</div>');
        test_fragment('<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>', '<div lookatthissuperduperlongattributenamewhoahcrazy0="true"\n     attr0\n     attr1="123"\n     data-attr2="hello    t here"\n     heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment('<img attr0 attr1="123" data-attr2="hello    t here"/>', '<img attr0\n     attr1="123"\n     data-attr2="hello    t here" />');
        test_fragment('<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>', '<?xml version="1.0" encoding="UTF-8" ?>\n<root attr1="foo"\n      attr2="bar" />');
        test_fragment('<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">', '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n      rel="stylesheet"\n      type="text/css">');


        reset_options();
        //============================================================
        // Handlebars Indenting Off
        opts.indent_handlebars = false;
        test_fragment(
            '{{#if 0}}\n    <div>\n    </div>\n{{/if}}',
            '{{#if 0}}\n<div>\n</div>\n{{/if}}');
        test_fragment(
            '<div>\n{{#each thing}}\n    {{name}}\n{{/each}}\n</div>',
            '<div>\n    {{#each thing}} {{name}} {{/each}}\n</div>');


        reset_options();
        //============================================================
        // Handlebars Indenting On - (content = "{{field}}")
        opts.indent_handlebars = true;
        test_fragment('{{page-title}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment('{{#if 0}}{{field}}{{/if}}');
        test_fragment('{{#if 0}}\n{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{field}}{{/if}}',
            '{{#if words}}{{field}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{field}}{{/if}}',
            '{{#if words}}{{field}}{{/if}}');
        test_fragment('{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n<div>\n</div>\n{{/if}}',
            '{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment('<div>\n    {{#if 1}}\n    {{/if}}\n</div>');
        test_fragment(
            '<div>\n{{#if 1}}\n{{/if}}\n</div>',
            '<div>\n    {{#if 1}}\n    {{/if}}\n</div>');
        test_fragment(
            '{{#if}}\n{{#each}}\n{{#if}}\n{{field}}\n{{/if}}\n{{#if}}\n{{field}}\n{{/if}}\n{{/each}}\n{{/if}}',
            '{{#if}}\n    {{#each}}\n        {{#if}}\n            {{field}}\n        {{/if}}\n        {{#if}}\n            {{field}}\n        {{/if}}\n    {{/each}}\n{{/if}}');
        test_fragment('{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n    {{field}}\n    {{else}}\n    {{field}}\n{{/if}}',
            '{{#if 1}}\n    {{field}}\n{{else}}\n    {{field}}\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n    {{else}}\n    {{/if}}',
            '{{#if 1}}\n{{else}}\n{{/if}}');
        test_fragment(
            '{{#if thing}}\n{{#if otherthing}}\n    {{field}}\n    {{else}}\n{{field}}\n    {{/if}}\n       {{else}}\n{{field}}\n{{/if}}',
            '{{#if thing}}\n    {{#if otherthing}}\n        {{field}}\n    {{else}}\n        {{field}}\n    {{/if}}\n{{else}}\n    {{field}}\n{{/if}}');
        test_fragment(
            '<div{{somestyle}}></div>',
            '<div {{somestyle}}></div>');
        test_fragment(
            '<div{{#if test}}class="foo"{{/if}}>{{field}}</div>',
            '<div {{#if test}} class="foo" {{/if}}>{{field}}</div>');
        test_fragment(
            '<div{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>{{field}}</div>',
            '<div {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>{{field}}</div>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>{{field}}</span>',
            '<span {{#if condition}} class="foo" {{/if}}>{{field}}</span>');
        test_fragment('<div unformatted="{{#if}}{{field}}{{/if}}">{{field}}</div>');
        test_fragment('<div unformatted="{{#if  }}    {{field}}{{/if}}">{{field}}</div>');
        test_fragment('<div class="{{#if thingIs "value"}}{{field}}{{/if}}"></div>');
        test_fragment('<div class="{{#if thingIs \'value\'}}{{field}}{{/if}}"></div>');
        test_fragment('<div class=\'{{#if thingIs "value"}}{{field}}{{/if}}\'></div>');
        test_fragment('<div class=\'{{#if thingIs \'value\'}}{{field}}{{/if}}\'></div>');

        // Handlebars Indenting On - (content = "{{! comment}}")
        opts.indent_handlebars = true;
        test_fragment('{{page-title}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment('{{#if 0}}{{! comment}}{{/if}}');
        test_fragment('{{#if 0}}\n{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{! comment}}{{/if}}',
            '{{#if words}}{{! comment}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{! comment}}{{/if}}',
            '{{#if words}}{{! comment}}{{/if}}');
        test_fragment('{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n<div>\n</div>\n{{/if}}',
            '{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment('<div>\n    {{#if 1}}\n    {{/if}}\n</div>');
        test_fragment(
            '<div>\n{{#if 1}}\n{{/if}}\n</div>',
            '<div>\n    {{#if 1}}\n    {{/if}}\n</div>');
        test_fragment(
            '{{#if}}\n{{#each}}\n{{#if}}\n{{! comment}}\n{{/if}}\n{{#if}}\n{{! comment}}\n{{/if}}\n{{/each}}\n{{/if}}',
            '{{#if}}\n    {{#each}}\n        {{#if}}\n            {{! comment}}\n        {{/if}}\n        {{#if}}\n            {{! comment}}\n        {{/if}}\n    {{/each}}\n{{/if}}');
        test_fragment('{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n    {{! comment}}\n    {{else}}\n    {{! comment}}\n{{/if}}',
            '{{#if 1}}\n    {{! comment}}\n{{else}}\n    {{! comment}}\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n    {{else}}\n    {{/if}}',
            '{{#if 1}}\n{{else}}\n{{/if}}');
        test_fragment(
            '{{#if thing}}\n{{#if otherthing}}\n    {{! comment}}\n    {{else}}\n{{! comment}}\n    {{/if}}\n       {{else}}\n{{! comment}}\n{{/if}}',
            '{{#if thing}}\n    {{#if otherthing}}\n        {{! comment}}\n    {{else}}\n        {{! comment}}\n    {{/if}}\n{{else}}\n    {{! comment}}\n{{/if}}');
        test_fragment(
            '<div{{somestyle}}></div>',
            '<div {{somestyle}}></div>');
        test_fragment(
            '<div{{#if test}}class="foo"{{/if}}>{{! comment}}</div>',
            '<div {{#if test}} class="foo" {{/if}}>{{! comment}}</div>');
        test_fragment(
            '<div{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>{{! comment}}</div>',
            '<div {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>{{! comment}}</div>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>{{! comment}}</span>',
            '<span {{#if condition}} class="foo" {{/if}}>{{! comment}}</span>');
        test_fragment('<div unformatted="{{#if}}{{! comment}}{{/if}}">{{! comment}}</div>');
        test_fragment('<div unformatted="{{#if  }}    {{! comment}}{{/if}}">{{! comment}}</div>');
        test_fragment('<div class="{{#if thingIs "value"}}{{! comment}}{{/if}}"></div>');
        test_fragment('<div class="{{#if thingIs \'value\'}}{{! comment}}{{/if}}"></div>');
        test_fragment('<div class=\'{{#if thingIs "value"}}{{! comment}}{{/if}}\'></div>');
        test_fragment('<div class=\'{{#if thingIs \'value\'}}{{! comment}}{{/if}}\'></div>');

        // Handlebars Indenting On - (content = "{{!-- comment--}}")
        opts.indent_handlebars = true;
        test_fragment('{{page-title}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment('{{#if 0}}{{!-- comment--}}{{/if}}');
        test_fragment('{{#if 0}}\n{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{!-- comment--}}{{/if}}',
            '{{#if words}}{{!-- comment--}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{!-- comment--}}{{/if}}',
            '{{#if words}}{{!-- comment--}}{{/if}}');
        test_fragment('{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n<div>\n</div>\n{{/if}}',
            '{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment('<div>\n    {{#if 1}}\n    {{/if}}\n</div>');
        test_fragment(
            '<div>\n{{#if 1}}\n{{/if}}\n</div>',
            '<div>\n    {{#if 1}}\n    {{/if}}\n</div>');
        test_fragment(
            '{{#if}}\n{{#each}}\n{{#if}}\n{{!-- comment--}}\n{{/if}}\n{{#if}}\n{{!-- comment--}}\n{{/if}}\n{{/each}}\n{{/if}}',
            '{{#if}}\n    {{#each}}\n        {{#if}}\n            {{!-- comment--}}\n        {{/if}}\n        {{#if}}\n            {{!-- comment--}}\n        {{/if}}\n    {{/each}}\n{{/if}}');
        test_fragment('{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n    {{!-- comment--}}\n    {{else}}\n    {{!-- comment--}}\n{{/if}}',
            '{{#if 1}}\n    {{!-- comment--}}\n{{else}}\n    {{!-- comment--}}\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n    {{else}}\n    {{/if}}',
            '{{#if 1}}\n{{else}}\n{{/if}}');
        test_fragment(
            '{{#if thing}}\n{{#if otherthing}}\n    {{!-- comment--}}\n    {{else}}\n{{!-- comment--}}\n    {{/if}}\n       {{else}}\n{{!-- comment--}}\n{{/if}}',
            '{{#if thing}}\n    {{#if otherthing}}\n        {{!-- comment--}}\n    {{else}}\n        {{!-- comment--}}\n    {{/if}}\n{{else}}\n    {{!-- comment--}}\n{{/if}}');
        test_fragment(
            '<div{{somestyle}}></div>',
            '<div {{somestyle}}></div>');
        test_fragment(
            '<div{{#if test}}class="foo"{{/if}}>{{!-- comment--}}</div>',
            '<div {{#if test}} class="foo" {{/if}}>{{!-- comment--}}</div>');
        test_fragment(
            '<div{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>{{!-- comment--}}</div>',
            '<div {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>{{!-- comment--}}</div>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>{{!-- comment--}}</span>',
            '<span {{#if condition}} class="foo" {{/if}}>{{!-- comment--}}</span>');
        test_fragment('<div unformatted="{{#if}}{{!-- comment--}}{{/if}}">{{!-- comment--}}</div>');
        test_fragment('<div unformatted="{{#if  }}    {{!-- comment--}}{{/if}}">{{!-- comment--}}</div>');
        test_fragment('<div class="{{#if thingIs "value"}}{{!-- comment--}}{{/if}}"></div>');
        test_fragment('<div class="{{#if thingIs \'value\'}}{{!-- comment--}}{{/if}}"></div>');
        test_fragment('<div class=\'{{#if thingIs "value"}}{{!-- comment--}}{{/if}}\'></div>');
        test_fragment('<div class=\'{{#if thingIs \'value\'}}{{!-- comment--}}{{/if}}\'></div>');

        // Handlebars Indenting On - (content = "{pre{{field1}} {{field2}} {{field3}}post")
        opts.indent_handlebars = true;
        test_fragment('{{page-title}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment('{{#if 0}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}');
        test_fragment('{{#if 0}}\n{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}',
            '{{#if words}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}');
        test_fragment(
            '{{#if     words}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}',
            '{{#if words}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}');
        test_fragment('{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n<div>\n</div>\n{{/if}}',
            '{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment('<div>\n    {{#if 1}}\n    {{/if}}\n</div>');
        test_fragment(
            '<div>\n{{#if 1}}\n{{/if}}\n</div>',
            '<div>\n    {{#if 1}}\n    {{/if}}\n</div>');
        test_fragment(
            '{{#if}}\n{{#each}}\n{{#if}}\n{pre{{field1}} {{field2}} {{field3}}post\n{{/if}}\n{{#if}}\n{pre{{field1}} {{field2}} {{field3}}post\n{{/if}}\n{{/each}}\n{{/if}}',
            '{{#if}}\n    {{#each}}\n        {{#if}}\n            {pre{{field1}} {{field2}} {{field3}}post\n        {{/if}}\n        {{#if}}\n            {pre{{field1}} {{field2}} {{field3}}post\n        {{/if}}\n    {{/each}}\n{{/if}}');
        test_fragment('{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n    {pre{{field1}} {{field2}} {{field3}}post\n    {{else}}\n    {pre{{field1}} {{field2}} {{field3}}post\n{{/if}}',
            '{{#if 1}}\n    {pre{{field1}} {{field2}} {{field3}}post\n{{else}}\n    {pre{{field1}} {{field2}} {{field3}}post\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n    {{else}}\n    {{/if}}',
            '{{#if 1}}\n{{else}}\n{{/if}}');
        test_fragment(
            '{{#if thing}}\n{{#if otherthing}}\n    {pre{{field1}} {{field2}} {{field3}}post\n    {{else}}\n{pre{{field1}} {{field2}} {{field3}}post\n    {{/if}}\n       {{else}}\n{pre{{field1}} {{field2}} {{field3}}post\n{{/if}}',
            '{{#if thing}}\n    {{#if otherthing}}\n        {pre{{field1}} {{field2}} {{field3}}post\n    {{else}}\n        {pre{{field1}} {{field2}} {{field3}}post\n    {{/if}}\n{{else}}\n    {pre{{field1}} {{field2}} {{field3}}post\n{{/if}}');
        test_fragment(
            '<div{{somestyle}}></div>',
            '<div {{somestyle}}></div>');
        test_fragment(
            '<div{{#if test}}class="foo"{{/if}}>{pre{{field1}} {{field2}} {{field3}}post</div>',
            '<div {{#if test}} class="foo" {{/if}}>{pre{{field1}} {{field2}} {{field3}}post</div>');
        test_fragment(
            '<div{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>{pre{{field1}} {{field2}} {{field3}}post</div>',
            '<div {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>{pre{{field1}} {{field2}} {{field3}}post</div>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>{pre{{field1}} {{field2}} {{field3}}post</span>',
            '<span {{#if condition}} class="foo" {{/if}}>{pre{{field1}} {{field2}} {{field3}}post</span>');
        test_fragment('<div unformatted="{{#if}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}">{pre{{field1}} {{field2}} {{field3}}post</div>');
        test_fragment('<div unformatted="{{#if  }}    {pre{{field1}} {{field2}} {{field3}}post{{/if}}">{pre{{field1}} {{field2}} {{field3}}post</div>');
        test_fragment('<div class="{{#if thingIs "value"}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}"></div>');
        test_fragment('<div class="{{#if thingIs \'value\'}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}"></div>');
        test_fragment('<div class=\'{{#if thingIs "value"}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}\'></div>');
        test_fragment('<div class=\'{{#if thingIs \'value\'}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}\'></div>');

        // Handlebars Indenting On - (content = "{{! \n mult-line\ncomment  \n     with spacing\n}}")
        opts.indent_handlebars = true;
        test_fragment('{{page-title}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment('{{#if 0}}{{! \n mult-line\ncomment  \n     with spacing\n}}{{/if}}');
        test_fragment('{{#if 0}}\n{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{! \n mult-line\ncomment  \n     with spacing\n}}{{/if}}',
            '{{#if words}}{{! \n mult-line\ncomment  \n     with spacing\n}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{! \n mult-line\ncomment  \n     with spacing\n}}{{/if}}',
            '{{#if words}}{{! \n mult-line\ncomment  \n     with spacing\n}}{{/if}}');
        test_fragment('{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n<div>\n</div>\n{{/if}}',
            '{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment('<div>\n    {{#if 1}}\n    {{/if}}\n</div>');
        test_fragment(
            '<div>\n{{#if 1}}\n{{/if}}\n</div>',
            '<div>\n    {{#if 1}}\n    {{/if}}\n</div>');
        test_fragment(
            '{{#if}}\n{{#each}}\n{{#if}}\n{{! \n mult-line\ncomment  \n     with spacing\n}}\n{{/if}}\n{{#if}}\n{{! \n mult-line\ncomment  \n     with spacing\n}}\n{{/if}}\n{{/each}}\n{{/if}}',
            '{{#if}}\n    {{#each}}\n        {{#if}}\n            {{! \n mult-line\ncomment  \n     with spacing\n}}\n        {{/if}}\n        {{#if}}\n            {{! \n mult-line\ncomment  \n     with spacing\n}}\n        {{/if}}\n    {{/each}}\n{{/if}}');
        test_fragment('{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n    {{! \n mult-line\ncomment  \n     with spacing\n}}\n    {{else}}\n    {{! \n mult-line\ncomment  \n     with spacing\n}}\n{{/if}}',
            '{{#if 1}}\n    {{! \n mult-line\ncomment  \n     with spacing\n}}\n{{else}}\n    {{! \n mult-line\ncomment  \n     with spacing\n}}\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n    {{else}}\n    {{/if}}',
            '{{#if 1}}\n{{else}}\n{{/if}}');
        test_fragment(
            '{{#if thing}}\n{{#if otherthing}}\n    {{! \n mult-line\ncomment  \n     with spacing\n}}\n    {{else}}\n{{! \n mult-line\ncomment  \n     with spacing\n}}\n    {{/if}}\n       {{else}}\n{{! \n mult-line\ncomment  \n     with spacing\n}}\n{{/if}}',
            '{{#if thing}}\n    {{#if otherthing}}\n        {{! \n mult-line\ncomment  \n     with spacing\n}}\n    {{else}}\n        {{! \n mult-line\ncomment  \n     with spacing\n}}\n    {{/if}}\n{{else}}\n    {{! \n mult-line\ncomment  \n     with spacing\n}}\n{{/if}}');
        test_fragment(
            '<div{{somestyle}}></div>',
            '<div {{somestyle}}></div>');
        test_fragment(
            '<div{{#if test}}class="foo"{{/if}}>{{! \n mult-line\ncomment  \n     with spacing\n}}</div>',
            '<div {{#if test}} class="foo" {{/if}}>{{! \n mult-line\ncomment  \n     with spacing\n}}</div>');
        test_fragment(
            '<div{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>{{! \n mult-line\ncomment  \n     with spacing\n}}</div>',
            '<div {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>{{! \n mult-line\ncomment  \n     with spacing\n}}</div>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>{{! \n mult-line\ncomment  \n     with spacing\n}}</span>',
            '<span {{#if condition}} class="foo" {{/if}}>{{! \n mult-line\ncomment  \n     with spacing\n}}</span>');
        test_fragment('<div unformatted="{{#if}}{{! \n mult-line\ncomment  \n     with spacing\n}}{{/if}}">{{! \n mult-line\ncomment  \n     with spacing\n}}</div>');
        test_fragment('<div unformatted="{{#if  }}    {{! \n mult-line\ncomment  \n     with spacing\n}}{{/if}}">{{! \n mult-line\ncomment  \n     with spacing\n}}</div>');
        test_fragment('<div class="{{#if thingIs "value"}}{{! \n mult-line\ncomment  \n     with spacing\n}}{{/if}}"></div>');
        test_fragment('<div class="{{#if thingIs \'value\'}}{{! \n mult-line\ncomment  \n     with spacing\n}}{{/if}}"></div>');
        test_fragment('<div class=\'{{#if thingIs "value"}}{{! \n mult-line\ncomment  \n     with spacing\n}}{{/if}}\'></div>');
        test_fragment('<div class=\'{{#if thingIs \'value\'}}{{! \n mult-line\ncomment  \n     with spacing\n}}{{/if}}\'></div>');

        // Handlebars Indenting On - (content = "{{!-- \n mult-line\ncomment  \n     with spacing\n--}}")
        opts.indent_handlebars = true;
        test_fragment('{{page-title}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment('{{#if 0}}{{!-- \n mult-line\ncomment  \n     with spacing\n--}}{{/if}}');
        test_fragment('{{#if 0}}\n{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{!-- \n mult-line\ncomment  \n     with spacing\n--}}{{/if}}',
            '{{#if words}}{{!-- \n mult-line\ncomment  \n     with spacing\n--}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{!-- \n mult-line\ncomment  \n     with spacing\n--}}{{/if}}',
            '{{#if words}}{{!-- \n mult-line\ncomment  \n     with spacing\n--}}{{/if}}');
        test_fragment('{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n<div>\n</div>\n{{/if}}',
            '{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment('<div>\n    {{#if 1}}\n    {{/if}}\n</div>');
        test_fragment(
            '<div>\n{{#if 1}}\n{{/if}}\n</div>',
            '<div>\n    {{#if 1}}\n    {{/if}}\n</div>');
        test_fragment(
            '{{#if}}\n{{#each}}\n{{#if}}\n{{!-- \n mult-line\ncomment  \n     with spacing\n--}}\n{{/if}}\n{{#if}}\n{{!-- \n mult-line\ncomment  \n     with spacing\n--}}\n{{/if}}\n{{/each}}\n{{/if}}',
            '{{#if}}\n    {{#each}}\n        {{#if}}\n            {{!-- \n mult-line\ncomment  \n     with spacing\n--}}\n        {{/if}}\n        {{#if}}\n            {{!-- \n mult-line\ncomment  \n     with spacing\n--}}\n        {{/if}}\n    {{/each}}\n{{/if}}');
        test_fragment('{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n    {{!-- \n mult-line\ncomment  \n     with spacing\n--}}\n    {{else}}\n    {{!-- \n mult-line\ncomment  \n     with spacing\n--}}\n{{/if}}',
            '{{#if 1}}\n    {{!-- \n mult-line\ncomment  \n     with spacing\n--}}\n{{else}}\n    {{!-- \n mult-line\ncomment  \n     with spacing\n--}}\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n    {{else}}\n    {{/if}}',
            '{{#if 1}}\n{{else}}\n{{/if}}');
        test_fragment(
            '{{#if thing}}\n{{#if otherthing}}\n    {{!-- \n mult-line\ncomment  \n     with spacing\n--}}\n    {{else}}\n{{!-- \n mult-line\ncomment  \n     with spacing\n--}}\n    {{/if}}\n       {{else}}\n{{!-- \n mult-line\ncomment  \n     with spacing\n--}}\n{{/if}}',
            '{{#if thing}}\n    {{#if otherthing}}\n        {{!-- \n mult-line\ncomment  \n     with spacing\n--}}\n    {{else}}\n        {{!-- \n mult-line\ncomment  \n     with spacing\n--}}\n    {{/if}}\n{{else}}\n    {{!-- \n mult-line\ncomment  \n     with spacing\n--}}\n{{/if}}');
        test_fragment(
            '<div{{somestyle}}></div>',
            '<div {{somestyle}}></div>');
        test_fragment(
            '<div{{#if test}}class="foo"{{/if}}>{{!-- \n mult-line\ncomment  \n     with spacing\n--}}</div>',
            '<div {{#if test}} class="foo" {{/if}}>{{!-- \n mult-line\ncomment  \n     with spacing\n--}}</div>');
        test_fragment(
            '<div{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>{{!-- \n mult-line\ncomment  \n     with spacing\n--}}</div>',
            '<div {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>{{!-- \n mult-line\ncomment  \n     with spacing\n--}}</div>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>{{!-- \n mult-line\ncomment  \n     with spacing\n--}}</span>',
            '<span {{#if condition}} class="foo" {{/if}}>{{!-- \n mult-line\ncomment  \n     with spacing\n--}}</span>');
        test_fragment('<div unformatted="{{#if}}{{!-- \n mult-line\ncomment  \n     with spacing\n--}}{{/if}}">{{!-- \n mult-line\ncomment  \n     with spacing\n--}}</div>');
        test_fragment('<div unformatted="{{#if  }}    {{!-- \n mult-line\ncomment  \n     with spacing\n--}}{{/if}}">{{!-- \n mult-line\ncomment  \n     with spacing\n--}}</div>');
        test_fragment('<div class="{{#if thingIs "value"}}{{!-- \n mult-line\ncomment  \n     with spacing\n--}}{{/if}}"></div>');
        test_fragment('<div class="{{#if thingIs \'value\'}}{{!-- \n mult-line\ncomment  \n     with spacing\n--}}{{/if}}"></div>');
        test_fragment('<div class=\'{{#if thingIs "value"}}{{!-- \n mult-line\ncomment  \n     with spacing\n--}}{{/if}}\'></div>');
        test_fragment('<div class=\'{{#if thingIs \'value\'}}{{!-- \n mult-line\ncomment  \n     with spacing\n--}}{{/if}}\'></div>');

        // Handlebars Indenting On - (content = "{{!-- \n mult-line\ncomment \n{{#> component}}\n mult-line\ncomment  \n     with spacing\n {{/ component}}--}}")
        opts.indent_handlebars = true;
        test_fragment('{{page-title}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment('{{#if 0}}{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}{{/if}}');
        test_fragment('{{#if 0}}\n{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}{{/if}}',
            '{{#if words}}{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}{{/if}}',
            '{{#if words}}{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}{{/if}}');
        test_fragment('{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n<div>\n</div>\n{{/if}}',
            '{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment('<div>\n    {{#if 1}}\n    {{/if}}\n</div>');
        test_fragment(
            '<div>\n{{#if 1}}\n{{/if}}\n</div>',
            '<div>\n    {{#if 1}}\n    {{/if}}\n</div>');
        test_fragment(
            '{{#if}}\n{{#each}}\n{{#if}}\n{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}\n{{/if}}\n{{#if}}\n{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}\n{{/if}}\n{{/each}}\n{{/if}}',
            '{{#if}}\n    {{#each}}\n        {{#if}}\n            {{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}\n        {{/if}}\n        {{#if}}\n            {{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}\n        {{/if}}\n    {{/each}}\n{{/if}}');
        test_fragment('{{#if 1}}\n    <div>\n    </div>\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n    {{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}\n    {{else}}\n    {{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}\n{{/if}}',
            '{{#if 1}}\n    {{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}\n{{else}}\n    {{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}\n{{/if}}');
        test_fragment(
            '{{#if 1}}\n    {{else}}\n    {{/if}}',
            '{{#if 1}}\n{{else}}\n{{/if}}');
        test_fragment(
            '{{#if thing}}\n{{#if otherthing}}\n    {{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}\n    {{else}}\n{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}\n    {{/if}}\n       {{else}}\n{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}\n{{/if}}',
            '{{#if thing}}\n    {{#if otherthing}}\n        {{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}\n    {{else}}\n        {{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}\n    {{/if}}\n{{else}}\n    {{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}\n{{/if}}');
        test_fragment(
            '<div{{somestyle}}></div>',
            '<div {{somestyle}}></div>');
        test_fragment(
            '<div{{#if test}}class="foo"{{/if}}>{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}</div>',
            '<div {{#if test}} class="foo" {{/if}}>{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}</div>');
        test_fragment(
            '<div{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}</div>',
            '<div {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}</div>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}</span>',
            '<span {{#if condition}} class="foo" {{/if}}>{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}</span>');
        test_fragment('<div unformatted="{{#if}}{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}{{/if}}">{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}</div>');
        test_fragment('<div unformatted="{{#if  }}    {{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}{{/if}}">{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}</div>');
        test_fragment('<div class="{{#if thingIs "value"}}{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}{{/if}}"></div>');
        test_fragment('<div class="{{#if thingIs \'value\'}}{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}{{/if}}"></div>');
        test_fragment('<div class=\'{{#if thingIs "value"}}{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}{{/if}}\'></div>');
        test_fragment('<div class=\'{{#if thingIs \'value\'}}{{!-- \n mult-line\ncomment \n{{#&gt; component}}\n mult-line\ncomment  \n     with spacing\n {{&#x2F; component}}--}}{{/if}}\'></div>');


        reset_options();
        //============================================================
        // Handlebars Else tag indenting
        opts.indent_handlebars = true;
        test_fragment(
            '{{#if test}}<div></div>{{else}}<div></div>{{/if}}',
            '{{#if test}}\n    <div></div>\n{{else}}\n    <div></div>\n{{/if}}');
        test_fragment('{{#if test}}<span></span>{{else}}<span></span>{{/if}}');


        reset_options();
        //============================================================
        // Unclosed html elements
        test_fragment('<source>\n<source>');
        test_fragment('<br>\n<br>');
        test_fragment('<input>\n<input>');
        test_fragment('<meta>\n<meta>');
        test_fragment('<link>\n<link>');
        test_fragment('<colgroup>\n    <col>\n    <col>\n</colgroup>');


        reset_options();
        //============================================================
        // Unformatted tags
        test_fragment('<ol>\n    <li>b<pre>c</pre></li>\n</ol>');
        test_fragment('<ol>\n    <li>b<code>c</code></li>\n</ol>');
        test_fragment('<ul>\n    <li>\n        <span class="octicon octicon-person"></span>\n        <a href="/contact/">Kontakt</a>\n    </li>\n</ul>');
        test_fragment('<div class="searchform"><input type="text" value="" name="s" id="s" /><input type="submit" id="searchsubmit" value="Search" /></div>');
        test_fragment('<div class="searchform"><input type="text" value="" name="s" id="s"><input type="submit" id="searchsubmit" value="Search"></div>');


        reset_options();
        //============================================================
        // Php formatting
        test_fragment('<h1 class="content-page-header"><?=$view["name"]; ?></h1>', '<h1 class="content-page-header">\n    <?=$view["name"]; ?>\n</h1>');
        test_fragment(
            '<?php\n' +
            'for($i = 1; $i <= 100; $i++;) {\n' +
            '    #count to 100!\n' +
            '    echo($i . "</br>");\n' +
            '}\n' +
            '?>');
        test_fragment(
            '<?php ?>\n' +
            '<!DOCTYPE html>\n' +
            '\n' +
            '<html>\n' +
            '\n' +
            '<head></head>\n' +
            '\n' +
            '<body></body>\n' +
            '\n' +
            '</html>');


        reset_options();
        //============================================================
        // underscore.js  formatting
        test_fragment(
            '<div class="col-sm-9">\n' +
            '    <textarea id="notes" class="form-control" rows="3">\n' +
            '        <%= notes %>\n' +
            '    </textarea>\n' +
            '</div>');


        reset_options();
        //============================================================
        // Indent with tabs
        opts.indent_with_tabs = true;
        test_fragment(
            '<div>\n<div>\n</div>\n</div>',
            '<div>\n\t<div>\n\t</div>\n</div>');


        reset_options();
        //============================================================
        // Indent without tabs
        opts.indent_with_tabs = false;
        test_fragment(
            '<div>\n<div>\n</div>\n</div>',
            '<div>\n    <div>\n    </div>\n</div>');


        reset_options();
        //============================================================
        // Indent body inner html by default
        test_fragment('<html>\n<body>\n<div></div>\n</body>\n\n</html>', '<html>\n<body>\n    <div></div>\n</body>\n\n</html>');


        reset_options();
        //============================================================
        // indent_body_inner_html set to false prevents indent of body inner html
        opts.indent_body_inner_html = false;
        test_fragment('<html>\n<body>\n<div></div>\n</body>\n\n</html>');


        reset_options();
        //============================================================
        // Indent head inner html by default
        test_fragment('<html>\n\n<head>\n<meta>\n</head>\n\n</html>', '<html>\n\n<head>\n    <meta>\n</head>\n\n</html>');


        reset_options();
        //============================================================
        // indent_head_inner_html set to false prevents indent of head inner html
        opts.indent_head_inner_html = false;
        test_fragment('<html>\n\n<head>\n<meta>\n</head>\n\n</html>');


        reset_options();
        //============================================================
        // New Test Suite


    }

    function beautifier_unconverted_tests()
    {
        sanitytest = test_obj;

        reset_options();
        //============================================================
        opts.end_with_newline = true;
        test_fragment('', '\n');
        test_fragment('<div></div>\n');
        test_fragment('<div></div>\n\n\n', '<div></div>\n');
        test_fragment('<head>\n' +
            '    <script>\n' +
            '        mocha.setup("bdd");\n' +
            '\n' +
            '    </script>\n' +
            '</head>\n');


        opts.end_with_newline = false;
        // error cases need love too
        bth('<img title="Bad food!" src="foo.jpg" alt="Evil" ">');
        bth("<!-- don't blow up if a comment is not complete"); // -->

        test_fragment(
            '<head>\n' +
            '    <script>\n' +
            '        mocha.setup("bdd");\n' +
            '    </script>\n' +
            '</head>');

        test_fragment('<div></div>\n', '<div></div>');
        bth('<div></div>');
        bth('<div>content</div>');
        bth('<div><div></div></div>',
            '<div>\n' +
            '    <div></div>\n' +
            '</div>');
        bth('<div><div>content</div></div>',
            '<div>\n' +
            '    <div>content</div>\n' +
            '</div>');
        bth('<div>\n' +
            '    <span>content</span>\n' +
            '</div>');
        bth('<div>\n' +
            '</div>');
        bth('<div>\n' +
            '    content\n' +
            '</div>');
        bth('<div>\n' +
            '    </div>',
            '<div>\n' +
            '</div>');
        bth('    <div>\n' +
            '    </div>',
            '<div>\n' +
            '</div>');
        bth('<div>\n' +
            '</div>\n' +
            '    <div>\n' +
            '    </div>',
            '<div>\n' +
            '</div>\n' +
            '<div>\n' +
            '</div>');
        bth('    <div>\n' +
            '</div>',
            '<div>\n' +
            '</div>');
        bth('<div        >content</div>',
            '<div>content</div>');
        bth('<div     thinger="preserve  space  here"   ></div  >',
            '<div thinger="preserve  space  here"></div>');
        bth('content\n' +
            '    <div>\n' +
            '    </div>\n' +
            'content',
            'content\n' +
            '<div>\n' +
            '</div>\n' +
            'content');
        bth('<li>\n' +
            '    <div>\n' +
            '    </div>\n' +
            '</li>');
        bth('<li>\n' +
            '<div>\n' +
            '</div>\n' +
            '</li>',
            '<li>\n' +
            '    <div>\n' +
            '    </div>\n' +
            '</li>');
        bth('<li>\n' +
            '    content\n' +
            '</li>\n' +
            '<li>\n' +
            '    content\n' +
            '</li>');

        bth('<img>content');
        bth('<img> content');
        bth('<img>   content', '<img> content');

        bth('<img><img>content');
        bth('<img> <img>content');
        bth('<img>   <img>content', '<img> <img>content');

        bth('<img><b>content</b>');
        bth('<img> <b>content</b>');
        bth('<img>   <b>content</b>', '<img> <b>content</b>');

        bth('<div>content<img>content</div>');
        bth('<div> content <img> content</div>');
        bth('<div>    content <img>    content </div>',
            '<div> content <img> content </div>');
        bth('Text <a href="#">Link</a> Text');

        var unformatted = opts.unformatted;
        opts.unformatted = ['script', 'style'];
        bth('<script id="javascriptTemplate" type="text/x-kendo-template">\n' +
            '  <ul>\n' +
            '  # for (var i = 0; i < data.length; i++) { #\n' +
            '    <li>#= data[i] #</li>\n' +
            '  # } #\n' +
            '  </ul>\n' +
            '</script>');
        bth('<style>\n' +
            '  body {background-color:lightgrey}\n' +
            '  h1   {color:blue}\n' +
            '</style>');
        opts.unformatted = unformatted;

        unformatted = opts.unformatted;
        opts.unformatted = ['custom-element'];
        test_fragment('<div>should <custom-element>not</custom-element>' +
                      ' insert newlines</div>',
                      '<div>should <custom-element>not</custom-element>' +
                      ' insert newlines</div>');
        opts.unformatted = unformatted;

        // Tests that don't pass, but probably should.
        // bth('<div><span>content</span></div>');

        // Handlebars tests
        // Without the indent option on, handlebars are treated as content.

        opts.wrap_line_length = 0;
        //...---------1---------2---------3---------4---------5---------6---------7
        //...1234567890123456789012345678901234567890123456789012345678901234567890
        bth('<div>Some text that should not wrap at all.</div>',
            /* expected */
            '<div>Some text that should not wrap at all.</div>');

        // A value of 0 means no max line length, and should not wrap.
        //...---------1---------2---------3---------4---------5---------6---------7---------8---------9--------10--------11--------12--------13--------14--------15--------16--------17--------18--------19--------20--------21--------22--------23--------24--------25--------26--------27--------28--------29
        //...12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
        bth('<div>Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all.</div>',
            /* expected */
            '<div>Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all.</div>');

        opts.wrap_line_length = "0";
        //...---------1---------2---------3---------4---------5---------6---------7
        //...1234567890123456789012345678901234567890123456789012345678901234567890
        bth('<div>Some text that should not wrap at all.</div>',
            /* expected */
            '<div>Some text that should not wrap at all.</div>');

        // A value of "0" means no max line length, and should not wrap
        //...---------1---------2---------3---------4---------5---------6---------7---------8---------9--------10--------11--------12--------13--------14--------15--------16--------17--------18--------19--------20--------21--------22--------23--------24--------25--------26--------27--------28--------29
        //...12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
        bth('<div>Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all.</div>',
            /* expected */
            '<div>Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all.</div>');

        //BUGBUG: This should wrap before 40 not after.
        opts.wrap_line_length = 40;
        //...---------1---------2---------3---------4---------5---------6---------7
        //...1234567890123456789012345678901234567890123456789012345678901234567890
        bth('<div>Some test text that should wrap_inside_this section here.</div>',
            /* expected */
            '<div>Some test text that should wrap_inside_this\n' +
            '    section here.</div>');

        opts.wrap_line_length = "40";
        //...---------1---------2---------3---------4---------5---------6---------7
        //...1234567890123456789012345678901234567890123456789012345678901234567890
        bth('<div>Some test text that should wrap_inside_this section here.</div>',
            /* expected */
            '<div>Some test text that should wrap_inside_this\n' +
            '    section here.</div>');

        opts.indent_size = 1;
        opts.indent_char = '\t';
        opts.preserve_newlines = false;
        bth('<div>\n\tfoo\n</div>', '<div> foo </div>');

        opts.preserve_newlines = true;
        bth('<div>\n\tfoo\n</div>');



        // test preserve_newlines and max_preserve_newlines
        opts.preserve_newlines = false;
        bth('<div>Should not</div>\n\n\n' +
            '<div>preserve newlines</div>',
            '<div>Should not</div>\n' +
            '<div>preserve newlines</div>');

        opts.preserve_newlines = true;
        opts.max_preserve_newlines  = 0;
        bth('<div>Should</div>\n\n\n' +
            '<div>preserve zero newlines</div>',
            '<div>Should</div>\n' +
            '<div>preserve zero newlines</div>');

        opts.max_preserve_newlines  = 1;
        bth('<div>Should</div>\n\n\n' +
            '<div>preserve one newline</div>',
            '<div>Should</div>\n\n' +
            '<div>preserve one newline</div>');

        opts.max_preserve_newlines  = null;
        bth('<div>Should</div>\n\n\n' +
            '<div>preserve one newline</div>',
            '<div>Should</div>\n\n\n' +
            '<div>preserve one newline</div>');
    }

    beautifier_tests();
    beautifier_unconverted_tests();
}

if (typeof exports !== "undefined") {
    exports.run_html_tests = run_html_tests;
}
