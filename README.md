# jAnsiVT

A jQuery Ansi/Ascii Virtual Terminal Emulator.

Based on the work of Ken Rockot "Rudimentary VT100/Xterm emulator" at https://github.com/krockot/jsvt

<img src="https://raw.githubusercontent.com/R3nPi2/jansivt/master/screenshot.png" />

## Features

  - ANSI control sequences interpretation.
  - Scroll buffer.
  - You can resize previously created terminal.
  - You can change font size on a previously created terminal.
  - Intercept keyboard input.

## Dependencies

  - [jQuery](https://jquery.com/)

## Installation

  - **Bower**: `bower install https://github.com/R3nPi2/jansivt.git`

    or

  - **Manual**: download and unpack source from repository.

  - Add script and css into your html head.

  - Add jQuery script **before** jAnsiVT script.

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

<script type="text/javascript" src="jansivt/jansivt.js"></script>
<link type="text/css" href="jansivt/jansivt.css" rel="stylesheet"></link>
```

## Example

```html
<html>

	<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
		<script type='text/javascript' src='jansivt/jansivt.js'></script>
    <link type="text/css" href="jansivt/jansivt.css" rel="stylesheet"></link>

		<script type='text/javascript'>

	    $(document).ready(function() {

        var terminal = jQuery('#terminal').jAnsiVT({
          cols: 80, 
          rows: 25, 
        });

        terminal.write("Hi!");

		  });

		</script>
	</head>

	<body>
    <div id="terminal">Loading terminal...</div>
	</body>

</html>
```

## More examples

You can find more examples [here](https://github.com/R3nPi2/jansivt/tree/master/examples)

## jAnsiVT constructor

Create a new terminal calling `$(selector).jAnsiVT(options)`.

### Options

| Option        | Description           | Type           | Default  |
| ------------- |:------------- |:-----:|-----:|
| cols     | Terminal columns | Number | 80  |
| rows     | Terminal rows | Number | 25  |
| scrollSize     | Number of lines that will be saved on scroll buffer | Number | 100  |
| fontSize     | Font size without "px". For 16px font-size just set it to "16" | Number | 16  |
| vtColors     | Array of 16 elements containing hex color codes. This overrides color scheme colors. | Array | Default color scheme  |
| colorScheme     | Terminal color scheme | String | gnomeTango |
| title     | Terminal title | String | jAnsiVT |
| getKeyboard     | Intercept keyboard events and write them into terminal | Boolean | false |
| ignoreBold     | Don't set font-weight to bold, even if `[1m` ansi code received. | Boolean | false |
| changeWidthOnScroll     | When terminal starts scrolling add some pixels to terminal wrapper to avoid scrollbar from hiding last column | Boolean | false |
| onChangeTitle     | Actions to be done when fires ChangeTitle event | Function | empty |
| onKeyboardInput     | Actions to be done when fires KeyboardInput event. It only works if getKeyboard set to `true`. | Function | empty |

## Methods

### `$(selector).write(msg)`

Writes a message into terminal display.

#### Params

  - msg: Message to be written into terminal.

### `$(selector).resize(width,height)`

Resizes terminal.

#### Params

  - width: Number of columns.
  - height: Number of rows.

### `$(selector).changeFontSize(size)`

Change terminal font size.

#### Params

  - size: Font size without "px". If you want to set font-size to 16px, just set size to "16".

### `$(selector).updateDisplay()`

Updates display according to terminal write buffer.

### `$(selector).getSettings()`

Returns terminal settings object.

### `$(selector).getDisplay()`

Returns terminal display as a jQuery object.

### `$(selector).getScroll()`

Returns terminal scroll as a jQuery object.

## Colors

There are several color schemes defined, but you can override them and set your own color scheme by setting `vtColors` option.
`vtColor` option has to be an array of 16 elements like this:

```html
      vtColors = [
        //0: black (normal)
        '#000000',
        //1: red (normal)
        '#aa0000',
        //2: green (normal)
        '#00aa00',
        //3: yellow (normal)
        '#aa5500',
        //4: blue (normal)
        '#0000aa',
        //5: magenta (normal)
        '#aa00aa',
        //6: cyan (normal)
        '#00aaaa',
        //7: white (normal)
        '#aaaaaa',
        //8: black (bold)
        '#000000',
        //9: red (bold)
        '#ff5555',
        //10: green (bold)
        '#55ff55',
        //11: yellow (bold)
        '#ffff55',
        //12: blue (bold)
        '#5555ff',
        //13: magenta (bold)
        '#ff55ff',
        //14: cyan (bold)
        '#55ffff',
        //15: white (bold)
        '#ffffff'
      ];
```

### Predefined color schemes

Here is the list of color schemes that you can set `colorScheme` option to:

  - gnomeTango
  - gnomeLinux
  - gnomeXTerm
  - gnomeRXVT
  - gnomeSolarized
  - vt100
  - blackOnLightYellow
  - greyOnBlack
  - whiteOnBlack
  - blackOnWhite
  - blackOnGrey
  - blackAndWhite
  - whiteAndBlack
  - greyAndBlack
  - greenAndBlack

## Author

  - R3n Pi2 <r3npi2@gmail.com> (https://github.com/R3nPi2)

## License

  - jAnsiVT is released under the GNU Affero General Public License version 3. Read LICENSE file.

## Issues

Report at the github [issue tracker](https://github.com/R3nPi2/jansivt/issues)

